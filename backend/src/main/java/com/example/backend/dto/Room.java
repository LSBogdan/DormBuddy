package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    private String id;
    private Integer roomNumber;
    private Integer floor;
    private Integer capacity;
    private Integer price;

}
