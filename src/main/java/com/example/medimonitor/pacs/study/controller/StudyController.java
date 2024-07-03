package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.dto.StudyRequestDto;
import com.example.medimonitor.pacs.study.dto.InfoResponseDto;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Controller
public class StudyController {

    private final StudyService studyService;

    @CrossOrigin
    @GetMapping("/mainAllSearch")
    @ResponseBody
    public Page<InfoResponseDto> getAllStudies(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue = "5") int size) {
        return studyService.findStudiesWithPagination(page, size, "all", "");
    }

    @GetMapping("/allInfo/{studykey}")
    @ResponseBody
    public List<Study> getAllStudies(@PathVariable long studykey){
        return studyService.findAllStudiesByKey(studykey);
    }

    @GetMapping("/mainPrevious/{pId}")
    @ResponseBody
    public List<InfoResponseDto> getStudiesByPid(@PathVariable String pId) {
        return studyService.getStudiesByPid(pId);
    }

    @CrossOrigin
    @PostMapping("/main/search")
    @ResponseBody
    public Page<InfoResponseDto> searchStudies(@RequestBody Map<String, String> params,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "5") int size) {

        String pid = params.get("pid");
        String pname = params.get("pname");
        Long reportstatus = params.get("reportstatus") != null ? Long.valueOf(params.get("reportstatus")) : null;
        String modality = params.get("modality");
        String startDate = params.get("startDate");
        String endDate = params.get("endDate");

        Pageable pageable = PageRequest.of(page, size);

        return studyService.searchStudies(pid, pname, reportstatus, modality, startDate, endDate, pageable);
    }
}