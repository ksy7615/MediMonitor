package com.example.medimonitor.notifications.controller;

import com.example.medimonitor.notifications.event.NotificationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
//@RequestMapping("/notifications")
public class NotificationController {

    private final Map<String, SseEmitter> clients = new ConcurrentHashMap<>();

    @GetMapping("/notifications/{userId}/events")
    public SseEmitter getNotifications(@PathVariable String userId) {
        SseEmitter emitter = new SseEmitter();
        clients.put(userId, emitter);

        emitter.onCompletion(() -> clients.remove(userId));
        emitter.onTimeout(() -> clients.remove(userId));

        return emitter;
    }

    @EventListener
    public void handleNotificationEvent(NotificationEvent event) {
        SseEmitter emitter = clients.get(event.getUserId());
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(event.getMessage() + " (새 알림: " + event.getCount() + ")"));
            } catch (IOException e) {
                clients.remove(event.getUserId());
            }
        }
    }


//    @PostMapping("/send-message")
//    public void sendMessage(@RequestParam String userId, @RequestParam String message) {
//        sendNotification(userId, message);
//    }

    public void sendNotification(String userId, String message) {
        SseEmitter emitter = clients.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("message")
                        .data(message, MediaType.TEXT_PLAIN));
            } catch (IOException e) {
                clients.remove(userId);
            }
        }
    }
}
