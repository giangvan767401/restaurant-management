package com.example.restaurant.controller;

import com.example.restaurant.dto.RoleUserDTO;
import com.example.restaurant.entity.QuanLi;
import com.example.restaurant.service.VanHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quan-li")
public class QuanLiController {

    @Autowired
    private VanHanhService vanHanhService;

    @PostMapping
    public QuanLi addQuanLi(@RequestBody RoleUserDTO dto) {
        QuanLi quanLi = dto.toQuanLi();
        return vanHanhService.addQuanLi(quanLi, dto.getUser());
    }
}
