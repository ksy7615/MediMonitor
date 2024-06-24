package com.example.medimonitor.test.domain;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Getter
@Table(name = "users")
@Entity
public class Users {

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
    @Column(name = "reg_date")
    private Timestamp regDate;
    @Column(name = "mod_date")
    private Timestamp modDate;

}
