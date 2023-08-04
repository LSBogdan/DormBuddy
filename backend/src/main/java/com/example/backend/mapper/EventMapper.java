package com.example.backend.mapper;

import com.example.backend.dto.Event;
import com.example.backend.jpa.EventJPA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface EventMapper {

    EventMapper MAPPER = Mappers.getMapper(EventMapper.class);


    EventJPA mapToEventJPA (Event event);


    Event mapToEvent (EventJPA eventJPA);

}
