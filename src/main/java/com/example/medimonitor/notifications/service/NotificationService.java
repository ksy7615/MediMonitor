package com.example.medimonitor.notifications.service;

import com.example.medimonitor.notifications.domain.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.example.medimonitor.notifications.event.NotificationEvent;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, ApplicationEventPublisher eventPublisher) {
        this.notificationRepository = notificationRepository;
        this.eventPublisher = eventPublisher;
    }

    public void notifyUser(String userId, String message) {
        notificationRepository.addNotification(userId);
        int newCount = notificationRepository.getNotificationCount(userId);
        eventPublisher.publishEvent(new NotificationEvent(this, userId, message, newCount));
    }

    public int getNotificationCount(String userId) {
        return notificationRepository.getNotificationCount(userId);
    }

    public void resetNotificationCount(String userId) {
        notificationRepository.resetNotificationCount(userId);
    }
}
