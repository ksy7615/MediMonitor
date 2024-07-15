package com.example.medimonitor.medi.report.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Getter
@Table(name="report")
@Entity
public class ReportRequestDto {
    @Id
    private int code;
    private String comment;
    private String exploration;
    private String preDoctor;
    private String firstDoctor;
    private String secondDoctor;
    private String status;
    private long studykey;
}
