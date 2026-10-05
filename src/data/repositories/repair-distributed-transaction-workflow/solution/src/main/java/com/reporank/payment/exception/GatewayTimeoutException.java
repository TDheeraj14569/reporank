package com.reporank.payment.exception;

public class GatewayTimeoutException extends RuntimeException {
    public GatewayTimeoutException(String message, Throwable cause) {
        super(message, cause);
    }
}
