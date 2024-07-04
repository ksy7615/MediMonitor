package com.example.medimonitor.pacs.series.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeriesRepository extends JpaRepository<Series, SeriesId> {
    @Query("SELECT serieskey FROM Series WHERE studykey = ?1")
    List<String> searchAllSeriesKey(long studykey);
    List<Series> findByStudykeyAndSerieskey(long studykey, long serieskey);
}
