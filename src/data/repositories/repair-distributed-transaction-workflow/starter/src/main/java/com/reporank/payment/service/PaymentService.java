package com.reporank.payment.service;

import com.reporank.payment.model.Payment;
import com.reporank.payment.model.PaymentRequest;
import com.reporank.payment.model.PaymentStatus;
import com.reporank.payment.repository.PaymentRepository;
import com.reporank.payment.exception.GatewayTimeoutException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            // Bug: throws exception instead of returning idempotent response
            throw new IllegalStateException("Duplicate payment request for key: " + idempotencyKey);
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
                // Bug: Infinite loop on timeout because retries is not incremented
                // and missing exponential backoff
                try {
                    Thread.sleep(1000); // Constant delay, should be exponential
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        payment.setStatus(PaymentStatus.FAILED);
        return paymentRepository.save(payment);
    }
}
