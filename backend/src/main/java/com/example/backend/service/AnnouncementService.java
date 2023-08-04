package com.example.backend.service;

import com.example.backend.dto.Announcement;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface AnnouncementService {

    String saveAnnouncement(Announcement announcement);

    void deleteAnnouncement(String id);

    Optional<Announcement> getAnnouncementById(String id);

    Page<Announcement> getAllAnnouncements(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy);

}
