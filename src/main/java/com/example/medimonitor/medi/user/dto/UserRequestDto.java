package com.example.medimonitor.medi.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequestDto {
    private String username;
    private String password;
    private String name;
    private String userGroup;
    private String telecom;
    private String phone;
    private int birth;
    private String department;
    private String address;
    private String position;
}
