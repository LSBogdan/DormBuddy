package com.example.backend.jpa.repository;

import com.example.backend.jpa.RoomJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomJPARepository extends JpaRepository<RoomJPA, String> {

    Page<RoomJPA> findAll(Pageable pageable);

    Page<RoomJPA> getAllByFloor(Integer floor, Pageable pageable);

    List<RoomJPA> findAllByOrderByRoomNumber();
}
