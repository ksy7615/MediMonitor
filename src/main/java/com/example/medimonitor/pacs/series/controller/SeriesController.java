package com.example.medimonitor.pacs.series.controller;

import com.example.medimonitor.pacs.series.domain.Series;
import com.example.medimonitor.pacs.series.service.SeriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class SeriesController {

    private final SeriesService seriesService;

    @GetMapping("/detail/{studykey}")
    @ResponseBody
    public List<Series> findAllSeriesByStudykey(@PathVariable("studykey") long studykey) {
        return seriesService.findAllByStudyKey(studykey);
    }
}
