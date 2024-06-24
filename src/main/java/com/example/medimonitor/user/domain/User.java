package com.example.medimonitor.user.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@NoArgsConstructor
@Getter
@Table(name = "users")
@Entity
public class User {

    @Id
    private String username;
    private String password;
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
