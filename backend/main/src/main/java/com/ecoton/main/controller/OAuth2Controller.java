package com.ecoton.main.controller;

import com.ecoton.main.dto.AuthResponseDto;
import com.ecoton.main.dto.OAuth2TokenRequest;
import com.ecoton.main.dto.oauth.YandexUserInfo;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.security.JwtGenerator;
import com.ecoton.main.service.AppUserService;
import com.ecoton.main.service.CustomOAuth2UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.SecureRandom;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class OAuth2Controller {
    private final CustomOAuth2UserService customOAuth2UserService;
    private final AppUserService appUserService;
    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;
    private final PasswordEncoder passwordEncoder;

    public OAuth2Controller(CustomOAuth2UserService customOAuth2UserService, AppUserService appUserService, AuthenticationManager authenticationManager, JwtGenerator jwtGenerator, PasswordEncoder passwordEncoder) {
        this.customOAuth2UserService = customOAuth2UserService;
        this.appUserService = appUserService;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/oauth2/yandex")
    public ResponseEntity<?> yandexLogin(@RequestBody OAuth2TokenRequest loginRequest) {
        YandexUserInfo yandexData = customOAuth2UserService.getYandexData(loginRequest.getToken());

        Optional<AppUser> appUser = appUserService.findUserByEmailAndPhoneNumber(yandexData.getDefault_email(), yandexData.getDefault_phone().getNumber());

        if (appUser.isPresent() && appUser.get().getOauth()) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(appUser.get().getEmail(), null, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
        }

        if (appUserService.existsByEmail(yandexData.getDefault_email())) {
            return new ResponseEntity<>("Почта занята!", HttpStatus.BAD_REQUEST);
        }

        if (appUserService.existsByPhone(yandexData.getDefault_phone().getNumber())) {
            return new ResponseEntity<>("Телефон занят!", HttpStatus.BAD_REQUEST);
        }

        String password = appUserService.generateRandomPassword();
        password = passwordEncoder.encode(password);
        yandexData.setPassword(password);

        AppUser appUserNew = appUserService.createAppUserYandex(yandexData);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(appUserNew.getEmail(), null, null));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }

}