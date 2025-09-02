package com.example.restaurant.entity;

import jakarta.persistence.*;

@Entity
public class DauBep extends Human {

    private String skillLevel; // 3 sao / 4 sao / 5 sao
    private float salary;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user; // liên kết với User

    public DauBep() {}

    public DauBep(String name, String gender, int age, String skillLevel, float salary, User user) {
        super(name, gender, age);
        this.skillLevel = skillLevel;
        this.salary = salary;
        this.user = user;
    }

    // Getter & Setter
    public String getSkillLevel() { return skillLevel; }
    public void setSkillLevel(String skillLevel) { this.skillLevel = skillLevel; }

    public float getSalary() { return salary; }
    public void setSalary(float salary) { this.salary = salary; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
