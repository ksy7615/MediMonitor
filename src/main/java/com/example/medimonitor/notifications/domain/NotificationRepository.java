package com.example.medimonitor.notifications.domain;

import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class NotificationRepository {

    private final Map<String, Integer> userNotifications = new ConcurrentHashMap<>();

    public void addNotification(String username) {
        userNotifications.put(username, userNotifications.getOrDefault(username, 0) + 1);
    }

    public int getNotificationCount(String username) {
        return userNotifications.getOrDefault(username, 0);
    }

    public void resetNotificationCount(String username) {
        userNotifications.put(username, 0);
    }
}
