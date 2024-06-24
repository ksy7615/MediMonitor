package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class SearchController {

    private final StudyService studyService;

    @ResponseBody
    @GetMapping("/main")
    public ResponseEntity<List<Study>> getAllStudies(){
        List<Study> result = studyService.findAll();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
