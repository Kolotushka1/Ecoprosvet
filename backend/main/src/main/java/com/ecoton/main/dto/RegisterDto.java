package com.ecoton.main.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterDto {
    @NotBlank(message = "Почта обязательная")
    @Email(message = "Почта должна быть правильной")
    private String email;
    private String phone;
    @NotBlank(message = "Необходим пароль")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{6,32}$",
            message = "Пароль должен содержать как минимум 1 большую букву и 1 специальный символ, " +
                    "а также не меньше 6 и не больше 32 букв."
    )
    private String password; // обязательно
    @NotBlank(message = "Подтверждение пароля должно быть заполнено")
    private String passwordSecond; // обязательно
    private String name;
    private String surname;
}
