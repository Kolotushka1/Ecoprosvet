package com.ecoton.main.service;

import com.ecoton.main.dto.oauth.YandexUserInfo;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.repository.AppUserRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CustomOAuth2UserService {

    private final AppUserRepository appUserRepository;

    public CustomOAuth2UserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public YandexUserInfo getYandexData(String token) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Oauth " + token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<YandexUserInfo> response = restTemplate.exchange(
                "https://login.yandex.ru/info?format=json",
                HttpMethod.GET,
                entity,
                YandexUserInfo.class
        );

        return response.getBody();
    }
}
