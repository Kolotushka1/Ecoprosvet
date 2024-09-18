package com.ecoton.main.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organization_users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
public class OrganizationUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
}
