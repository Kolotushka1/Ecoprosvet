package com.ecoton.main.service;

import com.ecoton.main.entity.AppUser;
import com.ecoton.main.repository.AppUserRepository;
import com.ecoton.main.security.JwtGenerator;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository appUserRepository;

    public CustomOAuth2UserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        AppUser appUser = processOAuth2User(registrationId, attributes);

        return new DefaultOAuth2User(Collections.emptyList(), attributes, "email");
    }

    private AppUser processOAuth2User(String registrationId, Map<String, Object> attributes) {
        String email = null;

        if (registrationId.equalsIgnoreCase("vk")) {
            email = (String) attributes.get("email");
        } else if (registrationId.equalsIgnoreCase("yandex")) {
            email = (String) attributes.get("default_email");
        } else if (registrationId.equalsIgnoreCase("telegram")) {
            email = (String) attributes.get("telegram_email");
        }

        if (email == null) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }

        AppUser existingUser = appUserRepository.findByEmail(email).orElse(null);

        if (existingUser == null) {
            AppUser newUser = AppUser.builder()
                    .email(email)
                    .fio((String) attributes.get("name"))
                    .active(true)
                    .emailConfirm(true)
                    .build();
            return appUserRepository.save(newUser);
        } else {
            existingUser.setFio((String) attributes.get("name"));
            return appUserRepository.save(existingUser);
        }
    }
}

