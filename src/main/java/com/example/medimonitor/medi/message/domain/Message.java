package com.example.medimonitor.medi.message.domain;

import com.example.medimonitor.medi.message.dto.MessageRequestDto;
import com.example.medimonitor.util.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Getter
@Table(name = "message")
@Entity
public class Message extends Timestamped {
    @Id
    private int code;
    private String title;
    private String content;
    private String recipient;
    private String sender;
    private boolean status;

    public Message(MessageRequestDto messageDto) {
        this.code = messageDto.getCode();
        this.title = messageDto.getTitle();
        this.content = messageDto.getContent();
        this.recipient = messageDto.getRecipient();
        this.sender = messageDto.getSender();
    }

}
