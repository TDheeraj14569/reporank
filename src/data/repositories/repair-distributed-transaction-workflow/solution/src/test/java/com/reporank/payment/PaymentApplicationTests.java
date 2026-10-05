package com.reporank.payment;

import com.reporank.payment.model.Payment;
import com.reporank.payment.model.PaymentRequest;
import com.reporank.payment.model.PaymentStatus;
import com.reporank.payment.repository.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;
import com.reporank.payment.service.PaymentGatewayClient;
import com.reporank.payment.model.GatewayResponse;
import com.reporank.payment.exception.GatewayTimeoutException;

import java.math.BigDecimal;
import java.util.concurrent.TimeUnit;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PaymentApplicationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private RestTemplate appRestTemplate;

    @MockBean
    private PaymentGatewayClient gatewayClient;

    @BeforeEach
    void setup() {
        paymentRepository.deleteAll();
    }

    @Test
    @Timeout(value = 10, unit = TimeUnit.SECONDS)
    void testSuccessfulPayment() {
        when(gatewayClient.charge(any(PaymentRequest.class)))
                .thenReturn(new GatewayResponse(true, "TX123"));

        PaymentRequest request = new PaymentRequest("ORDER-1", new BigDecimal("100.00"));
        HttpHeaders headers = new HttpHeaders();
        headers.set("Idempotency-Key", "idemp-key-1");
        HttpEntity<PaymentRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Payment> response = testRestTemplate.exchange(
                "http://localhost:" + port + "/api/payments",
                HttpMethod.POST,
                entity,
                Payment.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(PaymentStatus.SUCCESS, response.getBody().getStatus());
        
        Payment saved = paymentRepository.findByIdempotencyKey("idemp-key-1");
        assertNotNull(saved);
        assertEquals(PaymentStatus.SUCCESS, saved.getStatus());
    }

    @Test
    @Timeout(value = 10, unit = TimeUnit.SECONDS)
    void testIdempotentPaymentReturnsOriginal() {
        when(gatewayClient.charge(any(PaymentRequest.class)))
                .thenReturn(new GatewayResponse(true, "TX124"));

        PaymentRequest request = new PaymentRequest("ORDER-2", new BigDecimal("200.00"));
        HttpHeaders headers = new HttpHeaders();
        headers.set("Idempotency-Key", "idemp-key-2");
        HttpEntity<PaymentRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Payment> firstResponse = testRestTemplate.exchange(
                "http://localhost:" + port + "/api/payments",
                HttpMethod.POST,
                entity,
                Payment.class
        );
        assertEquals(HttpStatus.OK, firstResponse.getStatusCode());
        
        // Second request with same idempotency key
        ResponseEntity<Payment> secondResponse = testRestTemplate.exchange(
                "http://localhost:" + port + "/api/payments",
                HttpMethod.POST,
                entity,
                Payment.class
        );
        
        assertEquals(HttpStatus.OK, secondResponse.getStatusCode(), "Should return OK for duplicate idempotent request");
        assertEquals(firstResponse.getBody().getId(), secondResponse.getBody().getId(), "Should return the same payment record");
        
        verify(gatewayClient, times(1)).charge(any());
    }

    @Test
    @Timeout(value = 15, unit = TimeUnit.SECONDS)
    void testGatewayTimeoutRetriesAndFails() {
        when(gatewayClient.charge(any(PaymentRequest.class)))
                .thenThrow(new GatewayTimeoutException("Timeout", new RuntimeException()));

        PaymentRequest request = new PaymentRequest("ORDER-3", new BigDecimal("300.00"));
        HttpHeaders headers = new HttpHeaders();
        headers.set("Idempotency-Key", "idemp-key-3");
        HttpEntity<PaymentRequest> entity = new HttpEntity<>(request, headers);

        ResponseEntity<Payment> response = testRestTemplate.exchange(
                "http://localhost:" + port + "/api/payments",
                HttpMethod.POST,
                entity,
                Payment.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode(), "Payment should complete and be saved as FAILED");
        assertNotNull(response.getBody());
        assertEquals(PaymentStatus.FAILED, response.getBody().getStatus(), "Payment status should be FAILED after max retries");
        
        // Should have retried up to 3 times
        verify(gatewayClient, times(3)).charge(any());
    }
    
    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS)
    void testRestTemplateHasTimeoutConfigured() {
        // We verify that the RestTemplate bean is configured with a timeout of exactly 5 seconds
        // Spring's RestTemplate does not expose its timeout easily, but we can verify it's not the default SimpleClientHttpRequestFactory without a timeout
        Object requestFactory = appRestTemplate.getRequestFactory();
        assertNotNull(requestFactory);
        
        // Use reflection to check readTimeout and connectTimeout
        try {
            int connectTimeout = (int) ReflectionTestUtils.getField(requestFactory, "connectTimeout");
            int readTimeout = (int) ReflectionTestUtils.getField(requestFactory, "readTimeout");
            
            assertEquals(5000, connectTimeout, "Connect timeout must be exactly 5000ms");
            assertEquals(5000, readTimeout, "Read timeout must be exactly 5000ms");
        } catch (Exception e) {
            fail("Could not find timeout properties on requestFactory. Ensure RestTemplate is configured using RestTemplateBuilder with 5 seconds timeout.");
        }
    }
}
