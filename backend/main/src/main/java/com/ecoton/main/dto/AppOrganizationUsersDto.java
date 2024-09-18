package com.ecoton.main.dto;

import com.ecoton.main.entity.AppUser;
import com.ecoton.main.entity.Organization;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter@Setter
public class AppOrganizationUsersDto {
    private Long id;
    private AppUser user;
    private Organization organization;
}
