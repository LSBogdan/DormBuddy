package com.example.backend.controller;

import com.example.backend.dto.Announcement;
import com.example.backend.service.AnnouncementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;

@RestController
@RequestMapping(value = "/api/v1/announcement", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @PostMapping("")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) throws URISyntaxException {

        announcement.setPublishDate(LocalDate.now());
        announcement.setModified(false);

        String announcementId = announcementService.saveAnnouncement(announcement);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + announcementId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(announcementService.getAnnouncementById(announcementId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable ("id") String id, @RequestBody Announcement announcement) {

        announcement.setId(id);
        announcement.setModified(true);

        String announcementId = announcementService.saveAnnouncement(announcement);

        return ResponseEntity.ok()
                .body(announcementService.getAnnouncementById(announcementId).get());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable ("id") String id) {

        return ResponseEntity.ok()
                .body(announcementService.getAnnouncementById(id).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncementById(@PathVariable ("id") String id) {

        announcementService.deleteAnnouncement(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Announcement>> getAllAnnouncements(
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "publishDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
        @RequestParam(name = "filterBy", required = false) String filterBy ) {

            return ResponseEntity.ok()
                .body(announcementService.getAllAnnouncements(page, size, sortBy, sortDir, filterBy));

    }

    @GetMapping("/all/{id}")
    public ResponseEntity<Page<Announcement>> getAllAnnouncementsByUserId(
        @PathVariable(name = "id", required = false) String id,
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "publishDate") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir) {

            return ResponseEntity.ok()
                    .body(announcementService.getAllAnnouncements(page, size, sortBy, sortDir, id));

    }

}
