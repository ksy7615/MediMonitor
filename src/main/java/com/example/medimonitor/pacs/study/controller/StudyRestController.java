package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/study")
@RestController
public class StudyRestController {

    private final StudyService studyService;

    @PostMapping("/previousDate/{studyDate}/{studyKey}")
    public ResponseEntity<Map<String, Object>> getPreviousDate(@PathVariable("studyDate") String studyDate ,@PathVariable("studyKey") long studyKey) {
        Map<String, Object> response = studyService.getPreviousDate(studyDate,studyKey);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/nextDate/{studyDate}/{studyKey}")
    public ResponseEntity<Map<String, Object>> getNextDate(@PathVariable("studyDate") String studyDate, @PathVariable("studyKey") long studyKey) {
        Map<String, Object> response = studyService.getNextDate(studyDate, studyKey);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
