package com.reporank.payment.model;

public class GatewayResponse {
    private boolean success;
    private String transactionId;

    public GatewayResponse() {}

    public GatewayResponse(boolean success, String transactionId) {
        this.success = success;
        this.transactionId = transactionId;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
}
