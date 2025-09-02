package com.example.restaurant.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String method; // CASH, CARD, MOMO...
    private double amount;
    private String status; // PENDING, COMPLETED, FAILED

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // ===== Getters & Setters =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) {
        this.order = order;
        // ✅ Đồng bộ hai chiều với Order
        if (order != null && order.getPayment() != this) {
            order.setPayment(this);
        }
    }
}
