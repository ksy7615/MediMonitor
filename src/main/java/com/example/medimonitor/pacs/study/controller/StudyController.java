package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class StudyController {

    private final StudyService studyService;

    @CrossOrigin
    @GetMapping("/mainAllSearch")
    @ResponseBody
    public Page<Study> getAllStudies(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue = "5") int size ) {
        return studyService.findStudiesWithPagination(page, size);
    }

    @GetMapping("/mainPrevious/{pId}")
    @ResponseBody
    public List<Study> getStudiesByPid(@PathVariable String pId) {
        return studyService.getStudiesByPid(pId);
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main";
    }

}
