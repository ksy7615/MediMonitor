package com.example.medimonitor.medi.log.controller;

import com.example.medimonitor.medi.log.domain.Log;
import com.example.medimonitor.medi.log.dto.LogRequestDto;
import com.example.medimonitor.medi.log.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class LogController {

    private final LogService logService;

    @GetMapping("/log")
    public String userLogin() { return "user/log"; }

    @PostMapping("/log")
    @ResponseBody
    public Page<Log> findLogList (@RequestBody LogRequestDto logRequestDto, Pageable pageable) {
        return logService.findAllLogByUsername(logRequestDto.getUsername(), pageable);
    }
}
