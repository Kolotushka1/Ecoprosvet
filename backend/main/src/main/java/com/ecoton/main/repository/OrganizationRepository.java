package com.ecoton.main.repository;

import com.ecoton.main.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Organization getOrganizationByUserAdminId(Long userAdminId);
    Organization getOrganizationById(Long id);
}
