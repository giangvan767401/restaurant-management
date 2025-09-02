package com.example.restaurant.service;

import com.example.restaurant.entity.DauBep;
import com.example.restaurant.entity.User;
import com.example.restaurant.repository.DauBepRepository;
import com.example.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DauBepService {

    @Autowired
    private DauBepRepository dauBepRepository;

    @Autowired
    private UserRepository userRepository;

    public DauBep createDauBep(DauBep dauBep, String username) {
        User user = userRepository.findByUsername(username)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setUsername(username);
                    newUser.setPassword("123456"); // default password
                    newUser.setRole("DAUBEP");
                    return userRepository.save(newUser);
                });

        dauBep.setUser(user);
        return dauBepRepository.save(dauBep);
    }

    public List<DauBep> getAllDauBeps() {
        return dauBepRepository.findAll();
    }

    public DauBep getDauBep(Long id) {
        return dauBepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DauBep not found with id " + id));
    }

    public DauBep updateDauBep(Long id, DauBep updated) {
        return dauBepRepository.findById(id).map(d -> {
            d.setName(updated.getName());
            d.setGender(updated.getGender());
            d.setAge(updated.getAge());
            d.setSkillLevel(updated.getSkillLevel());
            d.setSalary(updated.getSalary());
            return dauBepRepository.save(d);
        }).orElseThrow(() -> new RuntimeException("DauBep not found with id " + id));
    }

    public void deleteDauBep(Long id) {
        dauBepRepository.deleteById(id);
    }
}
