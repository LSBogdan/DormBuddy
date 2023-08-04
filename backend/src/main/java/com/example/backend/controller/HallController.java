package com.example.backend.controller;

import com.example.backend.dto.EventComment;
import com.example.backend.dto.Hall;
import com.example.backend.service.HallService;
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
@RequestMapping(value = "/api/v1/hall", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class HallController {

    @Autowired
    private HallService hallService;

    @PostMapping("")
    public ResponseEntity<Hall> createHall(@RequestBody Hall hall) throws URISyntaxException {

        String hallId = hallService.saveHall(hall);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + hallId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(hallService.getHallById(hallId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Hall> updateHall(@PathVariable ("id") String id, @RequestBody Hall hall) {

        hall.setId(id);

        String hallId = hallService.saveHall(hall);

        return ResponseEntity.ok()
                .body(hallService.getHallById(hallId).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHallById(@PathVariable ("id") String id) {

        hallService.deleteHall(id);

        return ResponseEntity.ok().build();

    }

    @GetMapping("/{id}")
    public ResponseEntity<Hall> getHallById(@PathVariable ("id") String id) {

        return ResponseEntity.ok()
                .body(hallService.getHallById(id).get());

    }


    @GetMapping("/hallNumber/{id}")
    public ResponseEntity<Hall> getHallByRoom(@PathVariable ("id") String id) {

        return ResponseEntity.ok()
                .body(hallService.getHallByHallNumber(id).get());

    }

    @GetMapping("/all")
    public ResponseEntity<Page<Hall>> getAllHalls(
        @RequestParam(name = "page", required = false, defaultValue = "0") int page,
        @RequestParam(name = "size", required = false, defaultValue = "5") int size,
        @RequestParam(name = "sortBy", required = false, defaultValue = "floor") String sortBy,
        @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sorDir,
        @RequestParam(name = "filterBy", required = false) String filterBy ) {

        return ResponseEntity.ok()
                .body(hallService.getAllHalls(page, size, sortBy, sorDir, filterBy));

    }

    @GetMapping("/all/paginated/floor/{id}")
    public ResponseEntity<Page<Hall>> getAllHallsByFloorPaginated(
            @PathVariable(name = "id", required = false) String id,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "5") int size,
            @RequestParam(name = "sortBy", required = false, defaultValue = "floor") String sortBy,
            @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir) {

                return ResponseEntity.ok()
                        .body(hallService.getAllHallsByFloorPaginated(page, size, sortBy, sortDir, id));

    }

    @GetMapping("/all/floor/{id}")
    public ResponseEntity<List<Hall>> getAllHallsByFloor(
            @PathVariable(name = "id", required = false) String id) {

            return ResponseEntity.ok()
                    .body(hallService.getAllHallsByFloor(id));
    }

}
