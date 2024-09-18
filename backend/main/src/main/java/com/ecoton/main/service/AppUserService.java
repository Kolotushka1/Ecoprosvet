package com.ecoton.main.service;

import com.ecoton.main.dto.RegisterDto;
import com.ecoton.main.dto.RegisterOrganizationDto;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.repository.AppUserRepository;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public void createAppUser(RegisterDto registerDto, String password) {
        AppUser appUser = mapRegisterDtoToAppUser(registerDto, password);
        appUserRepository.save(appUser);
    }

    public AppUser createAppUser(RegisterOrganizationDto registerOrganizationDto, String password) {
        AppUser appUser = mapRegisterDtoToAppUser(registerOrganizationDto, password);
        return appUserRepository.save(appUser);
    }

    public boolean existsByEmail(String email) {
        return appUserRepository.existsByEmail(email);
    }

    public AppUser mapRegisterDtoToAppUser(RegisterDto registerDto, String password) {
        AppUser appUser = new AppUser();

        String fio = registerDto.getName() + " " + registerDto.getSurname();
        appUser.setFio(fio);

        appUser.setEmail(registerDto.getEmail());
        appUser.setPhoneNumber(registerDto.getPhone());

        appUser.setPassword(password);

        appUser.setEmailConfirm(false);
        appUser.setActive(true);
        appUser.setTelegram(null);
        appUser.setTelegram_id(null);
        appUser.setGender(null);
        appUser.setBirthDate(null);
        appUser.setDistrict(null);

        return appUser;
    }

    public AppUser mapRegisterDtoToAppUser(RegisterOrganizationDto registerOrganizationDto, String password) {
        AppUser appUser = new AppUser();

        String fio = registerOrganizationDto.getName() + " " + registerOrganizationDto.getSurname();
        appUser.setFio(fio);

        appUser.setEmail(registerOrganizationDto.getEmail());
        appUser.setPhoneNumber(registerOrganizationDto.getPhone());

        appUser.setPassword(password);

        appUser.setEmailConfirm(false);
        appUser.setActive(true);
        appUser.setTelegram(null);
        appUser.setTelegram_id(null);
        appUser.setGender(null);
        appUser.setBirthDate(null);
        appUser.setDistrict(null);

        return appUser;
    }
}
