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

    public Page<InfoResponseDto> findStudiesWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("studydate").descending());
        Page<Study> studies = studyRepository.findAll(pageable);

        return studies.map(study -> {
            Optional<Report> reportOpt = reportRepository.findFirstByStudykey(study.getStudykey());
            String reportStatus = reportOpt.map(Report::getStatus).orElse("읽지않음");
            ReportResponseDto reportResponseDto = new ReportResponseDto(study.getStudykey(), reportStatus);

            return new InfoResponseDto(reportResponseDto, study);
        });
    }

    public List<Study> findByPidLike(String pid){
        return studyRepository.findByPidLike("%" + pid + "%");
    }

    public List<Study> findByReportstatus(long reportStatus){
        return studyRepository.findByReportstatus(reportStatus);
    }

    public List<Study> findByModality(String modality){
        return studyRepository.findByModality(modality);
    }

    public List<Study> findByPnameLike(String pname){
        return studyRepository.findByPnameLike("%" + pname + "%");
    }

    public List<Study> findByStudydateBetween(String startDate, String endDate) {
        List<Study> studies = studyRepository.findAll();
        List<Study> result = new ArrayList<>();

        // 숫자만 나오도록 변환
        int start = Integer.parseInt(startDate.replace("-", ""));
        int end = Integer.parseInt(endDate.replace("-", ""));

        for(int i=0; i<studies.size(); i++) {
            Study study = studies.get(i);

            int studyDate = Integer.parseInt(study.getStudydate());

            if(studyDate >= start && studyDate <= end) {
                result.add(study);
            }
        }
        return result;
    }
}
