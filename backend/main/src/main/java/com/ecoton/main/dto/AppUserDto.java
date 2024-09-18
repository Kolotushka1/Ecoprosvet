package com.ecoton.main.dto;

import com.ecoton.main.entity.District;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter@Setter
public class AppUserDto {
    private Long id;
    private String fio;
    private String phoneNumber;
    private Boolean gender;
    private String email;
    private Boolean emailConfirm;
    private Boolean active;
    private District district;
    private Date birthDate;
}
