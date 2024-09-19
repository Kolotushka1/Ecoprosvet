package com.ecoton.main.controller;

import com.ecoton.main.dto.AppOrganizationUsersDto;
import com.ecoton.main.dto.AppUserOrganizationDto;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.dto.AppUserDto;
import com.ecoton.main.entity.Organization;
import com.ecoton.main.security.JwtGenerator;
import com.ecoton.main.security.JwtShortener;
import com.ecoton.main.service.AppUserService;
import com.ecoton.main.service.OrganizationService;
import com.ecoton.main.wrapper.UserOrganizationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class AppUserController {
    private final JwtGenerator jwtGenerator;
    private final AppUserService appUserService;
    private final OrganizationService organizationService;
    private final JwtShortener jwtShortener;

    @Autowired
    public AppUserController(JwtGenerator jwtGenerator, AppUserService appUserService, OrganizationService organizationService, JwtShortener jwtShortener) {
        this.jwtGenerator = jwtGenerator;
        this.appUserService = appUserService;
        this.organizationService = organizationService;
        this.jwtShortener = jwtShortener;
    }

    @GetMapping("get/user/profile")
    public ResponseEntity<AppUserDto> getUserData(@RequestHeader("Authorization") String token) {
        token = jwtGenerator.cutJwt(token);
        if (!jwtGenerator.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userEmail = jwtGenerator.getEmailFromJWT(token);
        AppUser appUser = appUserService.getUserData(userEmail);
        if (appUser != null) {
            return new ResponseEntity<>(convertToDto(appUser), HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("get/user/organization")
    private ResponseEntity<UserOrganizationResponse> getUserOrganization(@RequestHeader("Authorization") String token) {
        token = jwtGenerator.cutJwt(token);
        if (!jwtGenerator.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userEmail = jwtGenerator.getEmailFromJWT(token);
        AppUser appUser = appUserService.getUserData(userEmail);
        if (appUser != null) {
            Long appUserId = appUser.getId();
            Organization organization = organizationService.getOrganizationInfo(appUser);
            AppUserDto appUserDto = convertToDto(appUser);
            AppUserOrganizationDto appUserOrganizationDto = convertToOrganizationDto(organization, appUserId);
            if (appUserOrganizationDto.getIsAdmin()) {
                List<AppOrganizationUsersDto> appOrganizationUsersDto = organizationService.getOrganizationUsers();
                UserOrganizationResponse response = new UserOrganizationResponse(appUserDto, appUserOrganizationDto, appOrganizationUsersDto);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                UserOrganizationResponse response = new UserOrganizationResponse(appUserDto, appUserOrganizationDto);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("post/generate-link")
    private ResponseEntity<String> createLinkCreateOrganizationUser(@RequestHeader("Authorization") String token) {
        token = jwtGenerator.cutJwt(token);
        if (!jwtGenerator.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userEmail = jwtGenerator.getEmailFromJWT(token);
        AppUser appUser = appUserService.getUserData(userEmail);
        Long userId = appUser.getId();
        Organization isOrganizationAdmin = organizationService.isOrganizationAdmin(userId);
        if (isOrganizationAdmin != null) {
            String tokenRegister = jwtGenerator.generateRegistrationToken(isOrganizationAdmin.getUserAdminId());
            tokenRegister = jwtShortener.shortenToken(tokenRegister);
            String link = "192.168.0.109:8090/api/auth/register/link?tokenregister=" + tokenRegister;
            return new ResponseEntity<>(link, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public AppUserDto convertToDto(AppUser appUser) {
        AppUserDto appUserDto = new AppUserDto();
        appUserDto.setId(appUser.getId());
        appUserDto.setFio(appUser.getFio());
        appUserDto.setPhoneNumber(appUser.getPhoneNumber());
        appUserDto.setGender(appUserDto.getGender());
        appUserDto.setEmail(appUser.getEmail());
        appUserDto.setEmailConfirm(appUser.getEmailConfirm());
        appUserDto.setActive(appUser.getActive());
        appUserDto.setDistrict(appUser.getDistrict());
        appUserDto.setBirthDate(appUser.getBirthDate());
        return appUserDto;
    }

    public AppUserOrganizationDto convertToOrganizationDto(Organization organizationUser, Long appUserId) {
        AppUserOrganizationDto appUserOrganizationDto = new AppUserOrganizationDto();
        appUserOrganizationDto.setAddressRegistration(organizationUser.getAddressRegistration());
        appUserOrganizationDto.setInn(organizationUser.getInn());
        appUserOrganizationDto.setIsActive(organizationUser.getIsActive());
        appUserOrganizationDto.setOrganizationName(appUserOrganizationDto.getOrganizationName());
        if (organizationUser.getUserAdminId().equals(appUserId)) {
            appUserOrganizationDto.setIsAdmin(true);
        } else {
            appUserOrganizationDto.setIsAdmin(false);
        }
        return appUserOrganizationDto;
    }
}
