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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;
    private final ReportRepository reportRepository;

    public List<Study> findAllStudiesByKey(long studykey) {
        return studyRepository.findByStudykey(studykey);
    }

    public List<InfoResponseDto> getStudiesByPid(String pId) {
        List<Study> studies = studyRepository.findByPid(pId);

        List<InfoResponseDto> result = studies.stream().map(study -> {
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("notread");
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
                List<Long> studyKeys = reportRepository.findStudyKeysByStatus(value);
                List<Study> studyList = studyRepository.findAllById(studyKeys);
                studies = toPage(studyList, pageable);
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
            String reportStatus = reportOpt.map(Report::getStatus).orElse("notread");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        });
    }

    private Page<Study> toPage(List<Study> studies, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), studies.size());
        return new PageImpl<>(studies.subList(start, end), pageable, studies.size());
    }

    // 검색 서비스 메서드
    public Page<InfoResponseDto> searchStudies(String pid, String pname, String reportstatus, String modality, String startDate, String endDate, Pageable pageable) {
        Page<Study> studies = studyRepository.search(pid, pname, modality, startDate, endDate, pageable);

        // 필터링된 결과를 리스트로 변환
        List<Study> filteredStudies = studies.getContent().stream().filter(study -> {
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            if (reportstatus == null || reportstatus.isEmpty()) {
                return true;
            }
            return reportOpt.map(report -> report.getStatus().equalsIgnoreCase(reportstatus))
                    .orElse(reportstatus.equalsIgnoreCase("notread"));
        }).collect(Collectors.toList());

        // 필터링된 결과를 페이지로 변환
        Page<Study> filteredPage = new PageImpl<>(filteredStudies, pageable, studies.getTotalElements());

        return filteredPage.map(study -> {
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("notread");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        });
    }

    public List<Study> findByStudykey(long studykey) {
        return studyRepository.findByStudykey(studykey);
    }

    public Map<String, Object> getPreviousDate(String studyDate, long studyKey) {
        List<Study> previousStudies = studyRepository.findByStudydateLessThanEqualOrderByStudydateDescStudykeyDesc(studyDate);

        int i = 0;
        Study previousStudy = previousStudies.get(i);

        if(previousStudies.size() > 1){
            while (previousStudy.getStudydate().equals(studyDate)){
                i++;
                previousStudy = previousStudies.get(i);

                if(studyKey > previousStudy.getStudykey()) {
                    break;
                }
            }
            Map<String, Object> response = new HashMap<>();
            response.put("studyDate", previousStudy.getStudydate());
            response.put("studyKey", previousStudy.getStudykey());
            return response;

        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "마지막 검사입니다.");
            return response;
        }


    }

    public Map<String, Object> getNextDate(String studyDate , long studyKey) {
        List<Study> nextStudies = studyRepository.findByStudydateGreaterThanEqualOrderByStudydateAscStudykeyAsc(studyDate);

        int i = 0;

        Study nextStudy = nextStudies.get(0);

        if(nextStudies.size() > 1){
            while (nextStudy.getStudydate().equals(studyDate)){
                i++;
                nextStudy = nextStudies.get(i);

                if(studyKey < nextStudy.getStudykey()) {
                    break;
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("studyDate", nextStudy.getStudydate());
            response.put("studyKey", nextStudy.getStudykey());
            return response;
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "첫번째 검사입니다.");
            return response;
        }

    }
}