package com.example.medimonitor.notifications.controller;

import com.example.medimonitor.notifications.domain.Alert;
import com.example.medimonitor.notifications.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/sendNotification/{username}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseBody
    public SseEmitter sendNotification(@PathVariable(value = "username") String username) {
        System.out.println("SSE connection established for username: " + username); // 로그 추가
        return notificationService.sendNotification(username);
    }

    @GetMapping(value = "/notifications/{username}")
    @ResponseBody
    public List<Alert> getNotifications(@PathVariable(value = "username") String username) {
        return notificationService.getNotifications(username);
    }

    @PostMapping(value = "/notifications/{username}/read")
    @ResponseBody
    public void markNotificationsAsRead(@PathVariable(value = "username") String username) {
        notificationService.markNotificationsAsRead(username);
    }

    @PostMapping(value = "/notifications/{username}/clear")
    @ResponseBody
    public void clearNotifications(@PathVariable(value = "username") String username) {
        notificationService.clearNotifications(username);
    }

    @GetMapping(value = "/notifications/{username}/count")
    @ResponseBody
    public int getNotificationCount(@PathVariable(value = "username") String username) {
        return notificationService.getUnreadNotificationCount(username);
    }
}
