package com.example.backend.controller;

import com.example.backend.dto.Event;
import com.example.backend.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/api/v1/event", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) throws URISyntaxException {

        event.setModified(false);

        String eventId = eventService.saveEvent(event);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + eventId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(eventService.getEventById(eventId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> updateEvent(@PathVariable ("id") String id, @RequestBody Event event) {

        event.setId(id);
        event.setModified(true);

        String eventId = eventService.saveEvent(event);

        return ResponseEntity.ok()
                .body(eventService.getEventById(eventId).get());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable ("id") String id) {

        return ResponseEntity.ok()
                .body(eventService.getEventById(id).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventById(@PathVariable ("id") String id) {

        eventService.deleteEvent(id);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/all")
    public ResponseEntity<Page<Event>> getAllEvents (
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "startDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
        @RequestParam(name = "filterBy", required = false) String filterBy ) {

            return ResponseEntity.ok()
                    .body(eventService.getAllEvents(page, size, sortBy, sortDir, filterBy));

    }

    @GetMapping("/all/{id}")
    public ResponseEntity<Page<Event>> getAllEventFilterById(
        @PathVariable(name = "id", required = false) String id,
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "startDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
        @RequestParam(name = "filterBy", required = false) String filterBy ) {

            if (filterBy.contains("hallId")) {

                filterBy = filterBy + "=" + id;

                return ResponseEntity.ok()
                        .body(eventService.getAllEvents(page, size, sortBy, sortDir, filterBy));

            }

            else if (filterBy.contains("userId")) {

                filterBy = filterBy + "=" + id;

                return ResponseEntity.ok()
                        .body(eventService.getAllEvents(page, size, sortBy, sortDir, filterBy));

            }

            else {

                filterBy = filterBy + "=" + id;

                return ResponseEntity.ok()
                        .body(eventService.getAllEvents(page, size, sortBy, sortDir, filterBy));

            }

    }

}
