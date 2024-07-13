package com.example.medimonitor.notifications.event;

import org.springframework.context.ApplicationEvent;

public class NotificationEvent extends ApplicationEvent {

    private final String userId;
    private final String message;
    private final int count;

    public NotificationEvent(Object source, String userId, String message, int count) {
        super(source);
        this.userId = userId;
        this.message = message;
        this.count = count;
    }

    public String getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public int getCount() {
        return count;
    }
}
