package com.example.medimonitor.medi.user.controller;

import com.example.medimonitor.medi.user.dto.UserRequestDto;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.medi.user.domain.UserService;
import com.example.medimonitor.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    @GetMapping("/join")
    public String join() {
        return "user/join";
    }

    @ResponseBody
    @PostMapping("/join")
    public ResponseEntity<Response> addUser(@RequestBody UserRequestDto userDto) {
        UserResponseDto user = null;
        Response response =  new Response();

        String message = "join is success";

        user = userService.save(userDto);

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

    @PostMapping("/check/username")
    @ResponseBody
    public ResponseEntity<Response> findUserByUsername(@RequestParam String username) {
        Response response =  new Response();
        UserResponseDto user = null;

        try {
            user = userService.findUserByUsername(username);
            if(user != null) {
                response.setStatus(200);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        }

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin")
    public ModelAndView adminUserList() {
        ModelAndView mv = new ModelAndView("user/admin/userList");

        List<UserResponseDto> userList = userService.findByAuthorityTrue();
        mv.addObject("users", userList);

        return mv;
    }

    @GetMapping("/admin/authority")
    public ModelAndView adminUserAuthorityList() {
        ModelAndView mv = new ModelAndView("user/admin/authorityList");

        List<UserResponseDto> userList = userService.findByAuthority();
        mv.addObject("users", userList);

        return mv;
    }

    @GetMapping("/login")
    public String userLogin() { return "user/login"; }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<Response> getUser(@RequestBody UserRequestDto userRequestDto, HttpSession session) {
        UserResponseDto user = null;
        Response response =  new Response();

        String message = "login is success";

        String username = userRequestDto.getUsername();
        String password = userRequestDto.getPassword();

        user = userService.findByUsernameAndPassword(username, password);

        if(user != null) {
            if(!user.isAuthority()){
                response.setStatus(400);
                response.setMessage("Processing authority request.");

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.setStatus(200);
            response.setMessage(message);

            session.setAttribute("user", user);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setStatus(404);
            response.setMessage("login is not success");

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("user");

        return "user/login";
    }

    @ResponseBody
    @PutMapping("/user/approval")
    public ResponseEntity<Response> approval(@RequestBody List<String> usernames) {
        Response response =  new Response();
        String message = "승인이 완료되었습니다.";

        System.out.println("usernames : " + usernames);
        System.out.println("length : " + usernames.size());
        try {
            for(String username : usernames){
                userService.update(username);
            }
            response.setStatus(200);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            message = "승인에 실패하였습니다.";

            response.setStatus(400);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @ResponseBody
    @DeleteMapping("/user/reject")
    public ResponseEntity<Response> reject(@RequestBody List<String> usernames) {
        Response response =  new Response();
        String message = "거절이 완료되었습니다.";

        System.out.println("usernames : " + usernames);
        System.out.println("length : " + usernames.size());
        try {
            for(String username : usernames){
                userService.delete(username);
            }
            response.setStatus(200);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            message = "거절에 실패하였습니다.";

            response.setStatus(400);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

}
