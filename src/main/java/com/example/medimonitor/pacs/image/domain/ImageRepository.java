package com.example.medimonitor.pacs.image.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, ImageId> {
    List<Image> findAllByIdStudykeyAndIdSerieskey(long studykey, long serieskey);
}
