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

import java.util.ArrayList;
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
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("읽지않음");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        }).collect(Collectors.toList());

        return result;
    }

    public Page<InfoResponseDto> findStudiesWithPagination(int page, int size, String type, String value) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("studydate").descending());
        Page<Study> studies;

        switch (type.toLowerCase()) {
            case "pid":
                studies = studyRepository.findByPidLike("%" + value + "%", pageable);
                break;
            case "reportstatus":
                studies = studyRepository.findByReportstatus(Long.parseLong(value), pageable);
                break;
            case "modality":
                studies = studyRepository.findByModality(value, pageable);
                break;
            case "pname":
                studies = studyRepository.findByPnameLike("%" + value + "%", pageable);
                break;
            case "studydate":
                String[] dates = value.split(",");
                if (dates.length != 2) {
                    throw new IllegalArgumentException("Invalid date range format. Expected format: 'startDate,endDate'");
                }
                String startDate = dates[0];
                String endDate = dates[1];
                studies = studyRepository.findByStudydateBetween(startDate, endDate, pageable);
                break;
            case "all":
            default:
                studies = studyRepository.findAll(pageable);
                break;
        }

        return studies.map(study -> {
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("읽지않음");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        });
    }

    // 검색 서비스 메서드
    public Page<InfoResponseDto> searchStudies(String pid, String pname, Long reportstatus, String modality, String startDate, String endDate, Pageable pageable) {
        Page<Study> studies = studyRepository.search(pid, pname, reportstatus, modality, startDate, endDate, pageable);
        return studies.map(study -> {
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("읽지않음");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        });
    }

    public List<Study> findByStudykey(long studykey) {
        return studyRepository.findByStudykey(studykey);
    }
}