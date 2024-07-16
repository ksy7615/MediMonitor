package com.example.medimonitor.medi.user.controller;

import com.example.medimonitor.medi.user.dto.UserRequestDto;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.medi.user.domain.UserService;
import com.example.medimonitor.notifications.service.NotificationService;
import com.example.medimonitor.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;
    private final NotificationService notificationService;

    @GetMapping("/join")
    public String join() {
        return "user/join";
    }

    @ResponseBody
    @PostMapping("/join")
    public ResponseEntity<Response> addUser(@RequestBody UserRequestDto userDto) {
        UserResponseDto user = null;
        Response response =  new Response();

        String message = "회원가입이 완료되었습니다.";

        user = userService.save(userDto);

        if(user != null) {
            response.setStatus(200);
            response.setMessage(message);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setStatus(400);
            response.setMessage("회원가입에 실패했습니다.");

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/agree")
    public String agree(@RequestParam Map<String, String> params, Model model) {
        model.addAllAttributes(params);
        return "user/agree";
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

    @PostMapping("/check/phone")
    @ResponseBody
    public ResponseEntity<Response> findUserByPhone(@RequestParam String phone) {
        Response response =  new Response();
        UserResponseDto user = null;

        user = userService.findUserByPhone(phone);
        if(user != null) {
            response.setStatus(200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setStatus(400);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
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

        List<UserResponseDto> userList = userService.findByAuthorityFalse();
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

        String message = "로그인 성공";

        String username = userRequestDto.getUsername();
        String password = userRequestDto.getPassword();

        user = userService.findByUsernameAndPassword(username, password);

        if(user != null) {
            if(!user.isAuthority()){
                response.setStatus(400);
                response.setMessage("승인 요청 처리중입니다.");

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.setStatus(200);
            response.setMessage(message);

            session.setAttribute("user", user);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setStatus(404);
            response.setMessage("로그인에 실패하였습니다.");

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("user");

        return "redirect:/";
    }

    @ResponseBody
    @PutMapping("/user/approval")
    public ResponseEntity<Response> approval(@RequestBody List<String> usernames) {
        Response response =  new Response();
        String message = "승인이 완료되었습니다.";

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
        String message = "삭제/거절이 완료되었습니다.";

        try {
            for(String username : usernames){
                userService.delete(username);
            }
            response.setStatus(200);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            message = "삭제/거절에 실패하였습니다.";

            response.setStatus(400);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/mypage")
    public ModelAndView mypage(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        ModelAndView mv = new ModelAndView("user/mypage");

        if(user != null) {
            UserResponseDto result = userService.findUserByUsername(user.getUsername());
            mv.addObject("user", result);
        }

        return mv;
    }

    @GetMapping("/check")
    public String userCheck() { return "user/checkPassword"; }

    @PostMapping("/check/password")
    @ResponseBody
    public ResponseEntity<Response> findUserByPassword(@RequestBody UserRequestDto userDto, HttpSession session) {
        UserResponseDto sessionUser = (UserResponseDto) session.getAttribute("user");
        Response response =  new Response();
        UserResponseDto user = null;

        user = userService.findByUsernameAndPassword(sessionUser.getUsername(), userDto.getPassword());
        if(user != null) {
            response.setStatus(200);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            String message = "비밀번호가 올바르지 않습니다.";
            response.setStatus(400);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/update")
    public ModelAndView userUpdate(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        ModelAndView mv = new ModelAndView("user/update");

        if(user != null) {
            UserResponseDto result = userService.findUserByUsername(user.getUsername());
            mv.addObject("user", result);
        }

        return mv;
    }

    @ResponseBody
    @PutMapping("/update")
    public ResponseEntity<Response> userUpdate(@RequestBody UserRequestDto userDto, HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        userDto.setUsername(user.getUsername());

        Response response =  new Response();
        String message = "수정이 완료되었습니다.";

        try {
            userService.update(userDto);

            response.setStatus(200);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            message = "수정에 실패하였습니다.";

            response.setStatus(400);
            response.setMessage(message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @GetMapping("/delete")
    public String userDelete() { return "user/delete"; }

    @ResponseBody
    @DeleteMapping("/delete")
    public ResponseEntity<Response> deleteUser(@RequestBody UserRequestDto userDto, HttpSession session) {
        UserResponseDto sessionUser = (UserResponseDto) session.getAttribute("user");
        UserResponseDto user = userService.findByUsernameAndPassword(sessionUser.getUsername(), userDto.getPassword());

        Response response =  new Response();
        String message = "";
        boolean isDelete;
        if(user != null) {
            isDelete = userService.delete(user.getUsername());

            if(isDelete) {
                session.removeAttribute("user");
                message = "탈퇴되었습니다.";
                response.setStatus(200);
                response.setMessage(message);

                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                message = "탈퇴에 실패하였습니다.";
                response.setStatus(400);
                response.setMessage(message);

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }else {
            message = "비밀번호가 올바르지 않습니다.";
            response.setStatus(404);
            response.setMessage(message);

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/find/username")
    @ResponseBody
    public List<UserResponseDto> findUserByName(@RequestParam String name) {
        List<UserResponseDto> list = new ArrayList<UserResponseDto>();

        list = userService.findUsernameByName(name);

        return list;
    }

}
