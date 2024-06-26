package com.example.medimonitor.report.domain;

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
    private String pre_doctor;
    private String first_doctor;
    private String second_doctor;
    private String status;
    private int studykey;
}
