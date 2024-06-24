package com.example.medimonitor.test.controller;

import com.example.medimonitor.test.domain.Users;
import com.example.medimonitor.test.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class UsersController {

    private final UsersService usersService;

    @ResponseBody
    @GetMapping("/test")
    public ResponseEntity<List<Users>> getAllUsers(){
        List<Users> users = usersService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
