package com.example.medimonitor.medi.message.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
