package com.example.restaurant.service;

import com.example.restaurant.entity.QuanLi;
import com.example.restaurant.entity.User;
import com.example.restaurant.repository.QuanLiRepository;
import com.example.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuanLiService {

    @Autowired
    private QuanLiRepository quanLiRepository;

    @Autowired
    private UserRepository userRepository;

    public QuanLi createQuanLi(QuanLi quanLi, String username) {
        User user = userRepository.findByUsername(username)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUsername(username);
                    newUser.setPassword("123456");
                    newUser.setRole("QUANLI");
                    return userRepository.save(newUser);
                });

        quanLi.setUser(user);
        return quanLiRepository.save(quanLi);
    }

    public List<QuanLi> getAllQuanLis() {
        return quanLiRepository.findAll();
    }

    public QuanLi getQuanLi(Long id) {
        return quanLiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QuanLi not found with id " + id));
    }

    public QuanLi updateQuanLi(Long id, QuanLi updated) {
        return quanLiRepository.findById(id).map(q -> {
            q.setName(updated.getName());
            q.setGender(updated.getGender());
            q.setAge(updated.getAge());
            q.setSeniority(updated.getSeniority());
            q.setSalary(updated.getSalary());
            return quanLiRepository.save(q);
        }).orElseThrow(() -> new RuntimeException("QuanLi not found with id " + id));
    }

    public void deleteQuanLi(Long id) {
        quanLiRepository.deleteById(id);
    }
}
