package com.example.medimonitor.medi.report.dto;


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
}

