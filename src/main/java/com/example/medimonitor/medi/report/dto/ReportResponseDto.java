package com.example.medimonitor.medi.report.dto;


import com.example.medimonitor.medi.report.domain.Report;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@NoArgsConstructor
@Getter
@Table(name = "report")
@Entity
public class ReportResponseDto {
    @Id
    private int code;
    private String comment;
    private String exploration;
    private String preDoctor;
    private String firstDoctor;
    private String secondDoctor;
    private String status;
    private long studykey;
    private Timestamp regDate;
    private Timestamp modDate;

    public ReportResponseDto(long studykey, String status) {
        this.studykey = studykey;
        this.status = status;
    }

    public ReportResponseDto(Report report){
        this.comment = report.getComment();
        this.exploration = report.getExploration();
        this.preDoctor = report.getPreDoctor();
        this.firstDoctor = report.getFirstDoctor();
        this.secondDoctor = report.getSecondDoctor();
        this.status = report.getStatus();
        this.studykey = report.getStudykey();
        this.regDate = report.getRegDate();
        this.modDate = report.getModDate();
    }
}

