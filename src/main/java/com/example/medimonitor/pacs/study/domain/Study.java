package com.example.medimonitor.pacs.study.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Table(name = "STUDYTAB", schema="PACSPLUS")
@Entity
public class Study {
    @Id
    private long studykey;
    private String pid;             // A-2
    private String pname;           // A-1
    private String pbirthdatetime;  // A-3
    private String psex;            // A-1-1
    private String modality;
    private String studydesc;
    private String studydate;
    private String studyinsuid;
    private long reportstatus;
    private long seriescnt;
    private long imagecnt;
    private long examstatus;

}