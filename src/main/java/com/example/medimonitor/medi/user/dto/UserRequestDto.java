package com.example.medimonitor.medi.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class UserRequestDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private String newPassword;
    private String name;
    private String userGroup;
    private String telecom;
    private String phone;
    private int birth;
    private String department;
    private String address;
    private String position;
}
