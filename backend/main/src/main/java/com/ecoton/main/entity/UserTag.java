package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_tag")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
public class UserTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "interese_id")
    private Tag interese;
}
