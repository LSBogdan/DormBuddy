package com.example.backend.jpa;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Announcement")
@Table(name = "announcements")
public class AnnouncementJPA extends BasicEntityJPA{

    @Column
    private String title;

    @Column
    private String description;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @Column
    private Boolean modified;

    @Column(name = "user_id")
    private String userId;

}
