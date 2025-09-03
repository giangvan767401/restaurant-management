package com.example.restaurant.service;

import com.example.restaurant.dto.OrderDTO;
import com.example.restaurant.dto.OrderItemDTO;
import com.example.restaurant.entity.Customer;
import com.example.restaurant.entity.Food;
import com.example.restaurant.entity.Order;
import com.example.restaurant.entity.OrderItem;
import com.example.restaurant.repository.CustomerRepository;
import com.example.restaurant.repository.FoodRepository;
import com.example.restaurant.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Transactional
    public OrderDTO saveOrder(OrderDTO orderDTO) {
        if (orderDTO.getCustomerId() == null) {
            throw new IllegalArgumentException("Customer ID is required");
        }
        if (orderDTO.getOrderItems() == null || orderDTO.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("At least one order item is required");
        }

        logger.info("Saving order with customerId: {}, items: {}", orderDTO.getCustomerId(), orderDTO.getOrderItems());

        Order order = new Order();
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(orderDTO.getStatus() != null ? orderDTO.getStatus() : "PENDING");

        // Map customerId to Customer
        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found: " + orderDTO.getCustomerId()));
        order.setCustomer(customer);

        // Map orderItems
        List<OrderItem> orderItems = orderDTO.getOrderItems().stream().map(dto -> {
            if (dto.getFoodId() == null || dto.getQuantity() <= 0) {
                throw new IllegalArgumentException("Invalid order item: foodId and quantity are required");
            }
            Food food = foodRepository.findById(dto.getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food not found: " + dto.getFoodId()));
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setFood(food);
            item.setFoodName(food.getName());
            item.setFoodPrice(food.getPrice());
            item.setQuantity(dto.getQuantity());
            return item;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        Order saved = orderRepository.save(order);

        // Convert to DTO
        OrderDTO result = new OrderDTO();
        result.setId(saved.getId());
        result.setCustomerId(saved.getCustomer().getId());
        result.setCustomerName(saved.getCustomer().getName());
        result.setCustomerLevel(saved.getCustomer().getLevel());
        result.setStatus(saved.getStatus());
        result.setOrderTime(saved.getOrderTime());
        result.setTotalAmount(saved.getTotalAmount());
        result.setOrderItems(saved.getOrderItems().stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setId(item.getId());
            itemDTO.setFoodId(item.getFood().getId());
            itemDTO.setFoodName(item.getFoodName());
            itemDTO.setFoodPrice(item.getFoodPrice());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setOrderId(saved.getId());
            itemDTO.setOrderStatus(saved.getStatus());
            return itemDTO;
        }).collect(Collectors.toList()));
        result.setItemIds(saved.getOrderItems().stream().map(OrderItem::getId).collect(Collectors.toList()));

        logger.info("Order saved: {}", result);
        return result;
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAllWithItems()
                .stream()
                .map(order -> {
                    OrderDTO dto = new OrderDTO();
                    dto.setId(order.getId());
                    dto.setCustomerId(order.getCustomer().getId());
                    dto.setCustomerName(order.getCustomer().getName());
                    dto.setCustomerLevel(order.getCustomer().getLevel());
                    dto.setStatus(order.getStatus());
                    dto.setOrderTime(order.getOrderTime());
                    dto.setTotalAmount(order.getTotalAmount());
                    dto.setOrderItems(order.getOrderItems().stream().map(item -> {
                        OrderItemDTO itemDTO = new OrderItemDTO();
                        itemDTO.setId(item.getId());
                        itemDTO.setFoodId(item.getFood().getId());
                        itemDTO.setFoodName(item.getFoodName());
                        itemDTO.setFoodPrice(item.getFoodPrice());
                        itemDTO.setQuantity(item.getQuantity());
                        itemDTO.setOrderId(order.getId());
                        itemDTO.setOrderStatus(order.getStatus());
                        return itemDTO;
                    }).collect(Collectors.toList()));
                    dto.setItemIds(order.getOrderItems().stream().map(OrderItem::getId).collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public OrderDTO getOrder(Long id) {
        Order order = orderRepository.findByIdWithItems(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerId(order.getCustomer().getId());
        dto.setCustomerName(order.getCustomer().getName());
        dto.setCustomerLevel(order.getCustomer().getLevel());
        dto.setStatus(order.getStatus());
        dto.setOrderTime(order.getOrderTime());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setOrderItems(order.getOrderItems().stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setId(item.getId());
            itemDTO.setFoodId(item.getFood().getId());
            itemDTO.setFoodName(item.getFoodName());
            itemDTO.setFoodPrice(item.getFoodPrice());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setOrderId(order.getId());
            itemDTO.setOrderStatus(order.getStatus());
            return itemDTO;
        }).collect(Collectors.toList()));
        dto.setItemIds(order.getOrderItems().stream().map(OrderItem::getId).collect(Collectors.toList()));
        return dto;
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}