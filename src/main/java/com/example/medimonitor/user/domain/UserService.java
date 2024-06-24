package com.example.medimonitor.user.domain;

import com.example.medimonitor.user.dto.UserRequestDto;
import com.example.medimonitor.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserResponseDto save(UserRequestDto userDto) {
        User user = new User(userDto);
        UserResponseDto userResponseDto = new UserResponseDto(userRepository.save(user));
        return userResponseDto;
    }
}
