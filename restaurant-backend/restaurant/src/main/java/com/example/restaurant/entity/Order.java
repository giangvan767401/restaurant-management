package com.example.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderTime = LocalDateTime.now();

    @Column(nullable = false)
    private String status; // PENDING, COOKING, SERVED, PAID

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;

    // Tạm để nhận customerId từ frontend
    @Transient
    private Long customerId;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) {
        if (!List.of("PENDING", "COOKING", "SERVED", "PAID").contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
        this.status = status;
    }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }

    public Payment getPayment() { return payment; }
    public void setPayment(Payment payment) {
        this.payment = payment;
        if (payment != null) payment.setOrder(this);
    }

    public void addItem(OrderItem item) {
        item.setOrder(this);
        this.orderItems.add(item);
    }

    @Transient
    public double getTotalAmount() {
        if (orderItems == null) return 0.0;
        return orderItems.stream()
                .mapToDouble(item -> (item.getFoodPrice() != null ? item.getFoodPrice() : 0) * item.getQuantity())
                .sum();
    }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
}