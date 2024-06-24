package com.example.medimonitor.user.controller;

import com.example.medimonitor.user.domain.UserService;
import com.example.medimonitor.user.dto.UserRequestDto;
import com.example.medimonitor.user.dto.UserResponseDto;
import com.example.medimonitor.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    @GetMapping("/user/join")
    public String join() {
        return "user/join";
    }

    @ResponseBody
    @PostMapping("/user/join")
    public ResponseEntity<Response> addUser(@RequestBody UserRequestDto userDto) {
        UserResponseDto user = null;
        Response response =  new Response();

        String message = "join is success";

        user = userService.save(userDto);
        System.out.println("user : " + user);

        if(user != null) {
            response.setStatus(200);
            response.setMessage(message);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setStatus(400);
            response.setMessage("join is not success");

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

    }
}
