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

    // View Controller >> DicomInfo Page
    @GetMapping("/detail/{studyKey}/{seriesKey}")
    public String showImagesPage(@PathVariable(name = "studyKey") long studyKey, @PathVariable(name = "seriesKey") long seriesKey, Model model) {
        model.addAttribute("studyKey", studyKey);
        model.addAttribute("seriesKey", seriesKey);
        return "dicomInfo";
    }

    @GetMapping("/test/{studyKey}/{seriesKey}")
    @ResponseBody
    public List<Image> show(@PathVariable(name = "studyKey") long studyKey, @PathVariable(name = "seriesKey")long seriesKey){
        System.out.println("studyKey: " + studyKey);
        System.out.println("seriesKey: " + seriesKey);
        return imageService.findAllImage(studyKey,seriesKey);
    }

}
