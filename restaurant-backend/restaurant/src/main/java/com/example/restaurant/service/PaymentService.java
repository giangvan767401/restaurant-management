package com.example.restaurant.service;

import com.example.restaurant.dto.PaymentDTO;
import com.example.restaurant.entity.Order;
import com.example.restaurant.entity.Payment;
import com.example.restaurant.repository.OrderRepository;
import com.example.restaurant.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    public PaymentDTO savePayment(Payment payment) {
        // Nếu có Order thì load từ DB
        if (payment.getOrder() != null && payment.getOrder().getId() != null) {
            Order order = orderRepository.findById(payment.getOrder().getId())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            payment.setOrder(order);

            // Nếu amount chưa có thì set bằng tổng tiền order
            if (payment.getAmount() <= 0) {
                payment.setAmount(order.getTotalAmount());
            }
        }

        // Default status nếu chưa có
        if (payment.getStatus() == null) {
            payment.setStatus("PENDING");
        }

        Payment saved = paymentRepository.save(payment);

        // load lại để chắc chắn đầy đủ dữ liệu
        Payment reloaded = paymentRepository.findById(saved.getId())
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        return new PaymentDTO(reloaded);
    }

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(PaymentDTO::new)
                .toList();
    }

    public PaymentDTO getPayment(Long id) {
        return paymentRepository.findById(id)
                .map(PaymentDTO::new)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
