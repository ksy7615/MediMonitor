package com.example.medimonitor.pacs.study.service;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudyService {
    private final StudyRepository studyRepository;

    public List<Study> findAll() {
        return studyRepository.findAll();
    }
}
