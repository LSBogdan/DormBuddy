package com.example.backend.jpa;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Room")
@Table(name = "rooms")
public class RoomJPA extends BasicEntityJPA {

    @Column(name = "room_number")
    private Integer roomNumber;

    @Column
    private Integer floor;

    @Column
    private Integer capacity;

    @Column
    private Integer price;

}
