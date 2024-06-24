package com.example.medimonitor.pacs.study.service;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.PageRanges;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StudyService {
    private final StudyRepository studyRepository;

//    public List<Study> findAll() {
//        return studyRepository.findAll();
//    }

    public Page<Study> findStudiesWithPagination(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return studyRepository.findAll(pageable);
    }

}
