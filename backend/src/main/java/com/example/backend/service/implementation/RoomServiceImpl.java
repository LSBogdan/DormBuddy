package com.example.backend.service.implementation;

import com.example.backend.dto.Room;
import com.example.backend.jpa.RoomJPA;
import com.example.backend.jpa.repository.RoomJPARepository;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.service.RoomService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.naming.ldap.SortKey;
import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomJPARepository repository;
    private final RoomMapper mapper;

    @Override
    public String saveRoom(Room room) {

        RoomJPA roomJPA = mapper.mapToRoomJPA(room);

        if (StringUtils.hasText(room.getId())) {
            roomJPA.setId(room.getId());
        }

        return repository.save(roomJPA).getId();

    }

    @Override
    public void deleteRoom(String id) {

        repository.deleteById(id);

    }

    @Override
    public Optional<Room> getRoomById(String id) {

        Optional<RoomJPA> optionalRoomJPA = repository.findById(id);

        if (optionalRoomJPA.isEmpty()) {
            return Optional.empty();
        }

        else {
            return Optional.of(mapper.mapToRoom(optionalRoomJPA.get()));
        }

    }

    @Override
    public Page<Room> getAllRooms(int pageNo, int pageSize, String sortDir, String sortBy, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        if (StringUtils.hasText(filterBy)) {

            Integer floor = Integer.getInteger(filterBy);

            return repository.getAllByFloor(floor, pageable).map(mapper::mapToRoom);

        } else {
            return repository.findAll(pageable).map(mapper::mapToRoom);
        }

    }

}
