package com.example.backend.mapper;

import com.example.backend.dto.AnnouncementComment;
import com.example.backend.jpa.AnnouncementCommentJPA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AnnouncementCommentMapper {

    AnnouncementCommentMapper MAPPER = Mappers.getMapper(AnnouncementCommentMapper.class);


    AnnouncementCommentJPA mapToAnnouncementCommentJPA (AnnouncementComment announcementComment);

    AnnouncementComment mapToAnnouncementComment (AnnouncementCommentJPA announcementCommentJPA);

}
