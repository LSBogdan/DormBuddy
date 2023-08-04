package com.example.backend.service;

import com.example.backend.dto.Hall;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface HallService {

    String saveHall(Hall hall);

    void deleteHall(String id);

    Optional<Hall> getHallById(String id);

    Page<Hall> getAllHalls(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy);

    Page<Hall> getAllHallsByFloorPaginated(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy);

    List<Hall> getAllHallsByFloor(String filterBy);

    Optional<Hall> getHallByHallNumber(String id);

}
