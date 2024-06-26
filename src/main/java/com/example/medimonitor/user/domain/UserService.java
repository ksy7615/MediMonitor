package com.example.medimonitor.user.domain;

import com.example.medimonitor.user.dto.UserRequestDto;
import com.example.medimonitor.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserResponseDto save(UserRequestDto userDto) {
        User user = new User(userDto);
        UserResponseDto userResponseDto = new UserResponseDto(userRepository.save(user));
        return userResponseDto;
    }

    public List<UserResponseDto> findByAuthority() {
        List<User> list = userRepository.findByAuthorityFalse();
        List<UserResponseDto> result = new ArrayList<>();

        for(User user : list) {
            UserResponseDto userDto = new UserResponseDto(user);
            result.add(userDto);
        }

        return result;
    }


    public List<UserResponseDto> findByAuthorityTrue() {
        List<User> list = userRepository.findByAuthorityTrue();
        List<UserResponseDto> result = new ArrayList<>();

        for(User user : list) {
            UserResponseDto userDto = new UserResponseDto(user);
            result.add(userDto);
        }

        return result;
    }
}
