package com.example.medimonitor.util.controller;

import com.example.medimonitor.medi.user.dto.UserRequestDto;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

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

    @GetMapping("/notifications")
    @ResponseBody
    public ModelAndView notifications(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        ModelAndView mv = new ModelAndView("notifications/notifications");

        if(user != null) {
            String username = user.getUsername();
            mv.addObject("username", username);
        }
        return mv;
    }
}
