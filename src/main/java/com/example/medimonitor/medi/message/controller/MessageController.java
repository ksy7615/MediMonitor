package com.example.medimonitor.medi.message.controller;

import com.example.medimonitor.medi.message.dto.MessageRequestDto;
import com.example.medimonitor.medi.message.dto.MessageResponseDto;
import com.example.medimonitor.medi.message.service.MessageService;
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
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/inbox")
    public String inbox() {return "message/inbox";}

    @GetMapping("/write")
    public String write() {return "message/write";}

    @ResponseBody
    @PostMapping("/write")
    public ResponseEntity<Response> write(@RequestBody MessageRequestDto messageDto) {
        Response response = new Response();

        MessageResponseDto message = messageService.save(messageDto);
        if(message != null) {
            response.setMessage("쪽지 전송 완료");
            response.setStatus(200);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
            response.setMessage("쪽지 전송 실패");
            response.setStatus(400);

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
