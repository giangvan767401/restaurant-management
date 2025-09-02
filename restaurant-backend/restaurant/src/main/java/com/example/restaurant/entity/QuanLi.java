package com.example.restaurant.entity;

import jakarta.persistence.*;

@Entity
public class QuanLi extends Human {

    private String seniority;
    private float salary;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user; // liên kết với User

    public QuanLi() {}

    public QuanLi(String name, String gender, int age, String seniority, float salary, User user) {
        super(name, gender, age);
        this.seniority = seniority;
        this.salary = salary;
        this.user = user;
    }

    // Getter & Setter
    public String getSeniority() { return seniority; }
    public void setSeniority(String seniority) { this.seniority = seniority; }

    public float getSalary() { return salary; }
    public void setSalary(float salary) { this.salary = salary; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
