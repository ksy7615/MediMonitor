package com.example.medimonitor.pacs.image.controller;

import com.example.medimonitor.pacs.image.domain.Image;
import com.example.medimonitor.pacs.image.service.ImageService;
import com.example.medimonitor.pacs.series.domain.Series;
import com.example.medimonitor.pacs.series.service.SeriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@RequestMapping("/api/image")
@RestController
public class ImageRestController {

    private final ImageService imageService;
    private final SeriesService seriesService;

    // RestAPI Controller

    @PostMapping("/{studykey}/{serieskey}")
    public Map<String, Object> getAllImageDatas(@PathVariable long studykey, @PathVariable long serieskey)  {
        List<String> fileList = new ArrayList<>();

        List<Image> images = imageService.findAllImage(studykey, serieskey);
        List<Series> series = seriesService.findAllSeriesByStudyKey(studykey, serieskey);

        for (Image image : images) {
            // 실제 파일경로 추출
            String filePath = getRealFilePath(image.getPath(), image.getFname());

            File file = new File(filePath);
            if (file.exists()) {
                try (FileInputStream fis = new FileInputStream(file)) {
                    byte[] bytes = fis.readAllBytes();

                    // JSON 응답 타입의 경우, byte[]에 대한 유실의 위험이 있음
                    // 안정적인 Base64 타입으로 인코딩하여 전달
                    String imageData = Base64.getEncoder().encodeToString(bytes);
                    fileList.add(imageData);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // series의 정보와
        Map<String, Object> response = new HashMap<>();
        response.put("fileList", fileList);
        response.put("seriesInfo", series);

        return response;
    }

    private String getRealFilePath(String path, String filename) {
        String realPath = "";

        String osName = System.getProperty("os.name").toLowerCase().split(" ")[0];
        String separator = System.getProperty("file.separator");

        String rootPath = "Z:\\";

        if (osName.equals("mac")) {
            rootPath = "\\Volumes\\STS\\";
        }

        realPath += rootPath;
        realPath += path + filename;
        realPath = realPath.replace("\\", separator);

        return realPath;
    }

}
