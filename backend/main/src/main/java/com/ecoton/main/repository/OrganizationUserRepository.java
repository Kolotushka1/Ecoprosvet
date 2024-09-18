package com.ecoton.main.repository;

import com.ecoton.main.entity.AppUser;
import com.ecoton.main.entity.OrganizationUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizationUserRepository extends JpaRepository<OrganizationUsers, Long> {
    Optional<OrganizationUsers> findOrganizationUsersByUser(AppUser user);
}
