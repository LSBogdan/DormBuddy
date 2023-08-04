package com.example.backend.jpa.repository;

import com.example.backend.jpa.AnnouncementJPA;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementJPARepository extends JpaRepository<AnnouncementJPA, String> {

    Page<AnnouncementJPA> findAll(Pageable pageable);
    Page<AnnouncementJPA> findAllByUserId(String userId, Pageable pageable);

}
