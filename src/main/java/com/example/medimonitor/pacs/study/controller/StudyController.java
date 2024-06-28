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
        return studyService.findStudiesWithPagination(page, size);
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

    @PostMapping("/main/search")
    @ResponseBody
    public List<Study> findStudies(@RequestBody StudyRequestDto studyRequestDto){
        String pid = studyRequestDto.getPid();
        String pname = studyRequestDto.getPname();
        Long reportstatus = studyRequestDto.getReportstatus();
        String modality = studyRequestDto.getModality();
        String startDate = studyRequestDto.getStartDate();
        String endDate = studyRequestDto.getEndDate();

        System.out.println("pid : " + pid);
        System.out.println("pname : " + pname);
        System.out.println("reportstatus : " + reportstatus);
        System.out.println("modality : " + modality);
        System.out.println("startDate : " + startDate);
        System.out.println("endDate : " + endDate);

        List<Study> result = new ArrayList<>();

        if (pid != null && !pid.isEmpty()) {
            result.addAll(studyService.findByPidLike(pid));
        } else if (pname != null && !pname.isEmpty()) {
            result.addAll(studyService.findByPnameLike(pname));
        } else if (reportstatus != null) {
            result.addAll(studyService.findByReportstatus(reportstatus));
        } else if (modality != null && !modality.isEmpty()) {
            result.addAll(studyService.findByModality(modality));
        } else if (startDate != null && endDate != null) {
            result.retainAll(studyService.findByStudydateBetween(startDate, endDate));
        }

        return result;
    }
}
