package com.reporank.payment.service;

import com.reporank.payment.model.Payment;
import com.reporank.payment.model.PaymentRequest;
import com.reporank.payment.model.PaymentStatus;
import com.reporank.payment.repository.PaymentRepository;
import com.reporank.payment.exception.GatewayTimeoutException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentGatewayClient gatewayClient;

    @Transactional
    public Payment processPayment(PaymentRequest request, String idempotencyKey) {
        Payment existingPayment = paymentRepository.findByIdempotencyKey(idempotencyKey);
        if (existingPayment != null) {
            return existingPayment;
        }

        Payment payment = new Payment();
        payment.setOrderId(request.getOrderId());
        payment.setAmount(request.getAmount());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setIdempotencyKey(idempotencyKey);
        payment = paymentRepository.save(payment);

        int retries = 0;
        int maxRetries = 3;

        while (retries < maxRetries) {
            try {
                com.reporank.payment.model.GatewayResponse response = gatewayClient.charge(request);
                if (response != null && response.isSuccess()) {
                    payment.setStatus(PaymentStatus.SUCCESS);
                    return paymentRepository.save(payment);
                } else {
                    payment.setStatus(PaymentStatus.FAILED);
                    return paymentRepository.save(payment);
                }
            } catch (GatewayTimeoutException e) {
                retries++;
                if (retries >= maxRetries) {
                    break;
                }
                try {
                    long backoff = (long) Math.pow(2, retries) * 1000;
                    Thread.sleep(backoff);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        payment.setStatus(PaymentStatus.FAILED);
        return paymentRepository.save(payment);
    }
    
    // Scheduled task can use this to clear old idempotency keys
    @Transactional
    public void cleanupOldIdempotencyKeys() {
        paymentRepository.deleteByCreatedAtBefore(LocalDateTime.now().minusHours(24));
    }
}
