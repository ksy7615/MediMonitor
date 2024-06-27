package com.example.medimonitor.pacs.study.dto;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.medi.report.dto.ReportResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InfoResponseDto {
    private ReportResponseDto report;
    private Study study;


}
