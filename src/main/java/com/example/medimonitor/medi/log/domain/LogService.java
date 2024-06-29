package com.example.medimonitor.medi.log.domain;

import com.example.medimonitor.medi.log.dto.LogRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LogService {

    private final LogRepository logRepository;

    public Log save(LogRequestDto logRequestDto) {
        Log log = new Log(logRequestDto);
        return logRepository.save(log);
    }

}
