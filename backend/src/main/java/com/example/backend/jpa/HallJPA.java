package com.example.backend.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Hall")
@Table(name = "halls")
public class HallJPA extends BasicEntityJPA{

    @Column
    private Integer floor;

    @Column(name = "hall_number")
    private Integer hallNumber;

    @Column
    private String name;

}
