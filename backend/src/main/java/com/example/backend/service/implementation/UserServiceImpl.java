package com.example.backend.service.implementation;

import com.example.backend.dto.Room;
import com.example.backend.dto.User;
import com.example.backend.dto.enums.Role;
import com.example.backend.jpa.UserJPA;
import com.example.backend.jpa.repository.RoomJPARepository;
import com.example.backend.jpa.repository.UserJPARepository;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserJPARepository repository;
    private final UserMapper mapper;
    private final RoomJPARepository roomRepository;
    private final RoomMapper roomMapper;

    private Boolean isRoomSuitableForUser(Room room, User user) {

        List<User> studentsAssignedToRoom = repository.findUserJPAByRoomId(room.getId()).stream().map(mapper::mapToUser).collect(Collectors.toList());

        if(studentsAssignedToRoom.size() == 0){
            return true;
        }

        if (studentsAssignedToRoom.size() == 3) {
            return false;
        }

        for(User currentUser : studentsAssignedToRoom) {
            if (!currentUser.getGender().equalsIgnoreCase(user.getGender())) {
                return false;
            }
        }

        return true;
    }

    @Override
    public String saveUser(User user) {

        if(user.getRole().toString().equalsIgnoreCase("STUDENT")) {

            List<Room> availableRooms = roomRepository
                    .findAllByOrderByRoomNumber().stream().map(roomMapper::mapToRoom).collect(Collectors.toList());

            for(Room currentRoom : availableRooms) {
                if(isRoomSuitableForUser(currentRoom, user)) {
                    user.setRoomId(currentRoom.getId());
                    break;
                }
            }
        }

        UserJPA userJPA = mapper.mapToUserJPA(user);

        if (StringUtils.hasText(user.getId())) {
            userJPA.setId(user.getId());
        }

        return repository.save(userJPA).getId();

    }

    @Override
    public void deleteUser(String id) {

        repository.deleteById(id);

    }

    @Override
    public Optional<User> getUserById(String id) {

        Optional<UserJPA> optionalUserJPA = repository.findById(id);

        if (optionalUserJPA.isEmpty()) {
            return Optional.empty();
        }
        else {
            return Optional.of(mapper.mapToUser(optionalUserJPA.get()));
        }
    }

    @Override
    public Optional<User> getUserByEmail(String email) {

        Optional<UserJPA> optionalUserJPA = repository.findByEmail(email);

        if (optionalUserJPA.isEmpty()) {
            return  Optional.empty();
        }
        else {
            return Optional.of(mapper.mapToUser(optionalUserJPA.get()));
        }
    }

    @Override
    public Page<User> getAllUsers(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        return repository.findAll(pageable).map(mapper::mapToUser);

    }

    @Override
    public Page<User> getAllStudents(int pageNo, int pageSize, String sortBy, String sortDir) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        return repository.findAllByRole(Role.STUDENT, pageable).map(mapper::mapToUser);
    }

    @Override
    public Page<User> getAllEmployes(int pageNo, int pageSize, String sortDir, String sortBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        return repository.findAllByRoleNot(Role.STUDENT, pageable).map(mapper::mapToUser);

    }
}
