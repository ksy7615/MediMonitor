package com.example.medimonitor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalendarApplication {
    @GetMapping("/calendar")
    public String showCalendar() {
        return "calendar";
    }
}
