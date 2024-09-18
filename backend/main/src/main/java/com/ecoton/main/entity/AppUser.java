package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fio;
    private String telegram;
    private String login;
    private String password;
    private String phoneNumber;
    private String gender;
    private String email;
    private Boolean emailConfirm;
    private Boolean active;
    @ManyToOne
    @JoinColumn(name = "district")
    private District district;
}
