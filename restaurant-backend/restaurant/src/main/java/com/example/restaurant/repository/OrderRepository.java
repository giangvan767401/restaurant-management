package com.example.restaurant.repository;

import com.example.restaurant.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o JOIN FETCH o.orderItems i JOIN FETCH i.food")
    List<Order> findAllWithItems();

    @Query("SELECT o FROM Order o JOIN FETCH o.orderItems i JOIN FETCH i.food WHERE o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") Long id);
}
