package com.example.medimonitor.notifications.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Alert {
    private long code;
    private String username;
    private String data;
    private String comment;
    private String type;
    private boolean isRead;

    private static long codeCounter = 0L;

    public Alert(String username, String data, String comment, String type) {
        this.code = ++codeCounter;
        this.username = username;
        this.data = data;
        this.comment = comment;
        this.type = type;
        this.isRead = false;
    }
}


