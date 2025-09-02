package com.example.restaurant.dto;

import com.example.restaurant.entity.OrderItem;

public class OrderItemDTO {
    private Long id;
    private int quantity;

    // Thông tin order
    private Long orderId;
    private String orderStatus;

    // Thông tin food
    private Long foodId;
    private String foodName;
    private Double foodPrice; // đổi từ Integer → Double

    public OrderItemDTO(OrderItem item) {
        this.id = item.getId();
        this.quantity = item.getQuantity();

        if (item.getOrder() != null) {
            this.orderId = item.getOrder().getId();
            this.orderStatus = item.getOrder().getStatus();
        }

        if (item.getFood() != null) {
            this.foodId = item.getFood().getId();
            this.foodName = item.getFood().getName();
            this.foodPrice = item.getFood().getPrice(); // Double
        }
    }

    // Getters
    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public Long getOrderId() {
        return orderId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public Long getFoodId() {
        return foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public Double getFoodPrice() {
        return foodPrice;
    }
}
