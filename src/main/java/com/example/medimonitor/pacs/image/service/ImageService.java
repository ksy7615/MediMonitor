package com.example.medimonitor.pacs.image.service;

import com.example.medimonitor.pacs.image.domain.Image;
import com.example.medimonitor.pacs.image.domain.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public List<Image> findAllImage(long studykey, long serieskey){
        return imageRepository.findAllByIdStudykeyAndIdSerieskey(studykey, serieskey);
    }
}
