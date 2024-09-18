package com.ecoton.main.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter@Setter
public class AppUserOrganizationDto {
    private Long id;
    private String organizationName;
    private String addressRegistration;
    private String inn;
    private Boolean isAdmin = false;
    private Boolean isActive = false;
}
