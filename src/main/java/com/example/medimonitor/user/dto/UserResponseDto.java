package com.example.medimonitor.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private String username;
    private String name;
    private String group;
    private String telecom;
    private String phone;
    private int birth;
    private String department;
    private String address;
    private String position;
    private boolean authority;
    private Timestamp regDate;
    private Timestamp modDate;

}
