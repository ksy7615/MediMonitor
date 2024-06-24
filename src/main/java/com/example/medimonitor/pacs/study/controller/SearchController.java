package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class SearchController {

    private final StudyService studyService;

    @GetMapping("/main")
    public ModelAndView getAllStudies() {
        List<Study> result = studyService.findAll();
        ModelAndView mv = new ModelAndView("main/main"); // "main"은 main 폴더의 main.jsp 파일을 의미합니다.
        mv.addObject("studies", result); // "studies"라는 이름으로 결과 리스트를 추가합니다.

        return mv;
    }



}
