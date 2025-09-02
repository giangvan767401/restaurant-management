package com.example.restaurant.service;

import com.example.restaurant.entity.User;
import com.example.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder từ SecurityConfig

    // Lưu User mới, tự mã hóa password
    public User saveUser(User user) {
        // Nếu password chưa được mã hóa, mã hóa nó
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    // Lấy tất cả user
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy user theo id
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // Xoá user theo id
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Kiểm tra username/email đã tồn tại chưa
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Optional: cập nhật thông tin user (có thể update password)
    public User updateUser(Long id, User userUpdate) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setFullName(userUpdate.getFullName());
                    existingUser.setEmail(userUpdate.getEmail());
                    existingUser.setPhone(userUpdate.getPhone());
                    existingUser.setRole(userUpdate.getRole());

                    // Nếu password được cung cấp, mã hóa và cập nhật
                    if (userUpdate.getPassword() != null && !userUpdate.getPassword().isEmpty()) {
                        existingUser.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
                    }

                    return userRepository.save(existingUser);
                }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}
