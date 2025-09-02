package com.example.restaurant.entity;

import jakarta.persistence.*;

@Entity
public class PhucVu extends Human {

    private float hourlySalary;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user; // liên kết với User

    public PhucVu() {}

    public PhucVu(String name, String gender, int age, float hourlySalary, User user) {
        super(name, gender, age);
        this.hourlySalary = hourlySalary;
        this.user = user;
    }

    // Getter & Setter
    public float getHourlySalary() { return hourlySalary; }
    public void setHourlySalary(float hourlySalary) { this.hourlySalary = hourlySalary; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
