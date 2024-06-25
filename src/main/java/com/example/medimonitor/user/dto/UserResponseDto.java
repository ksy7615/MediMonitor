package com.example.medimonitor.user.dto;

import com.example.medimonitor.user.domain.User;
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
    private String userGroup;
    private String telecom;
    private String phone;
    private int birth;
    private String department;
    private String address;
    private String position;
    private boolean authority;
    private Timestamp regDate;
    private Timestamp modDate;

    public UserResponseDto(User user) {
        this.username = user.getUsername();
        this.name = user.getName();
        this.userGroup = user.getUserGroup();
        this.telecom = user.getTelecom();
        this.phone = user.getPhone();
        this.birth = user.getBirth();
        this.department = user.getDepartment();
        this.address = user.getAddress();
        this.position = user.getPosition();
        this.authority = user.isAuthority();
        this.regDate = user.getRegDate();
        this.modDate = user.getModDate();
    }
}
