package com.example.backend.dto;

import com.example.backend.dto.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    private String id;
    private String firstName;
    private String lastName;
    private String gender;
    private String mobileNumber;
    private String email;
    private Role role;

    // Extra fields for student role
    private String faculty;
    private String roomId;

}
