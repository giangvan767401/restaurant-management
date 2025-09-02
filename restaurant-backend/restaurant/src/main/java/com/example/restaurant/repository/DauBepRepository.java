package com.example.restaurant.repository;

import com.example.restaurant.entity.DauBep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DauBepRepository extends JpaRepository<DauBep, Long> { }
