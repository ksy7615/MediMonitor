package com.example.medimonitor.util.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class HomeController {
    @GetMapping("/")
    public String home() { return "user/login"; }

    @GetMapping("/header")
    public String join() {
        return "module/header";
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main";
    }

}
