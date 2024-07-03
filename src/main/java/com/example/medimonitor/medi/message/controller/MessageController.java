package com.example.medimonitor.medi.message.controller;

import com.example.medimonitor.medi.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/inbox")
    public String inbox() {return "message/inbox";}

    @GetMapping("/write")
    public String write() {return "message/write";}

}
