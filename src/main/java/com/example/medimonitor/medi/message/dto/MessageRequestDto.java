package com.example.medimonitor.medi.message.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@NoArgsConstructor
@Getter
@Setter
public class MessageRequestDto {

    private int code;
    private String title;
    private String content;
    private String recipient;
    private String sender;
    private boolean status;
    private Timestamp regDate;
    private Timestamp modDate;

    public String getFormattedRegDate() {
        if (this.regDate == null) {
            return null;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return sdf.format(this.regDate);
    }
}
