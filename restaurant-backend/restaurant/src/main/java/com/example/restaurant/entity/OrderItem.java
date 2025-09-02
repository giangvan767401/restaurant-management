package com.example.restaurant.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    // Lưu snapshot tên và giá tại thời điểm đặt
    private String foodName;
    private Double foodPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = true)
    private Food food;

    // ===== Tạm để nhận foodId từ frontend =====
    @Transient
    private Long foodId;

    // ===== Getters & Setters =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }

    public Double getFoodPrice() { return foodPrice; }
    public void setFoodPrice(Double foodPrice) { this.foodPrice = foodPrice; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public Food getFood() { return food; }
    public void setFood(Food food) {
        this.food = food;
        if (food != null) {
            this.foodName = food.getName();
            this.foodPrice = food.getPrice();
        }
    }

    public Long getFoodId() { return foodId; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }
}
