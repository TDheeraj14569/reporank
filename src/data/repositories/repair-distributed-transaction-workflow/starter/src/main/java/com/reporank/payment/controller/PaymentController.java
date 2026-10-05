package com.reporank.payment.controller;

import com.reporank.payment.model.Payment;
import com.reporank.payment.model.PaymentRequest;
import com.reporank.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> processPayment(@RequestHeader("Idempotency-Key") String idempotencyKey,
                                                  @RequestBody PaymentRequest request) {
        try {
            Payment payment = paymentService.processPayment(request, idempotencyKey);
            return ResponseEntity.ok(payment);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
