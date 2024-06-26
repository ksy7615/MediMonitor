package com.example.medimonitor.pacs.image.controller;

import com.example.medimonitor.pacs.image.domain.Image;
import com.example.medimonitor.pacs.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080") // 필요한 도메인으로 변경
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/detail/{studyKey}/{seriesKey}")
    public List<Image> showImages(@PathVariable(name = "studyKey") long studyKey, @PathVariable(name = "seriesKey") long seriesKey) {
        return imageService.findAllImage(studyKey,seriesKey);
    }


}
