package com.example.medimonitor.util.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class HomeController {
    @GetMapping("/header")
    public String join() {
        return "module/header";
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main";
    }

    @GetMapping("/detail")
    public String getDetailView() {return "detail";}
}
