package com.example.medimonitor.pacs.study.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByPid(String Pid);

    List<Study> findByPidLike(String Pid);

    List<Study> findByReportstatus(long reportStatus);

    List<Study> findByModality(String modality);

    List<Study> findByPnameLike(String Pname);

}
