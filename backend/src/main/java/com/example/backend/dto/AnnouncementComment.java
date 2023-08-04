package com.example.backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnouncementComment {

    private String id;
    private String description;
    private LocalDate publishDate;
    private Boolean modified;
    private String announcementId;
    private String userId;

}
