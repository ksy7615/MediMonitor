package com.example.medimonitor.medi.log.domain;

import com.example.medimonitor.medi.log.dto.LogRequestDto;
import com.example.medimonitor.util.Timestamped;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Getter
@Table(name = "log")
@Entity
public class Log extends Timestamped {
    @Id
    private int code;
    private long studykey;
    private String username;

    public Log(LogRequestDto logRequestDto) {
        this.studykey = logRequestDto.getStudykey();
        this.username = logRequestDto.getUsername();
    }
}
