package com.example.backend.jpa.repository;

import com.example.backend.jpa.AnnouncementCommentJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementCommentJPARepository extends JpaRepository<AnnouncementCommentJPA, String> {

    Page<AnnouncementCommentJPA> findAll(Pageable pageable);

    Page<AnnouncementCommentJPA> findAllByUserId(String userId, Pageable pageable);

    List<AnnouncementCommentJPA> findAllByAnnouncementId(String announcementId);
}
