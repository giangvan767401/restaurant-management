package com.example.restaurant.controller;

import com.example.restaurant.dto.OrderDTO;
import com.example.restaurant.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        try {
            logger.info("POST /orders with payload: {}", orderDTO);
            OrderDTO result = orderService.saveOrder(orderDTO);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Error creating order: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating order: " + e.getMessage());
        }
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        logger.info("GET /orders called");
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderDTO getOrder(@PathVariable Long id) {
        logger.info("GET /orders/{} called", id);
        return orderService.getOrder(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        logger.info("DELETE /orders/{} called", id);
        orderService.deleteOrder(id);
    }
}