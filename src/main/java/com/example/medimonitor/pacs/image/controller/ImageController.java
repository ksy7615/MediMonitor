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
@CrossOrigin(origins = "http://localhost:8080") // 필요한 도메인으로 변경
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/detail/{studyKey}/{seriesKey}")
    public String showImagesPage(@PathVariable(name = "studyKey") long studyKey, @PathVariable(name = "seriesKey") long seriesKey, Model model) {
        model.addAttribute("studyKey", studyKey);
        model.addAttribute("seriesKey", seriesKey);
        return "dicomInfo"; // 뷰 템플릿 이름
    }

    @GetMapping("/api/images/{studyKey}/{seriesKey}")
    @ResponseBody
    public List<Image> getImages(@PathVariable(name = "studyKey") long studyKey, @PathVariable(name = "seriesKey") long seriesKey) {
        System.out.println("study key: " + studyKey);
        System.out.println("series key: " + seriesKey);
        return imageService.findAllImage(studyKey, seriesKey);
    }
}
