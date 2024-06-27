package com.example.medimonitor.medi.report.controller;

import com.example.medimonitor.medi.report.domain.Report;
import com.example.medimonitor.medi.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ReportController {

    @Autowired
    private final ReportService reportService;

    @GetMapping("/mainReport/{studykey}")
    @ResponseBody
    public List<Report> getReports(@PathVariable int studykey) {
        return reportService.getReportsByStudyKey(studykey);
    }

}
