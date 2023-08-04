package com.example.backend.service.implementation;

import com.example.backend.dto.Announcement;
import com.example.backend.dto.AnnouncementComment;
import com.example.backend.jpa.AnnouncementJPA;
import com.example.backend.jpa.UserJPA;
import com.example.backend.jpa.repository.AnnouncementCommentJPARepository;
import com.example.backend.jpa.repository.AnnouncementJPARepository;
import com.example.backend.jpa.repository.UserJPARepository;
import com.example.backend.mapper.AnnouncementCommentMapper;
import com.example.backend.mapper.AnnouncementMapper;
import com.example.backend.service.AnnouncementService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementJPARepository repository;
    private final AnnouncementMapper mapper;

    private final AnnouncementCommentJPARepository announcementCommentJPARepository;
    private final AnnouncementCommentMapper announcementCommentMapper;

    @Override
    public String saveAnnouncement(Announcement announcement) {

        AnnouncementJPA announcementJPA = mapper.mapToAnnouncementJPA(announcement);


        if (StringUtils.hasText(announcement.getId())) {
            announcementJPA.setId(announcement.getId());
        }

        return repository.save(announcementJPA).getId();

    }

    @Override
    public void deleteAnnouncement(String id) {

        List<AnnouncementComment> announcementCommentList = announcementCommentJPARepository.findAllByAnnouncementId(id).stream().map(announcementCommentMapper::mapToAnnouncementComment).collect(Collectors.toList());

        if(announcementCommentList.size() > 0) {
            for(AnnouncementComment announcementComment : announcementCommentList) {
                announcementCommentJPARepository.deleteById(announcementComment.getId());
            }
        }

        repository.deleteById(id);

    }

    @Override
    public Optional<Announcement> getAnnouncementById(String id) {

        Optional<AnnouncementJPA> optionalAnnouncementJPA = repository.findById(id);

        if(optionalAnnouncementJPA.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(mapper.mapToAnnouncement(optionalAnnouncementJPA.get()));
        }

    }

    @Override
    public Page<Announcement> getAllAnnouncements(int pageNo, int pageSize, String sortBy, String sortDir, String filterBy) {

        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.Direction.fromString(sortDir) , sortBy);

        if(StringUtils.hasText(filterBy)) {
            return repository.findAllByUserId(filterBy, pageable).map(mapper::mapToAnnouncement);
        } else {
            return repository.findAll(pageable).map(mapper::mapToAnnouncement);
        }
    }
}
