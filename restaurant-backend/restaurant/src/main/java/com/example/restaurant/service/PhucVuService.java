package com.example.restaurant.service;

import com.example.restaurant.entity.PhucVu;
import com.example.restaurant.entity.User;
import com.example.restaurant.repository.PhucVuRepository;
import com.example.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhucVuService {

    @Autowired
    private PhucVuRepository phucVuRepository;

    @Autowired
    private UserRepository userRepository;

    public PhucVu createPhucVu(PhucVu phucVu, String username) {
        User user = userRepository.findByUsername(username)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUsername(username);
                    newUser.setPassword("123456");
                    newUser.setRole("PHUCVU");
                    return userRepository.save(newUser);
                });

        phucVu.setUser(user);
        return phucVuRepository.save(phucVu);
    }

    public List<PhucVu> getAllPhucVus() {
        return phucVuRepository.findAll();
    }

    public PhucVu getPhucVu(Long id) {
        return phucVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PhucVu not found with id " + id));
    }

    public PhucVu updatePhucVu(Long id, PhucVu updated) {
        return phucVuRepository.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setGender(updated.getGender());
            p.setAge(updated.getAge());
            p.setHourlySalary(updated.getHourlySalary());
            return phucVuRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("PhucVu not found with id " + id));
    }

    public void deletePhucVu(Long id) {
        phucVuRepository.deleteById(id);
    }
}
