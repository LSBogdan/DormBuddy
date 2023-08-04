package com.example.backend.service.implementation;

import com.example.backend.dto.Hall;
import com.example.backend.jpa.HallJPA;
import com.example.backend.jpa.repository.HallJPARepository;
import com.example.backend.mapper.HallMapper;
import com.example.backend.service.HallService;
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
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HallServiceImpl implements HallService {

    private final HallJPARepository repository;
    private final HallMapper mapper;

    @Override
    public String saveHall(Hall hall) {

        HallJPA hallJPA = mapper.mapToHallJPA(hall);

        if (StringUtils.hasText(hall.getId())) {
            hallJPA.setId(hall.getId());
        }

        return repository.save(hallJPA).getId();

    }

    @Override
    public void deleteHall(String id) {

        repository.deleteById(id);
    }

    @Override
    public Optional<Hall> getHallById(String id) {

        Optional<HallJPA> optionalHallJPA = repository.findById(id);

        if (optionalHallJPA.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(mapper.mapToHall(optionalHallJPA.get()));
        }
    }

    @Override
    public Optional<Hall> getHallByHallNumber(String id) {

        Integer hallNumber = Integer.parseInt(id);

        Optional<HallJPA> optionalHallJPA = repository.findByHallNumber(hallNumber);

        if (optionalHallJPA.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(mapper.mapToHall(optionalHallJPA.get()));
        }
    }


    @Override
    public Page<Hall> getAllHalls(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        return repository.findAll(pageable).map(mapper::mapToHall);
    }

    @Override
    public Page<Hall> getAllHallsByFloorPaginated(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        Integer floor = Integer.parseInt(filterBy);

        return repository.findAllByFloor(floor, pageable).map(mapper::mapToHall);

    }

    @Override
    public List<Hall> getAllHallsByFloor(String filterBy) {

        Integer floor = Integer.parseInt(filterBy);

        return repository.findAllByFloor(floor).stream().map(mapper::mapToHall).collect(Collectors.toList());

    }

}