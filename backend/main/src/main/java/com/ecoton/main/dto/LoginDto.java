package com.ecoton.main.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank(message = "Почта обязательная")
    @Email(message = "Почта должна быть правильной")
    private String email;
    @NotBlank(message = "Необходим пароль")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
}
