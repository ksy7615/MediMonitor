package com.example.medimonitor.pacs.series.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeriesRepository extends JpaRepository<Series, SeriesId> {
    List<Series> findByStudykey(long studykey);
}
