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
    private Double foodPrice;

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
            this.foodPrice = item.getFoodPrice() != null ? item.getFoodPrice() : item.getFood().getPrice();
        }
    }

    // Getters
    public Long getId() { return id; }
    public int getQuantity() { return quantity; }
    public Long getOrderId() { return orderId; }
    public String getOrderStatus() { return orderStatus; }
    public Long getFoodId() { return foodId; }
    public String getFoodName() { return foodName; }
    public Double getFoodPrice() { return foodPrice; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }
    public void setFoodName(String foodName) { this.foodName = foodName; }
    public void setFoodPrice(Double foodPrice) { this.foodPrice = foodPrice; }
}
