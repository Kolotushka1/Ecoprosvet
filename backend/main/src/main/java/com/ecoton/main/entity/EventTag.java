package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "event_tag")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
public class EventTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
