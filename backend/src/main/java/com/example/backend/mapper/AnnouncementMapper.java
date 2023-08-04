package com.example.backend.mapper;

import com.example.backend.dto.Announcement;
import com.example.backend.jpa.AnnouncementJPA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AnnouncementMapper {

    AnnouncementMapper MAPPER = Mappers.getMapper(AnnouncementMapper.class);

    AnnouncementJPA mapToAnnouncementJPA (Announcement announcement);

    Announcement mapToAnnouncement (AnnouncementJPA announcementJPA);

}
