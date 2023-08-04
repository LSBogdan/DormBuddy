package com.example.backend.service;

import com.example.backend.dto.User;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface UserService {

    String saveUser(User user);

    void deleteUser(String id);

    Optional<User> getUserById(String id);

    Optional<User> getUserByEmail(String email);

    Page<User> getAllUsers(int pageNo, int pageSize, String sortDir, String sortBy, String filterBy);

    Page<User> getAllStudents(int pageNo, int pageSize, String sortDir, String sortBy);

    Page<User> getAllEmployes(int pageNo, int pageSize, String sortDir, String sortBy);

}
