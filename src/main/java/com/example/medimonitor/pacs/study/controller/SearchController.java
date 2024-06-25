package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Controller
public class SearchController {

    private final StudyService studyService;

    @CrossOrigin
    @GetMapping("/mainData")
    @ResponseBody
    public Page<Study> getAllStudies(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue = "5") int size ) {
        return studyService.findStudiesWithPagination(page, size);
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main/main";
    }

}
