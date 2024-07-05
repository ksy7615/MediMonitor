package com.example.medimonitor.pacs.series.controller;

import com.example.medimonitor.pacs.series.domain.Series;
import com.example.medimonitor.pacs.series.service.SeriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class SeriesController {

    private final SeriesService seriesService;

    @GetMapping("/thumbnail/{studykey}")
    @ResponseBody
    public List<Series> findAllByStudykey(@PathVariable(name = "studykey") long studykey) {
        return seriesService.findAllByStudykey(studykey);
    }

}
