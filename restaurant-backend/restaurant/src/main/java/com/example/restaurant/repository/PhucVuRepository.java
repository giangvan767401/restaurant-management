package com.example.restaurant.repository;

import com.example.restaurant.entity.PhucVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhucVuRepository extends JpaRepository<PhucVu, Long> { }
