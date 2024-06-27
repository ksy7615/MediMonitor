package com.example.medimonitor.medi.report.service;

import com.example.medimonitor.medi.report.domain.Report;
import com.example.medimonitor.medi.report.domain.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    ReportRepository reportRepository;

    public boolean checkIfStudyKeyExists(long studyKey) {
        return reportRepository.existsByStudykey(studyKey);
    }

    public List<Report> getReportsByStudyKey(long studyKey) {
        if (checkIfStudyKeyExists(studyKey)) {
            return reportRepository.findByStudykey(studyKey);
        } else {
            return Collections.emptyList();
        }
    }
}
