package com.example.medimonitor.user.controller;

import com.example.medimonitor.user.domain.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;
}
