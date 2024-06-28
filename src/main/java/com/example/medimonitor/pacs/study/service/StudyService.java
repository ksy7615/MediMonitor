package com.example.medimonitor.pacs.study.service;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import com.example.medimonitor.pacs.study.dto.StudyRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;

    public Page<Study> findStudiesWithPagination(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("studydate").descending());
        return studyRepository.findAll(pageable);
    }

    public List<Study> getStudiesByPid(String pId){
        return studyRepository.findByPid(pId);
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
}
