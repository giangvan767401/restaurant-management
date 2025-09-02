package com.example.restaurant.dto;

import com.example.restaurant.entity.Payment;

public class PaymentDTO {
    private Long id;
    private String method;
    private Double amount;
    private String status;

    // Order info
    private Long orderId;
    private String orderStatus;

    public PaymentDTO(Payment payment) {
        this.id = payment.getId();
        this.method = payment.getMethod();
        this.amount = payment.getAmount();
        this.status = payment.getStatus();

        if (payment.getOrder() != null) {
            this.orderId = payment.getOrder().getId();
            this.orderStatus = payment.getOrder().getStatus();
        }
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getMethod() {
        return method;
    }

    public Double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }
}
