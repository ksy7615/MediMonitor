package com.example.medimonitor.notifications.domain;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.ConcurrentHashMap;

@Repository
public class NotificationRepository {

    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void save(String username, SseEmitter emitter) {
        emitters.put(username, emitter);
    }

    public void deleteById(String username) {
        emitters.remove(username);
    }

    public SseEmitter get(String username) {
        return emitters.get(username);
    }
}
