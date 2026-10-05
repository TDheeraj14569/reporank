package com.reporank.payment.repository;

import com.reporank.payment.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByIdempotencyKey(String idempotencyKey);
    void deleteByCreatedAtBefore(LocalDateTime time);
}
