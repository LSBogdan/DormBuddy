package com.example.backend.jpa;

import com.example.backend.dto.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "User")
@Table(name = "users")
public class UserJPA extends BasicEntityJPA{

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column
    private String gender;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column
    private String email;

    @Column
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column
    private String faculty;

    @Column(name = "room_id")
    private String roomId;

}
