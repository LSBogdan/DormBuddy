package com.example.backend.mapper;

import com.example.backend.dto.User;
import com.example.backend.jpa.UserJPA;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    UserJPA mapToUserJPA (User user);

    User mapToUser(UserJPA userJPA);

}
