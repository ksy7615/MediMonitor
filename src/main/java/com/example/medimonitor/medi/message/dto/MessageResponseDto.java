package com.example.medimonitor.medi.message.dto;

import com.example.medimonitor.medi.message.domain.Message;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@NoArgsConstructor
@Getter
@Setter
public class MessageResponseDto {

    private int code;
    private String title;
    private String content;
    private String recipient;
    private String sender;
    private boolean status;
    private Timestamp regDate;
    private Timestamp modDate;

    public MessageResponseDto(Message message) {
        this.code = message.getCode();
        this.title = message.getTitle();
        this.content = message.getContent();
        this.recipient = message.getRecipient();
        this.sender = message.getSender();
        this.status = message.isStatus();
        this.regDate = message.getRegDate();
        this.modDate = message.getModDate();
    }

    public String getFormattedRegDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return sdf.format(this.regDate);
    }

}
