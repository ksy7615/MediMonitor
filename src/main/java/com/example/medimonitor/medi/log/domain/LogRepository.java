package com.example.medimonitor.medi.log.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Integer> {
    Page<Log> findLogByUsername (String username, Pageable pageable);
}
