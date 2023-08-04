package com.example.backend.service;

import com.example.backend.dto.Room;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface RoomService {

    String saveRoom(Room room);
    void deleteRoom(String id);
    Optional<Room> getRoomById(String id);
    Page<Room> getAllRooms(int pageNo, int pageSize, String sortDir, String sortBy, String filterBy);

}
