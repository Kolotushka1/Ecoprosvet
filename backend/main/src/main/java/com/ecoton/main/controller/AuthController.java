package com.ecoton.main.controller;

import com.ecoton.main.dto.*;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.security.JwtGenerator;
import com.ecoton.main.service.AppUserService;
import com.ecoton.main.service.OrganizationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtGenerator jwtGenerator;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;
    private final OrganizationService organizationService;

    @Autowired
    public AuthController(PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtGenerator jwtGenerator, AppUserService appUserService, OrganizationService organizationService) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
        this.appUserService = appUserService;
        this.organizationService = organizationService;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto, BindingResult result) {

        if (appUserService.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Почта занята!", HttpStatus.BAD_REQUEST);
        }

        if (result.hasErrors()) {
            return new ResponseEntity<>(result.getAllErrors().get(0).getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        if (!registerDto.getPassword().equals(registerDto.getPasswordSecond())) {
            return new ResponseEntity<>("Пароли не совпадают", HttpStatus.BAD_REQUEST);
        }

        String password = passwordEncoder.encode(registerDto.getPassword());
        appUserService.createAppUser(registerDto, password);

        return new ResponseEntity<>("Пользователь успешно зарегистрирован!", HttpStatus.OK);
    }

    @PostMapping("register/organization")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterOrganizationDto registerOrganizationDto, BindingResult result) {

        if (appUserService.existsByEmail(registerOrganizationDto.getEmail())) {
            return new ResponseEntity<>("Почта занята!", HttpStatus.BAD_REQUEST);
        }

        if (result.hasErrors()) {
            return new ResponseEntity<>(result.getAllErrors().get(0).getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        if (!registerOrganizationDto.getPassword().equals(registerOrganizationDto.getPasswordSecond())) {
            return new ResponseEntity<>("Пароли не совпадают", HttpStatus.BAD_REQUEST);
        }

        String password = passwordEncoder.encode(registerOrganizationDto.getPassword());

        AppUser appUser = appUserService.createAppUser(registerOrganizationDto, password);

        organizationService.createOrganization(registerOrganizationDto, appUser);

        return new ResponseEntity<>("Пользователь успешно зарегистрирован! Ваша организация на проверке.", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }

    @PostMapping("check/token")
    public ResponseEntity<Boolean> checkToken(@RequestHeader("Authorization") String token) {
        token = jwtGenerator.cutJwt(token);
        if (!jwtGenerator.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/oauth2/login")
    public ResponseEntity<AuthResponseDto> oauth2Login(Authentication authentication) {
        String token = jwtGenerator.generateToken(authentication.getName());
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }

}
