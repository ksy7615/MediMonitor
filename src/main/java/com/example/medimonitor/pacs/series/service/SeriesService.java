package com.example.medimonitor.pacs.series.service;

import com.example.medimonitor.pacs.series.domain.Series;
import com.example.medimonitor.pacs.series.domain.SeriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SeriesService {

    private final SeriesRepository seriesRepository;

    public List<Series> getAllSeries() {
        return seriesRepository.findAll();
    }

    public List<Series> findAllByStudyKey(long studyKey) {
        return seriesRepository.findByStudykey(studyKey);
    }
}
