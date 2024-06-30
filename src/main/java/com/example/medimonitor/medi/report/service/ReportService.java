package com.example.medimonitor.medi.report.service;

import com.example.medimonitor.medi.report.domain.Report;
import com.example.medimonitor.medi.report.domain.ReportRepository;
import com.example.medimonitor.medi.report.dto.ReportRequestDto;
import com.example.medimonitor.medi.report.dto.ReportResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public boolean checkIfStudyKeyExists(long studyKey) {
        return reportRepository.existsByStudykey(studyKey);
    }

    public boolean checkIfPreDoctorMatches(Long studykey, String username) {
        return reportRepository.existsByStudykeyAndPreDoctor(studykey, username);
    }

    public boolean checkIfFirstDoctorExists(String username) {
        return reportRepository.existsByFirstDoctor(username);
    }

    public boolean checkIfSecondDoctorExists(String username) {
        return reportRepository.existsBySecondDoctor(username);
    }

    public String getSecondDoctorByStudykey(Long studykey) {
        return reportRepository.findSecondDoctorByStudykey(studykey);
    }

    public boolean isSecondDoctorValueEmpty(Long studykey) {
        String secondDoctor = getSecondDoctorByStudykey(studykey);
        return secondDoctor == null || secondDoctor.isEmpty();
    }

    public String getFirstDoctorByStudykey(Long studykey) {
        return reportRepository.findFirstDoctorByStudykey(studykey);
    }

    public boolean isFirstDoctorValueEmpty(Long studykey) {
        String firstDoctor = getFirstDoctorByStudykey(studykey);
        return firstDoctor == null || firstDoctor.isEmpty();
    }


    public List<Report> getReportsByStudyKey(long studyKey) {
        if (checkIfStudyKeyExists(studyKey)) {
            return reportRepository.findByStudykey(studyKey);
        } else {
            return Collections.emptyList();
        }
    }

    public void updateReport(ReportRequestDto dto) {
        Optional<Report> optionalReport = reportRepository.findFirstByStudykey(dto.getStudykey());
        if (optionalReport.isPresent()) {
            Report report = optionalReport.get();
            report.setComment(dto.getComment());
            report.setExploration(dto.getExploration());
            report.setStatus(dto.getStatus());
            report.setSecondDoctor(dto.getSecondDoctor());
            // 필요한 경우 다른 필드들도 업데이트
            reportRepository.save(report);
        }
    }

    public ReportResponseDto saveReport(ReportRequestDto dto) {
        Report report = new Report(dto);
        reportRepository.save(report);
        return new ReportResponseDto(report);
    }
}
