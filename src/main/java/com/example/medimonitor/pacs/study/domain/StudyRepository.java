package com.example.medimonitor.pacs.study.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByPid(String pId);
    Page<Study> findByPidLike(String pId, Pageable pageable);
    Page<Study> findByReportstatus(long reportStatus, Pageable pageable);
    Page<Study> findByModality(String modality, Pageable pageable);
    Page<Study> findByPnameLike(String pname, Pageable pageable);
    Page<Study> findByStudydateBetween(String startDate, String endDate, Pageable pageable);
}