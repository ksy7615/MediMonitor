package com.example.medimonitor.pacs.study.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Id;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class StudyRequestDto {
    private long studykey;
    private String pid;
    private String pname;
    private String modality;
    private String studydesc;
    private String startDate;
    private String endDate;
    private String studyinsuid;
    private String reportstatus;
    private long seriescnt;
    private long imagecnt;
    private long examstatus;
    private Float ai_score;
}
