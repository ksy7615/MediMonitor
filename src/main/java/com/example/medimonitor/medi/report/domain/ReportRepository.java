package com.example.medimonitor.medi.report.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findFirstByStudykey(long studykey);
    List<Report> findByStudykey(long studykey);
    Boolean existsByStudykey(long studykey);
    Boolean existsByPreDoctor(String username);
    Boolean existsByFirstDoctor(String username);
    Boolean existsBySecondDoctor(String username);
    Boolean existsByStudykeyAndPreDoctor(Long studykey, String preDoctor);

    @Query("SELECT r.secondDoctor FROM Report r WHERE r.studykey = :studykey")
    String findSecondDoctorByStudykey(@Param("studykey") Long studykey);

    @Query("SELECT r.firstDoctor FROM Report r WHERE r.studykey = :studykey")
    String findFirstDoctorByStudykey(@Param("studykey") Long studykey);
}
