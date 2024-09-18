package com.ecoton.main.security;

import com.ecoton.main.repository.AppUserRepository;
import com.ecoton.main.service.CustomOAuth2UserService;
import com.ecoton.main.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthEntryPoint authEntryPoint;
    private final AppUserRepository appUserRepository;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService, JwtAuthEntryPoint authEntryPoint, AppUserRepository appUserRepository) {
        this.customUserDetailsService = customUserDetailsService;
        this.authEntryPoint = authEntryPoint;
        this.appUserRepository = appUserRepository;
    }

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(configurer ->
                        configurer
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET).permitAll()
                                .requestMatchers(HttpMethod.POST).permitAll()
                                .requestMatchers("/api/spaces/create").permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(authEntryPoint)
                )
                .csrf(AbstractHttpConfigurer::disable);
//                .oauth2Login(oauth ->
//                        oauth.defaultSuccessUrl("/", true)
//                                .userInfoEndpoint()
//                                .userService(customOAuth2UserService())
//                )
        return http.build();
    }

//    @Bean
//    public OAuth2UserService<OAuth2UserRequest, OAuth2User> customOAuth2UserService() {
//        return new CustomOAuth2UserService(appUserRepository);
//    }

}