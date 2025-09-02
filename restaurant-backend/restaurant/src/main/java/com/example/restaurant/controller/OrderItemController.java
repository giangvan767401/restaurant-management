package com.example.restaurant.controller;

import com.example.restaurant.dto.OrderItemDTO;
import com.example.restaurant.entity.OrderItem;
import com.example.restaurant.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    // Tạo mới -> trả về DTO
    @PostMapping
    public OrderItemDTO createOrderItem(@RequestBody OrderItem item) {
        return orderItemService.saveOrderItem(item);
    }

    // Lấy tất cả DTO
    @GetMapping
    public List<OrderItemDTO> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    // Lấy 1 DTO
    @GetMapping("/{id}")
    public OrderItemDTO getOrderItem(@PathVariable Long id) {
        return orderItemService.getOrderItem(id);
    }

    // Xóa
    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
    }
}
