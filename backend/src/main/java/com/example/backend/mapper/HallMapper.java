package com.example.backend.mapper;

import com.example.backend.dto.Hall;
import com.example.backend.jpa.HallJPA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface HallMapper {

    HallMapper MAPPER = Mappers.getMapper(HallMapper.class);

    HallJPA mapToHallJPA (Hall hall);

    Hall mapToHall (HallJPA hallJPA);

}
