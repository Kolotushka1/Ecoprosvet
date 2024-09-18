package com.ecoton.main.service;

import com.ecoton.main.entity.AppUser;
import com.ecoton.main.repository.AppUserRepositoy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AppUserRepositoy appUserRepositoy;

    public CustomUserDetailsService(AppUserRepositoy appUserRepositoy) {
        this.appUserRepositoy = appUserRepositoy;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepositoy.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        boolean isActive = appUser.getActive() != null ? appUser.getActive() : false;

        return new User(
                appUser.getEmail(),
                appUser.getPassword(),
                isActive,
                true,
                true,
                true,
                new ArrayList<>()
        );
    }

}
