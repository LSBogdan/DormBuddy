package com.example.backend.mapper;

import com.example.backend.dto.EventComment;
import com.example.backend.jpa.EventCommentJPA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface EventCommentMapper {

    EventCommentMapper MAPPER = Mappers.getMapper(EventCommentMapper.class);


    EventCommentJPA mapToEventCommentJPA (EventComment eventComment);


    EventComment mapToEventComment (EventCommentJPA eventCommentJPA);

}
