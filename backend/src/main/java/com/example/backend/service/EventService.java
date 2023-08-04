package com.example.backend.service;

import com.example.backend.dto.Event;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface EventService {

    String saveEvent(Event event);
    void deleteEvent(String id);
    Optional<Event> getEventById(String id);
    Page<Event> getAllEvents(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy);

}
