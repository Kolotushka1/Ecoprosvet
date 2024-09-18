package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.Date;

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
    @Column(unique=true)
    private String telegram;
    @Column(unique=true)
    private Integer telegram_id;
    private String password;
    @Column(unique=true)
    private String phoneNumber;
    private Boolean gender;
    @Column(unique=true)
    private String email;
    private Boolean emailConfirm;
    private Date birthDate;
    @Column(nullable = false)
    private Boolean active = true;
    @ManyToOne
    @JoinColumn(name = "district")
    private District district;
    private Boolean oauth = false;
}