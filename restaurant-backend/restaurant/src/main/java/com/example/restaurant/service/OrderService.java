package com.example.restaurant.service;

import com.example.restaurant.dto.OrderDTO;
import com.example.restaurant.entity.Customer;
import com.example.restaurant.entity.Food;
import com.example.restaurant.entity.Order;
import com.example.restaurant.entity.OrderItem;
import com.example.restaurant.repository.CustomerRepository;
import com.example.restaurant.repository.FoodRepository;
import com.example.restaurant.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private FoodRepository foodRepository;

    public OrderDTO saveOrder(Order order) {
        order.setOrderTime(LocalDateTime.now());
        if (order.getStatus() == null) {
            order.setStatus("PENDING");
        }

        // Lấy Customer entity từ customerId frontend gửi lên
        if (order.getCustomer() == null && order.getCustomerId() != null) {
            Customer customer = customerRepository.findById(order.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            order.setCustomer(customer);
        }

        // Map foodId sang Food, set foodName & foodPrice
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                if (item.getFood() == null && item.getFoodId() != null) {
                    Food food = foodRepository.findById(item.getFoodId())
                            .orElseThrow(() -> new RuntimeException("Food not found"));
                    item.setFood(food);
                    item.setFoodName(food.getName());
                    item.setFoodPrice(food.getPrice());
                }
                item.setOrder(order);
            }
        }

        Order saved = orderRepository.save(order);
        return new OrderDTO(saved);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllWithItems()
                .stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrder(Long id) {
        Order order = orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return new OrderDTO(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
