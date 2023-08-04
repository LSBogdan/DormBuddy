package com.example.backend.jpa;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Announcement_Comment")
@Table(name = "announcement_comments")
public class AnnouncementCommentJPA extends BasicEntityJPA{

    @Column
    private String description;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @Column
    private Boolean modified;

    @Column(name = "announcement_id")
    private String announcementId;

    @Column(name = "user_id")
    private String userId;

}
