package com.example.medimonitor.pacs.series.domain;

import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Getter
@Table(name = "SERIESTAB" , schema = "PACSPLUS")
@Entity
@IdClass(SeriesId.class)
public class Series {

    @Id
    private long studykey;
    @Id
    private long serieskey;
    private String modality;
    private String seriesdesc;
    private String protocolname;
    private long imagecnt;
    private String seriestime;
    private String operatorsname;
    private String manufacturer;
    private String institutionname;
    private String manumodelname;
}
