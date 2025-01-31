package com.example.medimonitor.pacs.image.controller;

import com.example.medimonitor.pacs.image.domain.Image;
import com.example.medimonitor.pacs.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/detail/{studyKey}/{studyDate}")
    public String getDetailView(@PathVariable(name = "studyKey") long studyKey,@PathVariable(name = "studyDate") String studyDate, Model model) {
        model.addAttribute("studyKey", studyKey);
        model.addAttribute("studyDate", studyDate);
        return "detail";
    }

    @GetMapping("/test/{studyKey}/{seriesKey}")
    @ResponseBody
    public List<Image> show(@PathVariable(name = "studyKey") long studyKey, @PathVariable(name = "seriesKey")long seriesKey){
        return imageService.findAllImage(studyKey,seriesKey);
    }
}
