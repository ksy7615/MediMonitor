package com.example.medimonitor.medi.message.service;

import com.example.medimonitor.medi.message.domain.Message;
import com.example.medimonitor.medi.message.domain.MessageRepository;
import com.example.medimonitor.medi.message.dto.MessageRequestDto;
import com.example.medimonitor.medi.message.dto.MessageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageResponseDto save(MessageRequestDto messageDto) {
        Message message = new Message(messageDto);
        MessageResponseDto messageResponseDto = new MessageResponseDto(messageRepository.save(message));
        return messageResponseDto;
    }

    public boolean delete(int messageCode) {
        boolean isDelete = false;

        try {
            messageRepository.deleteById(messageCode);
            isDelete = true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return isDelete;
    }

    public List<MessageResponseDto> findByRecipient(String recipient) {
        List<Message> list = messageRepository.findByRecipient(recipient);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public List<MessageResponseDto> findBySender(String sender) {
        List<Message> list = messageRepository.findBySender(sender);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public List<MessageResponseDto> findBySenderOrderByRegDateAsc(String sender) {
        List<Message> list = messageRepository.findBySenderOrderByRegDateAsc(sender);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public List<MessageResponseDto> findByRecipientOrderByRegDateAsc(String recipient) {
        List<Message> list = messageRepository.findByRecipientOrderByRegDateAsc(recipient);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }
}
