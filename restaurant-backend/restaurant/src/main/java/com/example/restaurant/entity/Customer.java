package com.example.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Customer extends Human {

    private String phone;
    private String email;
    private String address;
    private String level; // Bac, Vang, Kim Cuong

    @ManyToMany
    @JoinTable(
            name = "customer_food",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    @JsonIgnore // Ngăn JSON recursion
    private List<Food> selectedFoods = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Ngăn JSON recursion
    private List<Order> orders = new ArrayList<>();

    public Customer() {}

    public Customer(String name, String gender, int age, String level, String phone, String email, String address) {
        super(name, gender, age);
        this.level = level;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

    // Getter & Setter
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public List<Food> getSelectedFoods() { return selectedFoods; }
    public void setSelectedFoods(List<Food> selectedFoods) { this.selectedFoods = selectedFoods; }

    public void addFood(Food food) { this.selectedFoods.add(food); }

    public List<Order> getOrders() { return orders; }
    public void setOrders(List<Order> orders) { this.orders = orders; }

    public void addOrder(Order order) {
        order.setCustomer(this);
        this.orders.add(order);
    }
}
