package com.example.medimonitor.medi.user.domain;

import com.example.medimonitor.medi.user.dto.UserRequestDto;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public List<UserResponseDto> findByAuthorityFalse() {
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

    public UserResponseDto findByUsernameAndPassword(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        if(user == null) {
            return null;
        }
        UserResponseDto userDto = new UserResponseDto(user);
        return userDto;
    }

    public UserResponseDto findUserByUsername(String username) {
        User user = userRepository.findById(username).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다.")
        );

        UserResponseDto userDto = new UserResponseDto(user);
        return userDto;
    }

    public UserResponseDto findUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone);

        if(user == null)
            return null;
        UserResponseDto userDto = new UserResponseDto(user);
        return userDto;
    }

    @Transactional
    public UserResponseDto update(String username) {
        User user = userRepository.findById(username).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다.")
        );
        user.update();
        UserResponseDto userResponseDto = new UserResponseDto(user);

        return userResponseDto;
    }

    @Transactional
    public UserResponseDto update(UserRequestDto userDto) {
        User user = userRepository.findById(userDto.getUsername()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다.")
        );
        user.update(userDto);
        UserResponseDto userResponseDto = new UserResponseDto(user);

        return userResponseDto;
    }

    public boolean delete(String username) {
        boolean result = false;

        try {
            userRepository.deleteById(username);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    public List<UserResponseDto> findUsernameByName(String name) {
        List<User> list = userRepository.findByName(name);
        List<UserResponseDto> result = new ArrayList<>();

        for(User user : list) {
            UserResponseDto userDto = new UserResponseDto(user);
            result.add(userDto);
        }

        return result;
    }
}
