package com.ecoton.main.service;

import com.ecoton.main.dto.AppOrganizationUsersDto;
import com.ecoton.main.dto.RegisterOrganizationDto;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.entity.Organization;
import com.ecoton.main.entity.OrganizationUsers;
import com.ecoton.main.repository.OrganizationRepository;
import com.ecoton.main.repository.OrganizationUserRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public Organization getOrganizationInfo(AppUser appUser) {
        OrganizationUsers organizationUsers = organizationUserRepository.findOrganizationUsersByUser(appUser).orElse(null);
        if (organizationUsers != null) {
            Long organizationId = organizationUsers.getId();
            return organizationRepository.findById(organizationId).orElse(null);
        }
        return null;
    }

    public List<AppOrganizationUsersDto> getOrganizationUsers() {
        List<OrganizationUsers> organizationUsers = organizationUserRepository.findAll();
        return organizationUsers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Organization isOrganizationAdmin(Long userId) {
        return organizationRepository.getOrganizationByUserAdminId(userId);
    }

    public Organization getOrganizationById(Long organizationId) {
        return organizationRepository.getOrganizationById(organizationId);
    }

    public void addUserToOrganization(AppUser user, Organization organization) {
        OrganizationUsers organizationUser = new OrganizationUsers();
        organizationUser.setUser(user);
        organizationUser.setOrganization(organization);
        organizationUserRepository.save(organizationUser);
    }
    private AppOrganizationUsersDto convertToDto(OrganizationUsers organizationUser) {
        AppOrganizationUsersDto dto = new AppOrganizationUsersDto();
        dto.setId(organizationUser.getId());
        dto.setUser(organizationUser.getUser());
        return dto;
    }

}
