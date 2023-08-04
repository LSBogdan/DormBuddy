package com.example.backend.controller;

import com.example.backend.dto.User;
import com.example.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLOutput;

@RestController
@RequestMapping(value = "/api/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<User> createUser(@RequestBody User user) throws URISyntaxException {

        String userId = userService.saveUser(user);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + userId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(userService.getUserById(userId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {

        user.setId(id);

        String userId = userService.saveUser(user);

        return ResponseEntity.ok()
                .body(userService.getUserById(userId).get());

    }

    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {

        return ResponseEntity.ok().body(userService.getUserById(id).get());

    }

    @GetMapping("/email={email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {

        return ResponseEntity.ok().body(userService.getUserByEmail(email).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") String id) {

        userService.deleteUser(id);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/all")
    public ResponseEntity<Page<User>> getAllUsers (
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "5") int size,
            @RequestParam(name = "sortBy", required = false, defaultValue = "firstName") String sortBy,
            @RequestParam(name = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(name = "filterBy", required = false) String filterBy ) {


//        System.out.println("page=" + page);

        return ResponseEntity.ok()
                .body(userService.getAllUsers(page, size, sortBy, sortDir, filterBy));
    }

    @GetMapping("/all/students")
    public ResponseEntity<Page<User>> getAllStudents(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "5") int size,
            @RequestParam(name = "sortBy", required = false, defaultValue = "firstName") String sortBy,
            @RequestParam(name = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(name = "filterBy", required = false) String filterBy ) {

                return ResponseEntity.ok()
                        .body(userService.getAllStudents(page, size, sortBy, sortDir));

    }

    @GetMapping("/all/employes")
    public ResponseEntity<Page<User>> getAllEmployes(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "5") int size,
            @RequestParam(name = "sortBy", required = false, defaultValue = "firstName") String sortBy,
            @RequestParam(name = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(name = "filterBy", required = false) String filterBy ) {

                return ResponseEntity.ok()
                    .body(userService.getAllEmployes(page, size, sortDir, sortBy));

    }
}
