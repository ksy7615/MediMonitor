package com.example.medimonitor.medi.report.domain;

import com.example.medimonitor.medi.report.dto.ReportRequestDto;
import com.example.medimonitor.util.Timestamped;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Getter
@Setter
@Table(name = "report")
@Entity
public class Report extends Timestamped {
    @Id
    private int code;
    private String comment;
    private String exploration;
    private String preDoctor;
    private String firstDoctor;
    private String secondDoctor;
    private String status;
    private long studykey;


    public Report(ReportRequestDto dto){
        this.comment = dto.getComment();
        this.exploration = dto.getExploration();
        this.preDoctor = dto.getPreDoctor();
        this.firstDoctor = dto.getFirstDoctor();
        this.secondDoctor = dto.getSecondDoctor();
        this.status = dto.getStatus();
        this.studykey = dto.getStudykey();
    }

    public Report() {

    }
}

