package com.example.medimonitor.medi.message.controller;

import com.example.medimonitor.medi.message.domain.Message;
import com.example.medimonitor.medi.message.dto.MessageRequestDto;
import com.example.medimonitor.medi.message.dto.MessageResponseDto;
import com.example.medimonitor.medi.message.service.MessageService;
import com.example.medimonitor.medi.user.domain.User;
import com.example.medimonitor.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

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

    @DeleteMapping("/message/delete/send")
    @ResponseBody
    public ResponseEntity<Response> deleteSender(@RequestBody MessageRequestDto messageDto, HttpSession session) {
        Response response = new Response();
        User user = (User) session.getAttribute("user");

        if(messageDto.getSender().equals(user.getUsername())){
            boolean isDelete = messageService.delete(messageDto.getCode());
            
            if(isDelete) {
                response.setStatus(200);
                response.setMessage("삭제되었습니다.");

                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                response.setStatus(400);
                response.setMessage("삭제에 실패하였습니다.");

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }else {
            response.setStatus(404);
            response.setMessage("회원 정보가 일치하지 않습니다.");

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/message/delete/recipient")
    @ResponseBody
    public ResponseEntity<Response> deleteRecipient(@RequestBody MessageRequestDto messageDto, HttpSession session) {
        Response response = new Response();
        User user = (User) session.getAttribute("user");

        if(messageDto.getRecipient().equals(user.getUsername())){
            boolean isDelete = messageService.delete(messageDto.getCode());

            if(isDelete) {
                response.setStatus(200);
                response.setMessage("삭제되었습니다.");

                return new ResponseEntity<>(response, HttpStatus.OK);
            }else {
                response.setStatus(400);
                response.setMessage("삭제에 실패하였습니다.");

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }else {
            response.setStatus(404);
            response.setMessage("회원 정보가 일치하지 않습니다.");

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/miniInbox")
    @ResponseBody
    public List<MessageResponseDto> findMiniInboxByRecipient(HttpSession session) {
        User user = (User) session.getAttribute("user");
        String recipient = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findByRecipientOrderByRegDateAsc(recipient);

        return messageList;
    }

    @GetMapping("/find/miniSent")
    @ResponseBody
    public List<MessageResponseDto> findMiniSentBySender(HttpSession session) {
        User user = (User) session.getAttribute("user");
        String sender = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findBySenderOrderByRegDateAsc(sender);

        return messageList;
    }

    @GetMapping("/find/inbox")
    @ResponseBody
    public List<MessageResponseDto> findInboxByRecipient(HttpSession session) {
        User user = (User) session.getAttribute("user");
        String recipient = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findByRecipient(recipient);

        return messageList;
    }

    @GetMapping("/find/sent")
    @ResponseBody
    public List<MessageResponseDto> findSentBySender(HttpSession session) {
        User user = (User) session.getAttribute("user");
        String sender = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findBySender(sender);

        return messageList;
    }

}
