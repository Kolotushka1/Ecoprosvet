package com.ecoton.main.dto.oauth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Data
@Getter@Setter
public class YandexUserInfo {
    private String id;
    private String login;
    private String client_id;
    private String display_name;
    private String real_name;
    private String first_name;
    private String last_name;
    private String sex;
    private String default_email;
    private List<String> emails;
    private Date birthday;
    private YandexPhone default_phone;
    private String psuid;
    private String password = null;
}
