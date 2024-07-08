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

    public List<MessageResponseDto> findByRecipientOrderByRegDateDesc(String recipient) {
        List<Message> list = messageRepository.findByRecipientOrderByRegDateDesc(recipient);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public List<MessageResponseDto> findBySenderOrderByRegDateDesc(String sender) {
        List<Message> list = messageRepository.findBySenderOrderByRegDateDesc(sender);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public List<MessageResponseDto> findBySenderLimit(String sender) {
        List<Message> list = messageRepository.findBySenderLimit(sender);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public List<MessageResponseDto> findByRecipientLimit(String recipient) {
        List<Message> list = messageRepository.findByRecipientLimit(recipient);
        List<MessageResponseDto> messageList = new ArrayList<>();

        for(Message message : list) {
            MessageResponseDto messageDto = new MessageResponseDto(message);
            messageList.add(messageDto);
        }

        return messageList;
    }

    public MessageResponseDto findMessageByCode(int code) {
        Message message = messageRepository.findById(code).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 쪽지입니다.")
        );

        MessageResponseDto messageDto = new MessageResponseDto(message);
        return messageDto;
    }

    public boolean updateStatus(int code) {
        int updatedCount = messageRepository.updateStatus(code);
        return updatedCount > 0; // 업데이트된 행의 수가 0보다 큰 경우 true 반환
    }
}
