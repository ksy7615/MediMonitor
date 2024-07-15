package com.example.medimonitor.medi.user.domain;

import com.example.medimonitor.medi.user.dto.UserRequestDto;
import com.example.medimonitor.util.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Getter
@Table(name = "users")
@Entity
public class User extends Timestamped {

    @Id
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
    private boolean authority;

    public User(UserRequestDto userDto) {
        this.username = userDto.getUsername();
        this.password = userDto.getPassword();
        this.name = userDto.getName();
        this.userGroup = userDto.getUserGroup();
        this.telecom = userDto.getTelecom();
        this.phone = userDto.getPhone();
        this.birth = userDto.getBirth();
        this.department = userDto.getDepartment();
        this.address = userDto.getAddress();
        this.position = userDto.getPosition();
    }

    public void update() {
        this.authority = true;
    }

    public void update(UserRequestDto userDto) {
        if(userDto.getNewPassword() != null)
            this.password = userDto.getNewPassword();
        this.userGroup = userDto.getUserGroup();
        this.telecom = userDto.getTelecom();
        this.phone = userDto.getPhone();
        this.department = userDto.getDepartment();
        this.address = userDto.getAddress();
        this.position = userDto.getPosition();
    }

}
