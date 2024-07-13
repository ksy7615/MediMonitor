package com.example.medimonitor.notifications.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
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
}
