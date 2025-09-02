package com.example.restaurant.controller;

import com.example.restaurant.entity.Food;
import com.example.restaurant.service.VanHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    private VanHanhService service;

    @GetMapping
    public List<Food> getAllFoods() {
        return service.getAllFoods(); // ✅ chỉ trả về món còn available = true
    }

    @PostMapping
    public Food addFood(@RequestBody Food food) {
        // mặc định khi thêm mới sẽ available = true
        food.setAvailable(true);
        return service.addFood(food);
    }

    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        service.deleteFood(id); // ✅ soft delete
    }

    @PutMapping("/{id}")
    public Food updateFood(@PathVariable Long id, @RequestBody Food updatedFood) {
        Food food = service.getFoodById(id);
        food.setName(updatedFood.getName());
        food.setPrice(updatedFood.getPrice());
        food.setDescription(updatedFood.getDescription());
        food.setCategory(updatedFood.getCategory());
        food.setAvailable(updatedFood.getAvailable());
        food.setImageUrl(updatedFood.getImageUrl());
        return service.addFood(food);
    }

}
