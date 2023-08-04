package com.example.backend.service;

import com.example.backend.dto.EventComment;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface EventCommentService {

    String saveEventComment(EventComment eventComment);

    void deleteEventComment(String id);

    Optional<EventComment> getEventCommentById(String id);

    List<EventComment> getAllEventComments(String eventId);

    Page<EventComment> getAllEventCommentsPaginated(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy);

}
