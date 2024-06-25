package com.example.medimonitor.pacs.series.domain;

import java.io.Serializable;
import java.util.Objects;

public class SeriesId implements Serializable {
    private long studykey;
    private long serieskey;

    // Default constructor
    public SeriesId() {}

    // Parameterized constructor
    public SeriesId(long studykey, long serieskey) {
        this.studykey = studykey;
        this.serieskey = serieskey;
    }

    // Getters and setters
    public long getStudykey() {
        return studykey;
    }

    public void setStudykey(long studykey) {
        this.studykey = studykey;
    }

    public long getSerieskey() {
        return serieskey;
    }

    public void setSerieskey(long serieskey) {
        this.serieskey = serieskey;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SeriesId seriesId = (SeriesId) o;
        return studykey == seriesId.studykey && serieskey == seriesId.serieskey;
    }

    @Override
    public int hashCode() {
        return Objects.hash(studykey, serieskey);
    }
}
