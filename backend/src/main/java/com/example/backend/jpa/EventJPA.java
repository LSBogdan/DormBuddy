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
@Entity(name = "Event")
@Table(name = "events")
public class EventJPA extends BasicEntityJPA{

    @Column
    private String title;

    @Column
    private String description;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column
    private Boolean modified;

    @Column(name = "hall_id")
    private String hallId;


    @Column(name = "user_id")
    private String userId;

}
