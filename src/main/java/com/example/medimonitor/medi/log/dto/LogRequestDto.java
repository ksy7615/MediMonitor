package com.example.medimonitor.medi.log.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LogRequestDto {
    private long studykey;
    private String username;
}
