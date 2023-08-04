package com.example.backend.jpa.repository;

import com.example.backend.jpa.EventJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventJPARepository extends JpaRepository<EventJPA, String> {

    Page<EventJPA> findAll(Pageable pageable);
    Page<EventJPA> getAllByUserId(String userId, Pageable pageable);
    Page<EventJPA> getAllByHallId(String hallId, Pageable pageable);
    Page<EventJPA> getAllByTitleContainingIgnoreCase(String title, Pageable pageable);

}
