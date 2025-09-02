package com.example.restaurant.dto;

import com.example.restaurant.entity.Order;
import java.time.LocalDateTime;
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
    private List<OrderItemDTO> items;

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
            this.items = order.getOrderItems().stream()
                    .map(OrderItemDTO::new)
                    .collect(Collectors.toList());
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
    public List<OrderItemDTO> getItems() { return items; }
}
