package com.example.medimonitor.pacs.series.domain;

import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Getter
@Table(name = "V_SERIESTAB" , schema = "PACSPLUS")
@Entity
@IdClass(SeriesId.class)
public class Series {

    @Id
    private long studykey;
    @Id
    private long serieskey;
    private String seriesdesc;
    private long imagecnt;
    private String path;
    private String fname;
}
