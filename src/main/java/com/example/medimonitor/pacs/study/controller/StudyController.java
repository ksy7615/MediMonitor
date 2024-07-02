package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.dto.StudyRequestDto;
import com.example.medimonitor.pacs.study.dto.InfoResponseDto;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/mainPrevious/{pId}")
    @ResponseBody
    public List<InfoResponseDto> getStudiesByPid(@PathVariable String pId) {
        return studyService.getStudiesByPid(pId);
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main";
    }

    @CrossOrigin
    @PostMapping("/main/search")
    @ResponseBody
    public Page<InfoResponseDto> findStudies(
            @RequestBody StudyRequestDto studyRequestDto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        String pid = studyRequestDto.getPid();
        String pname = studyRequestDto.getPname();
        Long reportstatus = studyRequestDto.getReportstatus();
        String modality = studyRequestDto.getModality();
        String startDate = studyRequestDto.getStartDate();
        String endDate = studyRequestDto.getEndDate();

        if (pid != null && !pid.isEmpty()) {
            return studyService.findStudiesWithPagination(page, size, "pid", pid);
        } else if (pname != null && !pname.isEmpty()) {
            return studyService.findStudiesWithPagination(page, size, "pname", pname);
        } else if (reportstatus != null) {
            return studyService.findStudiesWithPagination(page, size, "reportstatus", reportstatus.toString());
        } else if (modality != null && !modality.isEmpty()) {
            return studyService.findStudiesWithPagination(page, size, "modality", modality);
        } else if (startDate != null && endDate != null) {
            return studyService.findStudiesWithPagination(page, size, "studydate", startDate + "," + endDate);
        } else {
            return studyService.findStudiesWithPagination(page, size, "all", "");
        }
    }
}