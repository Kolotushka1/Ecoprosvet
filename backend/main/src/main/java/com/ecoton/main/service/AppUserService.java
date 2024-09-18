package com.ecoton.main.service;

import com.ecoton.main.dto.RegisterDto;
import com.ecoton.main.dto.RegisterOrganizationDto;
import com.ecoton.main.dto.oauth.YandexUserInfo;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

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

    public AppUser getUserData(String userEmail) {
        return appUserRepository.findByEmail(userEmail).orElse(null);
    }

    public AppUser createAppUserYandex(YandexUserInfo yandexUserInfo) {
        AppUser appUser = new AppUser();
        AppUser appUserNew = mapRegisterDtoToYandex(appUser, yandexUserInfo);
        return appUserRepository.save(appUserNew);
    }

    public boolean existsByEmail(String email) {
        return appUserRepository.existsByEmail(email);
    }

    public Optional<AppUser> findUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public Optional<AppUser> findUserByPhone(String phone) {
        return appUserRepository.findByPhoneNumber(phone);
    }

    public boolean existsByPhone(String phone) {
        return appUserRepository.existsByPhoneNumber(phone);
    }

    public Optional<AppUser> findUserByEmailAndPhoneNumber(String email, String phone) {
        return appUserRepository.findByEmailAndPhoneNumber(email, phone);
    }

    public String generateRandomPassword() {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        final int PASSWORD_LENGTH = 12;
        final SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            password.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return password.toString();
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

    public AppUser mapRegisterDtoToYandex(AppUser appUser, YandexUserInfo yandexUserInfo) {
        appUser.setFio(yandexUserInfo.getFirst_name() + " " + yandexUserInfo.getLast_name());
        appUser.setPhoneNumber(yandexUserInfo.getDefault_phone().getNumber());
        appUser.setEmail(yandexUserInfo.getDefault_email());
        appUser.setEmailConfirm(true);
        appUser.setBirthDate(yandexUserInfo.getBirthday());
        appUser.setActive(true);
        appUser.setOauth(true);
        appUser.setPassword(null);
        return appUser;
    }

}
