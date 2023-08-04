package com.example.backend.controller;

import com.example.backend.dto.AnnouncementComment;
import com.example.backend.service.AnnouncementCommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/announcementcomment", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class AnnouncementCommentController {

    @Autowired
    private AnnouncementCommentService announcementCommentService;


    @PostMapping("")
    public ResponseEntity<AnnouncementComment> createAnnouncementComment(@RequestBody AnnouncementComment announcementComment) throws URISyntaxException {

        String announcementCommentId = announcementCommentService.saveAnnouncementComment(announcementComment);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + announcementCommentId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(announcementCommentService.getAnnouncementCommentById(announcementCommentId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AnnouncementComment> updateAnnouncementComment(@PathVariable ("id") String id, @RequestBody AnnouncementComment announcementComment) {

        String announcementCommentId = announcementCommentService.saveAnnouncementComment(announcementComment);

        return ResponseEntity.ok()
                .body(announcementCommentService.getAnnouncementCommentById(announcementCommentId).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncementById(@PathVariable ("id") String id) {

        announcementCommentService.deleteAnnouncementComment(id);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementComment> getAnnouncementCommentById(@PathVariable ("id") String id) {

        return ResponseEntity.ok()
                .body(announcementCommentService.getAnnouncementCommentById(id).get());

    }

    @GetMapping("/all/{announcementId}")
    public ResponseEntity<List<AnnouncementComment>> getAllAnnouncementComments(
        @PathVariable(name = "announcementId") String announcementId
    ) {
        return ResponseEntity.ok()
                .body(announcementCommentService.getAllAnnouncementComments(announcementId));
    }

    @GetMapping("/all/paginated")
    public ResponseEntity<Page<AnnouncementComment>> getAllAnnouncementComments(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "5") int size,
            @RequestParam(name = "sortBy", required = false, defaultValue = "publishDate") String sortBy,
            @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
            @RequestParam(name = "filterBy", required = false) String filterBy ) {

                return ResponseEntity.ok()
                        .body(announcementCommentService.getAllAnnouncementCommentsPaginated(page, size, sortBy, sortDir, filterBy));

    }

    @GetMapping("/all/paginated/{id}")
    public ResponseEntity<Page<AnnouncementComment>> getAllAnnouncementCommentsByUserId(
        @PathVariable(name = "id", required = false) String id,
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "publishDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir) {

            return ResponseEntity.ok()
                    .body(announcementCommentService.getAllAnnouncementCommentsPaginated(page, size, sortBy, sortDir, id));

    }

}
