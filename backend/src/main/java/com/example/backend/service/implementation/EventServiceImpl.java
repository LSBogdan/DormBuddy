package com.example.backend.service.implementation;

import com.example.backend.dto.Event;
import com.example.backend.dto.EventComment;
import com.example.backend.jpa.EventJPA;
import com.example.backend.jpa.repository.EventJPARepository;
import com.example.backend.jpa.repository.EventComentJPARepository;
import com.example.backend.mapper.EventCommentMapper;
import com.example.backend.mapper.EventMapper;
import com.example.backend.service.EventService;
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
public class EventServiceImpl implements EventService {

    private final EventJPARepository repository;
    private final EventMapper mapper;

    private final EventComentJPARepository eventComentJPARepository;
    private final EventCommentMapper commentMapper;

    @Override
    public String saveEvent(Event event) {

        EventJPA eventJPA = mapper.mapToEventJPA(event);

        if (StringUtils.hasText(event.getId())) {
            eventJPA.setId(event.getId());
        }

        return repository.save(eventJPA).getId();

    }

    @Override
    public void deleteEvent(String id) {

        List<EventComment> eventCommentList =  eventComentJPARepository.findAllByEventId(id).stream().map(commentMapper::mapToEventComment).collect(Collectors.toList());

        if(eventCommentList.size() > 0) {
            for(EventComment eventComment : eventCommentList) {
                eventComentJPARepository.deleteById(eventComment.getId());
            }
        }

        repository.deleteById(id);

    }

    @Override
    public Optional<Event> getEventById(String id) {

        Optional<EventJPA> optionalEventJPA = repository.findById(id);

        if (optionalEventJPA.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(mapper.mapToEvent(optionalEventJPA.get()));
        }
    }

    @Override
    public Page<Event> getAllEvents(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        if (StringUtils.hasText(filterBy)) {

            if (filterBy.contains("hallId=")) {

                String hallId = filterBy.replace("hallId=", "");

                return repository.getAllByHallId(hallId, pageable).map(mapper::mapToEvent);

            }

            else if (filterBy.contains("userId=")) {

                String userId = filterBy.replace("userId=", "");

                return repository.getAllByUserId(userId, pageable).map(mapper::mapToEvent);

            }

            else
            {

                String title = filterBy.replace("title=", "");

                return repository.getAllByTitleContainingIgnoreCase(title, pageable).map(mapper::mapToEvent);

            }

        } else {
            return repository.findAll(pageable).map(mapper::mapToEvent);
        }
    }
}
