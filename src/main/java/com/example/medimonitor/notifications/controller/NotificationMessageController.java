package com.example.medimonitor.notifications.controller;

import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.notifications.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class NotificationMessageController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationMessageController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send-message")
    public void sendMessage(@RequestParam String userId, @RequestBody String message, HttpSession session) {
        // 로그인 상태 확인
        UserResponseDto sessionUser = (UserResponseDto) session.getAttribute("user");
        if (sessionUser == null) {
            throw new IllegalStateException("User not logged in or session mismatch");
        }
        notificationService.notifyUser(userId, message);
    }
}
