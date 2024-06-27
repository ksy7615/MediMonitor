package com.example.medimonitor.medi.report.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Table(name = "report")
@Entity
public class Report {
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
