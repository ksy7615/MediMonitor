package com.example.medimonitor.notifications.controller;

import com.example.medimonitor.notifications.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
@Controller
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/sendNotification/{username}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter sendNotification(@PathVariable(value = "username") String username) {
        System.out.println("SSE connection established for username: " + username); // 로그 추가
        return notificationService.sendNotification(username);
    }
}
