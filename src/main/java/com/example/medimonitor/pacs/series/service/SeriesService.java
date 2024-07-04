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

    public List<String> findAllSerieskey(long studyKey){
        return seriesRepository.searchAllSeriesKey(studyKey);
    }

    public List<Series> findAllSeriesByStudyKey(long studyKey , long seriesKey){
        return seriesRepository.findByStudykeyAndSerieskey(studyKey,seriesKey);
    }

    public List<Series> findAllByStudykey(long studykey) {
        return seriesRepository.findByStudykey(studykey);
    }
}
