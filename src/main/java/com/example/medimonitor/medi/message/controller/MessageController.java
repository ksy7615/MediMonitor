package com.example.medimonitor.medi.message.controller;

import com.example.medimonitor.medi.message.dto.MessageRequestDto;
import com.example.medimonitor.medi.message.dto.MessageResponseDto;
import com.example.medimonitor.medi.message.service.MessageService;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class MessageController {

    private final MessageService messageService;

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

    @DeleteMapping("/message/delete")
    @ResponseBody
    public ResponseEntity<Response> deleteMessage(@RequestBody MessageRequestDto messageDto) {
        Response response = new Response();
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
    }

    @DeleteMapping("/message/delete/checked")
    @ResponseBody
    public ResponseEntity<Response> deleteMessages(@RequestBody List<Integer> messages) {
        Response response = new Response();

        for(int code : messages) {
            boolean isDelete = messageService.delete(code);

            if(!isDelete) {
                response.setStatus(400);
                response.setMessage("삭제에 실패하였습니다.");

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }

        response.setStatus(200);
        response.setMessage("삭제되었습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/message/delete/send")
    @ResponseBody
    public ResponseEntity<Response> deleteSender(@RequestBody MessageRequestDto messageDto, HttpSession session) {
        Response response = new Response();
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");

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
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");

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
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        String recipient = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findFirst30ByRecipientOrderByRegDateDesc(recipient);

        return messageList;
    }

    @GetMapping("/find/miniSent")
    @ResponseBody
    public List<MessageResponseDto> findMiniSentBySender(HttpSession session) {
        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        String sender = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findFirst30BySenderOrderByRegDateDesc(sender);

        return messageList;
    }

    @GetMapping("/inbox")
    @ResponseBody
    public ModelAndView findInboxByRecipient(HttpSession session) {
        if(session.getAttribute("user") == null) {
            ModelAndView mv = new ModelAndView("redirect:/");
            return mv;
        }

        ModelAndView mv = new ModelAndView("message/inbox");

        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        String recipient = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findByRecipientOrderByRegDateDesc(recipient);
        int unReadCnt = messageService.countUnreadMessageByRecipient(recipient);
        int messageCnt = messageService.countByRecipient(recipient);
        mv.addObject("messageList", messageList);
        mv.addObject("unReadCnt", unReadCnt);
        mv.addObject("messageCnt", messageCnt);

        return mv;
    }

    @GetMapping("/sent")
    @ResponseBody
    public ModelAndView findSentBySender(HttpSession session) {
        if(session.getAttribute("user") == null) {
            ModelAndView mv = new ModelAndView("redirect:/");
            return mv;
        }

        ModelAndView mv = new ModelAndView("message/sent");

        UserResponseDto user = (UserResponseDto) session.getAttribute("user");
        String sender = user.getUsername();
        List<MessageResponseDto> messageList = new ArrayList<>();

        messageList = messageService.findBySenderOrderByRegDateDesc(sender);
        int unReadCnt = messageService.countUnreadMessageBySender(sender);
        int messageCnt = messageService.countBySender(sender);
        mv.addObject("messageList", messageList);
        mv.addObject("unReadCnt", unReadCnt);
        mv.addObject("messageCnt", messageCnt);

        return mv;
    }

    @GetMapping("/message/{code}")
    @ResponseBody
    public MessageResponseDto messageDetail(@PathVariable int code, HttpSession session, HttpServletRequest request) {
        if(session.getAttribute("user") == null) {
            return null;
        }

        MessageResponseDto message = messageService.findMessageByCode(code);
        if(message != null) {
            if(!message.isStatus()) {
                messageService.updateStatus(message.getCode());
            }
        }

        return message;
    }

}
