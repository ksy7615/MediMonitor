package com.example.medimonitor.notifications.domain;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class NotificationRepository {

    private final ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, List<Alert>> alerts = new ConcurrentHashMap<>();

    public void save(String username, SseEmitter emitter) {
        emitters.put(username, emitter);
    }

    public void deleteById(String username) {
        emitters.remove(username);
    }

    public SseEmitter get(String username) {
        return emitters.get(username);
    }

    public void saveAlert(String username, Alert alert) {
        alerts.computeIfAbsent(username, k -> new ArrayList<>()).add(alert);
    }

    public List<Alert> findAlertsByUsername(String username) {
        return alerts.getOrDefault(username, new ArrayList<>());
    }

    public void markAlertsAsRead(String username) {
        List<Alert> userAlerts = alerts.get(username);
        if (userAlerts != null) {
            userAlerts.forEach(alert -> alert.setRead(true));
        }
    }

    public void clearAlerts(String username) {
        alerts.remove(username);
    }

}
