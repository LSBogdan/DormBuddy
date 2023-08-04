package com.example.backend.jpa.repository;

import com.example.backend.jpa.HallJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HallJPARepository extends JpaRepository<HallJPA, String> {

    Page<HallJPA> findAll(Pageable pageable);
    Page<HallJPA> findAllByFloor(Integer floor, Pageable pageable);

    List<HallJPA> findAllByFloor(Integer floor);

    Optional<HallJPA> findByHallNumber(Integer number);

}
