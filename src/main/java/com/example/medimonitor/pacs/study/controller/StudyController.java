package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.medi.report.domain.Report;
import com.example.medimonitor.medi.report.domain.ReportRepository;
import com.example.medimonitor.medi.report.dto.ReportResponseDto;
import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import com.example.medimonitor.pacs.study.dto.StudyRequestDto;
import com.example.medimonitor.pacs.study.dto.InfoResponseDto;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Controller
public class StudyController {

    private final StudyService studyService;
    private final StudyRepository studyRepository;
    private static final Logger logger = LoggerFactory.getLogger(StudyService.class);
    private final ReportRepository reportRepository;

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

    @CrossOrigin
    @PostMapping("/main/search")
    @ResponseBody
    public Page<InfoResponseDto> searchStudies(@RequestBody StudyRequestDto studyRequestDto,
                                               @RequestParam("page") int page,
                                               @RequestParam("size") int size) {
        return studyService.searchStudies(
                studyRequestDto.getPid(),
                studyRequestDto.getPname(),
                studyRequestDto.getReportstatus(),
                studyRequestDto.getModality(),
                studyRequestDto.getStartDate(),
                studyRequestDto.getEndDate(),
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "studydate"))
        );
    }

}