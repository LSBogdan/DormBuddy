package com.example.backend.jpa.repository;

import com.example.backend.jpa.EventCommentJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventComentJPARepository extends JpaRepository<EventCommentJPA, String> {

    Page<EventCommentJPA> findAll(Pageable pageable);
    Page<EventCommentJPA> getAllByEventId(String eventId, Pageable pageable);

    Page<EventCommentJPA> getAllByUserId(String userId, Pageable pageable);

    List<EventCommentJPA> findAllByEventId(String eventId);
}
