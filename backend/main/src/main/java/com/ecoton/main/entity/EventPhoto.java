package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "event_photo")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
public class EventPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String path;
    private int sort;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}
