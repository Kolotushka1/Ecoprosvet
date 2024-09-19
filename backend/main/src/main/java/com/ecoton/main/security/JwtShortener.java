package com.ecoton.main.security;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class JwtShortener {
    public String shortenToken(String token) {
        return Base64.getEncoder().encodeToString(token.getBytes());
    }

    public String restoreToken(String shortenedToken) {
        byte[] decodedBytes = Base64.getDecoder().decode(shortenedToken);
        return new String(decodedBytes);
    }

}
