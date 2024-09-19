package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.math.BigInteger;
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
    private BigInteger telegram_id;
    private String password;
    @Column(unique=true)
    private String phoneNumber;
    @Column(columnDefinition = "TINYINT")
    private Boolean gender;
    @Column(unique=true)
    private String email;
    @Column(columnDefinition = "TINYINT")
    private Boolean emailConfirm;
    private Date birthDate;
    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean active = true;
    @ManyToOne
    @JoinColumn(name = "district")
    private District district;
    @Column(columnDefinition = "TINYINT")
    private Boolean oauth = false;
}