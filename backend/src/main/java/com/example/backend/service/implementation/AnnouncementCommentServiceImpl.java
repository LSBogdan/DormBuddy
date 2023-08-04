package com.example.backend.service.implementation;

import com.example.backend.dto.AnnouncementComment;
import com.example.backend.jpa.AnnouncementCommentJPA;
import com.example.backend.jpa.repository.AnnouncementCommentJPARepository;
import com.example.backend.mapper.AnnouncementCommentMapper;
import com.example.backend.service.AnnouncementCommentService;
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
public class AnnouncementCommentServiceImpl implements AnnouncementCommentService {

    private final AnnouncementCommentJPARepository repository;
    private final AnnouncementCommentMapper mapper;

    @Override
    public String saveAnnouncementComment(AnnouncementComment announcementComment) {

        AnnouncementCommentJPA announcementCommentJPA = mapper.mapToAnnouncementCommentJPA(announcementComment);

        if(StringUtils.hasText(announcementComment.getId())) {
            announcementCommentJPA.setId(announcementComment.getId());
        }

        return repository.save(announcementCommentJPA).getId();

    }

    @Override
    public void deleteAnnouncementComment(String id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<AnnouncementComment> getAnnouncementCommentById(String id) {

        Optional<AnnouncementCommentJPA> optionalAnnouncementCommentJPA = repository.findById(id);

        if(optionalAnnouncementCommentJPA.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(mapper.mapToAnnouncementComment(optionalAnnouncementCommentJPA.get()));
        }
    }

    @Override
    public List<AnnouncementComment> getAllAnnouncementComments(String announcementId) {

        return repository.findAllByAnnouncementId(announcementId).stream().map(mapper::mapToAnnouncementComment).collect(Collectors.toList());
    }

    @Override
    public  Page<AnnouncementComment> getAllAnnouncementCommentsPaginated(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir), sortBy);

        if(StringUtils.hasText(filterBy)) {
            return repository.findAllByUserId(filterBy, pageable).map(mapper::mapToAnnouncementComment);
        } else {
            return repository.findAll(pageable).map(mapper::mapToAnnouncementComment);
        }
    }

}
