package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hall {

    private String id;
    private Integer floor;
    private Integer hallNumber;
    private String name;

}
