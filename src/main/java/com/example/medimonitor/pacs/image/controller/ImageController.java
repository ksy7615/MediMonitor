package com.example.medimonitor.pacs.image.controller;

import com.example.medimonitor.pacs.image.domain.Image;
import com.example.medimonitor.pacs.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @CrossOrigin
    @GetMapping("/detail/{studykey}/{serieskey}")
    @ResponseBody
    public List<Image> findByStudykeyAndSerieskey(@PathVariable long studykey, @PathVariable long serieskey){
        return imageService.findAllImage(studykey, serieskey);
    }
}
