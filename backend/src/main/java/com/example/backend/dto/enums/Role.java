package com.example.backend.dto.enums;


import lombok.Getter;

@Getter
public enum Role {

    ADMINISTRATOR("Administrator"),
    STUDENT("Student"),
    JANITOR("Janitor"),
    MENTENANCE_MAN("MentenanceMan");

    private String role;

    private Role(String role) {
        this.role = role;
    }

    public static Role findByValue(String value) {

        for (Role userRole : values()) {
            if (userRole.role.equalsIgnoreCase(value)) {
                return userRole;
            }
        }
        return null;
    }

}
