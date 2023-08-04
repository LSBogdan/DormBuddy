package com.example.backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {

    private String id;
    private String title;
    private String description;
    private LocalDate publishDate;
    private Boolean modified;
    private String userId;

}
