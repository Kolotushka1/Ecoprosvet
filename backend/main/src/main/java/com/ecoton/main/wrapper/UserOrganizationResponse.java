package com.ecoton.main.wrapper;

import com.ecoton.main.dto.AppOrganizationUsersDto;
import com.ecoton.main.dto.AppUserDto;
import com.ecoton.main.dto.AppUserOrganizationDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter@Setter
public class UserOrganizationResponse {
    private final AppUserDto appUserDto;
    private final AppUserOrganizationDto appUserOrganizationDto;
    private List<AppOrganizationUsersDto> appOrganizationUsersDto;

    public UserOrganizationResponse(AppUserDto appUserDto, AppUserOrganizationDto appUserOrganizationDto) {
        this.appUserDto = appUserDto;
        this.appUserOrganizationDto = appUserOrganizationDto;
    }

    public UserOrganizationResponse(AppUserDto appUserDto, AppUserOrganizationDto appUserOrganizationDto, List<AppOrganizationUsersDto> appOrganizationUsersDto) {
        this.appUserDto = appUserDto;
        this.appUserOrganizationDto = appUserOrganizationDto;
        this.appOrganizationUsersDto = appOrganizationUsersDto;
    }
}
