package com.example.medimonitor.notifications.service;

import com.example.medimonitor.medi.user.domain.User;
import com.example.medimonitor.medi.user.domain.UserRepository;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.notifications.domain.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class NotificationService {


    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private static final Long DEFAULT_TIMEOUT = 600L * 1000 * 60;

    public SseEmitter sendNotification(String username) {
        SseEmitter emitter = createEmitter(username);

        sendToClient(username, "EventStream Created. [username=" + username + "]", "sse 접속 성공");
        return emitter;
    }

    public <T> void customNotify(String username, T data, String comment, String type) {
        sendToClient(username, data, comment, type);
    }

    public void notify(String username, Object data, String comment) {
        sendToClient(username, data, comment);
    }

    private void sendToClient(String username, Object data, String comment) {
        SseEmitter emitter = notificationRepository.get(username);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(username))
                        .name("sse")
                        .data(data)
                        .comment(comment));
            } catch (IOException e) {
                notificationRepository.deleteById(username);
                emitter.completeWithError(e);
            }
        }
    }


    private <T> void sendToClient(String username, T data, String comment, String type) {
        SseEmitter emitter = notificationRepository.get(username);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(username))
                        .name(type)
                        .data(data)
                        .comment(comment));
                System.out.println("SSE message sent to " + username + ": " + data); // 로그 추가
            } catch (IOException e) {
                notificationRepository.deleteById(username);
                emitter.completeWithError(e);
                System.err.println("Failed to send event to " + username + ": " + e.getMessage());
            }
        } else {
            System.err.println("No SSE emitter found for " + username); // 로그 추가
        }
    }

    private SseEmitter createEmitter(String username) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        notificationRepository.save(username, emitter);

        emitter.onCompletion(() -> notificationRepository.deleteById(username));
        emitter.onTimeout(() -> notificationRepository.deleteById(username));

        return emitter;
    }

    private UserResponseDto validUser(String username) {
        String userId = String.valueOf(username);
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        UserResponseDto userDto = new UserResponseDto(user);
        return userDto;
    }

}
