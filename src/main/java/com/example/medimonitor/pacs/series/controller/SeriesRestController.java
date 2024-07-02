package com.example.medimonitor.pacs.series.controller;

import com.example.medimonitor.pacs.series.domain.Series;
import com.example.medimonitor.pacs.series.service.SeriesService;
import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class SeriesRestController {

    private final SeriesService seriesService;
    private final StudyService studyService;

    @GetMapping("/detail/{studykey}")
    @ResponseBody
    public Map<String, Object> findAllSeriesByStudykey(@PathVariable("studykey") long studykey) {
        Study study = studyService.findByStudykey(studykey).stream().findFirst().orElse(null);
        List<Series> seriesList = seriesService.findAllByStudyKey(studykey);

        Map<String, Object> response = new HashMap<>();
        response.put("study", study);
        response.put("seriesList", seriesList);

        return response;
    }
}
