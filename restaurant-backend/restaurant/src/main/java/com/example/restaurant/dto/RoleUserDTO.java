package com.example.restaurant.dto;

import com.example.restaurant.entity.*;

public class RoleUserDTO {
    private User user;

    // Các thuộc tính riêng cho role
    private String skillLevel; // DauBep
    private Float salary;      // DauBep, QuanLi
    private Float hourlySalary; // PhucVu
    private String seniority;   // QuanLi

    // Getters & Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSkillLevel() { return skillLevel; }
    public void setSkillLevel(String skillLevel) { this.skillLevel = skillLevel; }

    public Float getSalary() { return salary; }
    public void setSalary(Float salary) { this.salary = salary; }

    public Float getHourlySalary() { return hourlySalary; }
    public void setHourlySalary(Float hourlySalary) { this.hourlySalary = hourlySalary; }

    public String getSeniority() { return seniority; }
    public void setSeniority(String seniority) { this.seniority = seniority; }

    // Chuyển sang entity tương ứng
    public DauBep toDauBep() {
        DauBep d = new DauBep();
        d.setSkillLevel(skillLevel);
        d.setSalary(salary != null ? salary : 0f);
        return d;
    }

    public PhucVu toPhucVu() {
        PhucVu p = new PhucVu();
        p.setHourlySalary(hourlySalary != null ? hourlySalary : 0f);
        return p;
    }

    public QuanLi toQuanLi() {
        QuanLi q = new QuanLi();
        q.setSeniority(seniority);
        q.setSalary(salary != null ? salary : 0f);
        return q;
    }
}
