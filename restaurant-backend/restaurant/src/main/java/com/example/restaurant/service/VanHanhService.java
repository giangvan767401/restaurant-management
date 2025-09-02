package com.example.restaurant.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restaurant.entity.*;
import com.example.restaurant.repository.*;

@Service
public class VanHanhService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private FoodRepository foodRepository;

    // ===== CRUD Food =====
    public List<Food> getAllFoods() {
        return foodRepository.findByAvailableTrue(); // ✅ chỉ lấy món còn bán
    }

    public Food addFood(Food food) {
        return foodRepository.save(food);
    }

    public Food getFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id " + id));
    }

    // ✅ soft delete
    public void deleteFood(Long id) {
        Food food = getFoodById(id);
        food.setAvailable(false);
        foodRepository.save(food);
    }

    // ===== CRUD Customer =====
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer addCustomer(Customer customer) {
        customer.setSelectedFoods(resolveFoods(customer.getSelectedFoods()));
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customer) {
        return customerRepository.findById(id).map(c -> {
            c.setName(customer.getName());
            c.setGender(customer.getGender());
            c.setAge(customer.getAge());
            c.setLevel(customer.getLevel());
            c.setPhone(customer.getPhone());
            c.setEmail(customer.getEmail());
            c.setAddress(customer.getAddress());
            c.setSelectedFoods(resolveFoods(customer.getSelectedFoods()));
            return customerRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    // ===== Helper method để resolve selectedFoods =====
    private List<Food> resolveFoods(List<Food> foods) {
        List<Food> resolved = new ArrayList<>();
        if (foods != null) {
            for (Food f : foods) {
                Food existingFood = foodRepository.findById(f.getId())
                        .orElseThrow(() -> new RuntimeException("Food not found with id " + f.getId()));
                resolved.add(existingFood);
            }
        }
        return resolved;
    }

    // ================= Role CRUD (DauBep, PhucVu, QuanLi) =================

    @Autowired
    private DauBepRepository dauBepRepository;

    @Autowired
    private PhucVuRepository phucVuRepository;

    @Autowired
    private QuanLiRepository quanLiRepository;

    @Autowired
    private UserService userService;

    public DauBep addDauBep(DauBep dauBep, User user) {
        User savedUser = userService.saveUser(user);
        dauBep.setUser(savedUser);
        return dauBepRepository.save(dauBep);
    }

    public PhucVu addPhucVu(PhucVu phucVu, User user) {
        User savedUser = userService.saveUser(user);
        phucVu.setUser(savedUser);
        return phucVuRepository.save(phucVu);
    }

    public QuanLi addQuanLi(QuanLi quanLi, User user) {
        User savedUser = userService.saveUser(user);
        quanLi.setUser(savedUser);
        return quanLiRepository.save(quanLi);
    }

    public List<DauBep> getAllDauBeps() { return dauBepRepository.findAll(); }
    public List<PhucVu> getAllPhucVus() { return phucVuRepository.findAll(); }
    public List<QuanLi> getAllQuanLis() { return quanLiRepository.findAll(); }
}
