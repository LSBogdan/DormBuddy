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
@Entity(name = "Event_Commnent")
@Table(name = "event_comments")
public class EventCommentJPA extends BasicEntityJPA{

    @Column
    private String description;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    @Column
    private Boolean modified;

    @Column(name = "event_id")
    private String eventId;

    @Column(name = "user_id")
    private String userId;

}
