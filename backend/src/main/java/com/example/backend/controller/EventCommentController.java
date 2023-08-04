package com.example.backend.controller;

import com.example.backend.dto.EventComment;
import com.example.backend.service.EventCommentService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/eventComment", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class EventCommentController {

    @Autowired
    private EventCommentService eventCommentService;

    @PostMapping("")
    public ResponseEntity<EventComment> createEventComment(@RequestBody EventComment eventComment) throws URISyntaxException {

        eventComment.setPublishDate(LocalDate.now());
        eventComment.setModified(false);

        String eventCommentId = eventCommentService.saveEventComment(eventComment);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + eventCommentId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(eventCommentService.getEventCommentById(eventCommentId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventComment> updateEventComment(@PathVariable ("id") String id, @RequestBody EventComment eventComment) {

        eventComment.setId(id);
        eventComment.setModified(true);
        eventComment.setPublishDate(LocalDate.now());

        String eventCommentId = eventCommentService.saveEventComment(eventComment);

        return ResponseEntity.ok()
                .body(eventCommentService.getEventCommentById(eventCommentId).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventCommentById(@PathVariable ("id") String id) {

        eventCommentService.deleteEventComment(id);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/{id}")
    public ResponseEntity<EventComment> getEventCommentById(@PathVariable ("id") String id) {

        return ResponseEntity.ok()
                .body(eventCommentService.getEventCommentById(id).get());

    }

    @GetMapping("/all/{eventId}")
    public ResponseEntity<List<EventComment>> getAllComments(
            @PathVariable(name = "eventId") String eventId
    ) {

        return ResponseEntity.ok()
                .body(eventCommentService.getAllEventComments(eventId));

    }
    @GetMapping("/all/paginated")
    public ResponseEntity<Page<EventComment>> getAllCommentsPaginated (
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "publishDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
        @RequestParam(name = "filterBy", required = false) String filterBy ) {

            return ResponseEntity.ok()
                    .body(eventCommentService.getAllEventCommentsPaginated(page, size, sortBy, sortDir, filterBy));

    }

    @GetMapping("/all/paginated/{id}")
    public ResponseEntity<Page<EventComment>> getAllEventFilterById (
        @PathVariable(name = "id") String id,
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "publishDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
        @RequestParam(name = "filterBy", required = false) String filterBy ) {

            if (filterBy.contains("eventId")) {

                filterBy = filterBy + "=" + id;

                return ResponseEntity.ok()
                        .body(eventCommentService.getAllEventCommentsPaginated(page, size, sortBy, sortDir, filterBy));

            }

            else {

                filterBy = filterBy + "=" + id;

                return ResponseEntity.ok()
                        .body(eventCommentService.getAllEventCommentsPaginated(page, size, sortBy, sortDir, filterBy));

            }

    }

}
