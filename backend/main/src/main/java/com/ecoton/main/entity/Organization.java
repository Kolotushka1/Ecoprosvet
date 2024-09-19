package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "organization")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String organizationName;
    private String addressRegistration;
    private String inn;
    private Long userAdminId;
    private Boolean isActive = false;
    private String address;
    private String pointX;
    private String pointY;
    private Boolean isEcoCentre = false;
    @Enumerated(EnumType.STRING)
    private OrgType orgType;
    @Column(columnDefinition = "TEXT")
    private String data;
}
