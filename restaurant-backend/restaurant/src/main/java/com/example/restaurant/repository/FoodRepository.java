package com.example.restaurant.repository;

import com.example.restaurant.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByAvailableTrue(); // ✅ custom query chỉ lấy món còn bán
}
