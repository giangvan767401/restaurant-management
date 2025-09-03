 package com.example.restaurant.dto;

import com.example.restaurant.entity.Order;
import com.example.restaurant.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {
    private Long id;
    private LocalDateTime orderTime;
    private String status;
    private Double totalAmount;

    // customer info
    private Long customerId;
    private String customerName;
    private String customerLevel;

    // items
    private List<Long> itemIds;

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.orderTime = order.getOrderTime();
        this.status = order.getStatus();
        this.totalAmount = order.getTotalAmount();

        if (order.getCustomer() != null) {
            this.customerId = order.getCustomer().getId();
            this.customerName = order.getCustomer().getName();
            this.customerLevel = order.getCustomer().getLevel();
        }

        if (order.getOrderItems() != null) {
            this.itemIds = order.getOrderItems().stream()
                    .map(OrderItem::getId)
                    .collect(Collectors.toList());
        } else {
            this.itemIds = new ArrayList<>();
        }
    }

    // Getters
    public Long getId() { return id; }
    public LocalDateTime getOrderTime() { return orderTime; }
    public String getStatus() { return status; }
    public Double getTotalAmount() { return totalAmount; }
    public Long getCustomerId() { return customerId; }
    public String getCustomerName() { return customerName; }
    public String getCustomerLevel() { return customerLevel; }
    public List<Long> getItemIds() { return itemIds; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }
    public void setStatus(String status) { this.status = status; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setCustomerLevel(String customerLevel) { this.customerLevel = customerLevel; }
    public void setItemIds(List<Long> itemIds) { this.itemIds = itemIds; }
}
