package com.ecoton.main.controller;

import com.ecoton.main.dto.AuthResponseDto;
import com.ecoton.main.dto.LoginDto;
import com.ecoton.main.dto.RegisterDto;
import com.ecoton.main.entity.AppUser;
import com.ecoton.main.repository.AppUserRepositoy;
import com.ecoton.main.repository.RoleRepository;
import com.ecoton.main.security.JwtGenerator;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtGenerator jwtGenerator;
    private final AppUserRepositoy appUserRepository;
    private final PasswordEncoder passwordEncoder;
    public final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AppUserRepositoy appUserRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtGenerator jwtGenerator) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }
    @PostMapping("register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto, BindingResult result) {

        if (appUserRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Почта занята!", HttpStatus.BAD_REQUEST);
        }

        if (result.hasErrors()) {
            return new ResponseEntity<>(result.getAllErrors().get(0).getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        if (!registerDto.getPassword().equals(registerDto.getPasswordSecond())) {
            return new ResponseEntity<>("Пароли не совпадают", HttpStatus.BAD_REQUEST);
        }

        AppUser appUser = new AppUser();
        appUser.setEmail(registerDto.getEmail());
        appUser.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        appUserRepository.save(appUser);

        return new ResponseEntity<>("Пользователь успешно зарегистрирован!", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }
}
