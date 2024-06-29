package com.example.medimonitor.pacs.series.controller;

import com.example.medimonitor.medi.log.domain.Log;
import com.example.medimonitor.medi.log.domain.LogService;
import com.example.medimonitor.medi.log.dto.LogRequestDto;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.pacs.series.domain.Series;
import com.example.medimonitor.pacs.series.service.SeriesService;
import com.example.medimonitor.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class SeriesController {

    private final SeriesService seriesService;
    private final LogService logService;

    @GetMapping("/detail/{studykey}")
    @ResponseBody
    public List<Series> findAllSeriesByStudykey(@PathVariable("studykey") long studykey) {
        return seriesService.findAllByStudyKey(studykey);
    }

    @PostMapping("/detail/{studykey}")
    @ResponseBody
    public ResponseEntity<Response> saveLog(@PathVariable("studykey") long studykey, HttpSession session) {
        UserResponseDto userResponseDto = (UserResponseDto) session.getAttribute("user");
        String username = userResponseDto != null ? userResponseDto.getUsername() : null;

        System.out.println("username : " + username);
        System.out.println("study key : " + studykey);

        LogRequestDto logRequestDto = new LogRequestDto();
        logRequestDto.setStudykey(studykey);
        logRequestDto.setUsername(username);

        Log log = null;
        Response response = new Response();

        String message = "조회에 성공하였습니다.";

        log = logService.save(logRequestDto);

        System.out.println("log : " + log);

        if (log != null) {
            response.setStatus(200);
            response.setMessage(message);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setStatus(400);
            response.setMessage("조회 실패");

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
