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

    @PostMapping("/saveReport")
    public ResponseEntity<?> savePreReport(@RequestBody ReportRequestDto report) {
        try {
            ReportResponseDto savedReport = reportService.saveReport(report);
            return ResponseEntity.ok(savedReport);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"저장 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/saveFirstReport")
    public ResponseEntity<?> saveFirstReport(@RequestBody ReportRequestDto report) {
        try {
            ReportResponseDto savedReport = reportService.saveReport(report);
            return ResponseEntity.ok(savedReport);
        }catch (Exception e){
            return ResponseEntity.status(500).body("{\"error\":\"저장 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/checkStudyKeyExistence")
    @ResponseBody
    public ResponseEntity<Boolean> checkStudyKeyExistence(@RequestParam long studykey) {
        boolean exists = reportService.checkIfStudyKeyExists(studykey);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/checkPreDoctor")
    public ResponseEntity<Boolean> checkPreDoctor(@RequestParam Long studykey, @RequestParam String username) {
        boolean matches = reportService.checkIfPreDoctorMatches(studykey, username);
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/checkSecondDoctorValue")
    public ResponseEntity<Boolean> checkSecondDoctorValue(@RequestParam Long studykey) {
        boolean isEmpty = reportService.isSecondDoctorValueEmpty(studykey);
        return ResponseEntity.ok(isEmpty);
    }

    @GetMapping("/checkFirstDoctorValue")
    public ResponseEntity<Boolean> checkFirstDoctorValue(@RequestParam Long studykey) {
        boolean isEmpty = reportService.isFirstDoctorValueEmpty(studykey);
        return ResponseEntity.ok(isEmpty);
    }

    @GetMapping("/checkFirstDoctor")
    public ResponseEntity<String> checkFirstDoctor(@RequestParam Long studykey) {
        String value = reportService.getFirstDoctorByStudykey(studykey);
        return ResponseEntity.ok(value);
    }

    @GetMapping("/checkSecondDoctor")
    public ResponseEntity<String> checkSecondDoctor(@RequestParam Long studykey) {
        String value = reportService.getSecondDoctorByStudykey(studykey);
        return ResponseEntity.ok(value);
    }

//    @GetMapping("/checkFirstDoctor")
//    public ResponseEntity<Boolean> checkFirstDoctor(@RequestParam String username) {
//        boolean equals = reportService.checkIfFirstDoctorExists(username);
//        return ResponseEntity.ok(equals);
//    }
//
//    @GetMapping("/checkSecondDoctor")
//    public ResponseEntity<Boolean> checkSecondDoctor(@RequestParam String username) {
//        boolean equals = reportService.checkIfSecondDoctorExists(username);
//        return ResponseEntity.ok(equals);
//    }

    @PutMapping("/updateReport")
    public ResponseEntity<?> updateReport(@RequestBody ReportRequestDto reportRequestDto) {
        try {
            reportService.updateReport(reportRequestDto);
            return ResponseEntity.ok().body("{\"message\":\"업데이트 성공\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"업데이트 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/updateSecondReport")
    public ResponseEntity<?> updateSecondReport(@RequestBody ReportRequestDto reportRequestDto) {
        try {
            reportService.updateSecondReport(reportRequestDto);
            return ResponseEntity.ok().body("{\"message\":\"업데이트 성공\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"업데이트 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/updateFirstReport")
    public ResponseEntity<?> updateFirstReport(@RequestBody ReportRequestDto reportRequestDto) {
        try {
            reportService.updateFirstReport(reportRequestDto);
            return ResponseEntity.ok().body("{\"message\":\"업데이트 성공\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"업데이트 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }
}
