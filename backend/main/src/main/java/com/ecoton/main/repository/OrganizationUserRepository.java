package com.ecoton.main.repository;

import com.ecoton.main.entity.OrganizationUsers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationUserRepository extends JpaRepository<OrganizationUsers, Long> {
}
