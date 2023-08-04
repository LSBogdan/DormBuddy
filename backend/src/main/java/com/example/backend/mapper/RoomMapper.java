package com.example.backend.mapper;

import com.example.backend.dto.Room;
import com.example.backend.jpa.RoomJPA;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomMapper MAPPER = Mappers.getMapper(RoomMapper.class);

    RoomJPA mapToRoomJPA (Room room);

    Room mapToRoom (RoomJPA roomJPA);

}
