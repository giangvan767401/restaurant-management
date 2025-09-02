package com.example.restaurant.controller;

import com.example.restaurant.dto.RoleUserDTO;
import com.example.restaurant.entity.PhucVu;
import com.example.restaurant.service.VanHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/phuc-vu")
public class PhucVuController {

    @Autowired
    private VanHanhService vanHanhService;

    @PostMapping
    public PhucVu addPhucVu(@RequestBody RoleUserDTO dto) {
        PhucVu phucVu = dto.toPhucVu();
        return vanHanhService.addPhucVu(phucVu, dto.getUser());
    }
}
