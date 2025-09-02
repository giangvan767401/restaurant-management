package com.example.restaurant.service;

import com.example.restaurant.dto.OrderItemDTO;
import com.example.restaurant.entity.Order;
import com.example.restaurant.entity.Food;
import com.example.restaurant.entity.OrderItem;
import com.example.restaurant.repository.OrderItemRepository;
import com.example.restaurant.repository.OrderRepository;
import com.example.restaurant.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FoodRepository foodRepository;

    // ✅ Giờ trả về DTO
    public OrderItemDTO saveOrderItem(OrderItem item) {
        // load order từ DB
        if (item.getOrder() != null && item.getOrder().getId() != null) {
            Order order = orderRepository.findById(item.getOrder().getId())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            item.setOrder(order);
        }

        // load food từ DB
        if (item.getFood() != null && item.getFood().getId() != null) {
            Food food = foodRepository.findById(item.getFood().getId())
                    .orElseThrow(() -> new RuntimeException("Food not found"));
            item.setFood(food);
        }

        OrderItem saved = orderItemRepository.save(item);

        // load lại để chắc chắn có đủ dữ liệu
        OrderItem reloaded = orderItemRepository.findById(saved.getId())
                .orElseThrow(() -> new RuntimeException("OrderItem not found"));

        return new OrderItemDTO(reloaded);
    }

    public List<OrderItemDTO> getAllOrderItems() {
        return orderItemRepository.findAll()
                .stream()
                .map(OrderItemDTO::new)
                .toList();
    }

    public OrderItemDTO getOrderItem(Long id) {
        return orderItemRepository.findById(id)
                .map(OrderItemDTO::new)
                .orElseThrow(() -> new RuntimeException("OrderItem not found"));
    }

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}
