package com.example.backend.controller;

import com.example.backend.dto.Room;
import com.example.backend.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping(value = "/api/v1/room", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("")
    public ResponseEntity<Room> createRoom(@RequestBody Room room) throws URISyntaxException {

        String roomId = roomService.saveRoom(room);

        final var uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/" + roomId).toUriString();

        return ResponseEntity.created(new URI(uri))
                .body(roomService.getRoomById(roomId).get());

    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Room> updateRoom(@PathVariable("id") String id, @RequestBody Room room) {

        String roomId = roomService.saveRoom(room);

        return ResponseEntity.ok()
                .body(roomService.getRoomById(roomId).get());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable("id") String id) {

        return ResponseEntity.ok().body(roomService.getRoomById(id).get());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomById(@PathVariable("id") String id) {

        roomService.deleteRoom(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    private ResponseEntity<Page<Room>> getAllRooms (
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "size", required = false, defaultValue = "5") int size,
            @RequestParam(name = "sortBy", required = false, defaultValue = "roomNumber") String sortBy,
            @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir,
            @RequestParam(name = "filterBy", required = false) String filterBy ) {

                return ResponseEntity.ok()
                        .body(roomService.getAllRooms(page, size, sortBy, sortDir, filterBy));
    }

    @GetMapping("/all/{id}")
    private ResponseEntity<Page<Room>> getAllRoomsByFloor (
          @PathVariable(name = "id", required = false) String id,
          @RequestParam(name = "page", required = false, defaultValue = "0") int page,
          @RequestParam(name = "size", required = false, defaultValue = "5") int size,
          @RequestParam(name = "sortBy", required = false, defaultValue = "roomNumber") String sortBy,
          @RequestParam(name = "sortDir", required = false, defaultValue = "asc") String sortDir ) {

                return ResponseEntity.ok()
                        .body(roomService.getAllRooms(page, size, sortBy, sortDir, id));

    }

}
