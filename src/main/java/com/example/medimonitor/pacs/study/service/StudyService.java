package com.example.medimonitor.pacs.study.service;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StudyService {

    private final StudyRepository studyRepository;

    public Page<Study> findStudiesWithPagination(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("studydate").descending());
        return studyRepository.findAll(pageable);
    }

}
