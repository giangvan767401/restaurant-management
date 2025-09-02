package com.example.restaurant.controller;

import com.example.restaurant.dto.RoleUserDTO;
import com.example.restaurant.entity.DauBep;
import com.example.restaurant.service.VanHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dau-bep")
public class DauBepController {

    @Autowired
    private VanHanhService vanHanhService;

    @PostMapping
    public DauBep addDauBep(@RequestBody RoleUserDTO dto) {
        DauBep dauBep = dto.toDauBep();
        return vanHanhService.addDauBep(dauBep, dto.getUser());
    }
}
