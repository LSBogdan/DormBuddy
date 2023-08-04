package com.example.backend.service;

import com.example.backend.dto.AnnouncementComment;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface AnnouncementCommentService {

    String saveAnnouncementComment(AnnouncementComment announcementComment);

    void deleteAnnouncementComment(String id);

    Optional<AnnouncementComment> getAnnouncementCommentById(String id);

    Page<AnnouncementComment> getAllAnnouncementCommentsPaginated(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy);

    List<AnnouncementComment> getAllAnnouncementComments(String announcementId);
}
