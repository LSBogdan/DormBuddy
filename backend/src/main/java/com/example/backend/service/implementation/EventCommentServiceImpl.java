package com.example.backend.service.implementation;

import com.example.backend.dto.EventComment;
import com.example.backend.jpa.EventCommentJPA;
import com.example.backend.jpa.repository.EventComentJPARepository;
import com.example.backend.mapper.EventCommentMapper;
import com.example.backend.service.EventCommentService;
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
public class EventCommentServiceImpl implements EventCommentService {

    private final EventComentJPARepository repository;
    private final EventCommentMapper mapper;

    @Override
    public String saveEventComment(EventComment eventComment) {

        EventCommentJPA eventCommentJPA = mapper.mapToEventCommentJPA(eventComment);

        if (StringUtils.hasText(eventComment.getId())) {
            eventCommentJPA.setId(eventComment.getId());
        }

        return repository.save(eventCommentJPA).getId();

    }

    @Override
    public void deleteEventComment(String id) {

        repository.deleteById(id);
    }

    @Override
    public Optional<EventComment> getEventCommentById(String id) {

        Optional<EventCommentJPA> optionalEventCommentJPA = repository.findById(id);

        if (optionalEventCommentJPA.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(mapper.mapToEventComment(optionalEventCommentJPA.get()));
        }
    }

    @Override
    public List<EventComment> getAllEventComments(String eventId) {

        return repository.findAllByEventId(eventId).stream().map(mapper::mapToEventComment).collect(Collectors.toList());

    }

    @Override
    public Page<EventComment> getAllEventCommentsPaginated(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        if(StringUtils.hasText(filterBy)) {

            if(filterBy.contains("eventId=")) {

                String eventId = filterBy.replace("eventId=", "");

                return repository.getAllByEventId(eventId, pageable).map(mapper::mapToEventComment);
            }

            else {

                String userId = filterBy.replace("userId=", "");

                return repository.getAllByUserId(userId, pageable).map(mapper::mapToEventComment);

            }
        }

        else {
            return repository.findAll(pageable).map(mapper::mapToEventComment);
        }

    }

}
