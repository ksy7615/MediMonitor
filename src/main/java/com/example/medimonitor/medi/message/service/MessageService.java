package com.example.medimonitor.medi.message.service;

import com.example.medimonitor.medi.message.domain.Message;
import com.example.medimonitor.medi.message.domain.MessageRepository;
import com.example.medimonitor.medi.message.dto.MessageRequestDto;
import com.example.medimonitor.medi.message.dto.MessageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageResponseDto save(MessageRequestDto messageDto) {
        Message message = new Message(messageDto);
        MessageResponseDto messageResponseDto = new MessageResponseDto(messageRepository.save(message));
        return messageResponseDto;
    }
}
