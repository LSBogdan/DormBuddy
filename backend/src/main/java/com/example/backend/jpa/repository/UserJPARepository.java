package com.example.backend.jpa.repository;

import com.example.backend.dto.enums.Role;
import com.example.backend.jpa.UserJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserJPARepository extends JpaRepository<UserJPA, String> {

    Page<UserJPA> findAll(Pageable pageable);

    Optional<UserJPA> findByEmail(String email);

    Page<UserJPA> findAllByRole(Role role, Pageable pageable);

    List<UserJPA> findUserJPAByRoomId(String roomId);

    Page<UserJPA> findAllByRoleNot(Role role, Pageable pageable);

}
