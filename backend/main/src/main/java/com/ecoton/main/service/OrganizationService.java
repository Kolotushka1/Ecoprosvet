package com.ecoton.main.service;

import com.ecoton.main.dto.RegisterOrganizationDto;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.entity.Organization;
import com.ecoton.main.entity.OrganizationUsers;
import com.ecoton.main.repository.OrganizationRepository;
import com.ecoton.main.repository.OrganizationUserRepository;
import org.springframework.stereotype.Service;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final OrganizationUserRepository organizationUserRepository;

    public OrganizationService(OrganizationRepository organizationRepository, OrganizationUserRepository organizationUserRepository) {
        this.organizationRepository = organizationRepository;
        this.organizationUserRepository = organizationUserRepository;
    }

    public void createOrganization(RegisterOrganizationDto registerOrganizationDto, AppUser appUser) {
        Organization organization = new Organization();
        organization.setOrganizationName(registerOrganizationDto.getOrganizationName());
        organization.setAddressRegistration(registerOrganizationDto.getAddressRegistration());
        organization.setInn(registerOrganizationDto.getInn());
        organization.setUserAdminId(appUser.getId());
        Organization newOrganization = organizationRepository.save(organization);
        addUserToOrganization(appUser, newOrganization);
    }

    public void addUserToOrganization(AppUser user, Organization organization) {
        OrganizationUsers organizationUser = new OrganizationUsers();
        organizationUser.setUser(user);
        organizationUser.setOrganization(organization);
        organizationUserRepository.save(organizationUser);
    }

}
