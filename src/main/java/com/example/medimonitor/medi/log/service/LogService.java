package com.example.medimonitor.medi.log.service;

import com.example.medimonitor.medi.log.domain.Log;
import com.example.medimonitor.medi.log.domain.LogRepository;
import com.example.medimonitor.medi.log.dto.LogRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LogService {

    private final LogRepository logRepository;

    public Log save (LogRequestDto logRequestDto) {
        Log log = new Log(logRequestDto);
        return logRepository.save(log);
    }

    public Page<Log> findAllLogByUsername (String username, Pageable pageable) {
        Pageable sortedByDate = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("regDate").descending());

        if(username.equals("admin")) {
            return logRepository.findAll(sortedByDate);
        } else {
            return logRepository.findLogByUsername(username, sortedByDate);
        }
    }
}
