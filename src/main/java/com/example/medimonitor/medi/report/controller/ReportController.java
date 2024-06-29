package com.example.medimonitor.medi.report.controller;

import com.example.medimonitor.medi.report.domain.Report;
import com.example.medimonitor.medi.report.dto.ReportRequestDto;
import com.example.medimonitor.medi.report.dto.ReportResponseDto;
import com.example.medimonitor.medi.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/mainReport/{studykey}")
    @ResponseBody
    public List<Report> getReports(@PathVariable int studykey) {
        return reportService.getReportsByStudyKey(studykey);
    }

    @PostMapping("/savePreReport")
    public ResponseEntity<?> savePreReport(@RequestBody ReportRequestDto report) {
        try {
            ReportResponseDto savedReport = reportService.saveReport(report);
            return ResponseEntity.ok(savedReport);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"저장 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    // *
//    @PostMapping("/saveReport")
//    public ResponseEntity<?> saveReport(@RequestBody ReportRequestDto report) {
//        try {
//            ReportResponseDto saveReport = reportService.saveReport(report);
//            return ResponseEn
//        }
//    }

    @GetMapping("/checkStudyKeyExistence")
    @ResponseBody
    public ResponseEntity<Boolean> checkStudyKeyExistence(@RequestParam long studykey) {
        boolean exists = reportService.checkIfStudyKeyExists(studykey);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/checkUser")
    public ResponseEntity<Boolean> checkUser(@RequestParam String username) {
        boolean equals =  reportService.checkIfPreDoctorExists(username);
        return ResponseEntity.ok(equals);
    }

    @PutMapping("/updateReport")
    public ResponseEntity<?> updateReport(@RequestBody ReportRequestDto reportRequestDto) {
        try {
            reportService.updateReport(reportRequestDto);
            return ResponseEntity.ok().body("{\"message\":\"업데이트 성공\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"업데이트 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }
}
