package com.example.medimonitor.util.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class HomeController {
    @GetMapping("/")
    public String home() { return "user/login"; }

    @GetMapping("/header")
    public String join() {
        return "module/header";
    }

    @GetMapping("/footer")
    public String footer() {
        return "module/footer";
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main";
    }
}
