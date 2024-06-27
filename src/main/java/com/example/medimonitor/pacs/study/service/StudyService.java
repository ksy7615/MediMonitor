package com.example.medimonitor.pacs.study.service;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import com.example.medimonitor.pacs.study.dto.InfoResponseDto;
import com.example.medimonitor.medi.report.domain.Report;
import com.example.medimonitor.medi.report.domain.ReportRepository;
import com.example.medimonitor.medi.report.dto.ReportResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;
    private final ReportRepository reportRepository;

    public List<InfoResponseDto> getStudiesByPid(String pId) {
        List<Study> studies = studyRepository.findByPid(pId);

        List<InfoResponseDto> result = studies.stream().map(study -> {
            Optional<Report> reportOpt = reportRepository.findFristByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("읽지않음");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        }).collect(Collectors.toList());

        return result;
    }

    public Page<InfoResponseDto> findStudiesWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("studydate").descending());
        Page<Study> studies = studyRepository.findAll(pageable);

        return studies.map(study -> {
            Optional<Report> reportOpt = reportRepository.findFristByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("읽지않음");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        });
    }
}
