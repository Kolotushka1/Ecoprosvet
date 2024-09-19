package com.ecoton.main.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterOrganizationDto {
    @NotBlank(message = "Почта обязательная")
    @Email(message = "Почта должна быть валидной")
    private String email;
    @NotBlank()
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
    @NotBlank()
    private String organizationName; // обязательно
    @NotBlank()
    private String addressRegistration; // обязательно
    @NotBlank(message = "Должен быть 12 цифр")
    @Size(min = 11, max = 13)
    private String inn; // обязательно
    @NotBlank()
    private String name; // обязательно
    @NotBlank()
    private String surname; // обязательно
}
