package com.reporank.payment.service;

import com.reporank.payment.model.GatewayResponse;
import com.reporank.payment.model.PaymentRequest;
import com.reporank.payment.exception.GatewayTimeoutException;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
public class PaymentGatewayClientImpl implements PaymentGatewayClient {
    private final RestTemplate restTemplate;

    public PaymentGatewayClientImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public GatewayResponse charge(PaymentRequest request) {
        try {
            return restTemplate.postForObject("http://gateway.api.internal/charge", request, GatewayResponse.class);
        } catch (RestClientException e) {
            throw new GatewayTimeoutException("Gateway error", e);
        }
    }
}
