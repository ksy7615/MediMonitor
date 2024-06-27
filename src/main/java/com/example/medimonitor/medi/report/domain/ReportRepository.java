package com.example.medimonitor.medi.report.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findFristByStudykey(long studykey);
    List<Report> findByStudykey(long studykey);
    Boolean existsByStudykey(long studykey);
}
