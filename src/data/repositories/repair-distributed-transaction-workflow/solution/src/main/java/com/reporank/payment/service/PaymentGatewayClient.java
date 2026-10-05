package com.reporank.payment.service;

import com.reporank.payment.model.GatewayResponse;
import com.reporank.payment.model.PaymentRequest;

public interface PaymentGatewayClient {
    GatewayResponse charge(PaymentRequest request);
}
