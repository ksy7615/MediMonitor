package com.example.medimonitor.medi.log.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository extends JpaRepository<Log, Integer> {
    List<Log> findLogByUsername (String username);
}
