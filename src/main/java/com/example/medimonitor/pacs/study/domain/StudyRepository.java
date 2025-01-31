package com.example.medimonitor.pacs.study.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByPid(String pId);
    Page<Study> findByPidLike(String pId, Pageable pageable);
    Page<Study> findByModality(String modality, Pageable pageable);
    Page<Study> findByPnameLike(String pname, Pageable pageable);
    Page<Study> findByStudydateBetween(String startDate, String endDate, Pageable pageable);
    List<Study> findByStudykey(long studykey);

    @Query("SELECT s FROM Study s WHERE " +
            "(:pid IS NULL OR s.pid LIKE %:pid%) AND " +
            "(:pname IS NULL OR s.pname LIKE %:pname%) AND " +
            "(:modality IS NULL OR s.modality LIKE %:modality%) AND " +
            "(:startDate IS NULL OR :endDate IS NULL OR s.studydate BETWEEN :startDate AND :endDate)")
    Page<Study> search(@Param("pid") String pid,
                       @Param("pname") String pname,
                       @Param("modality") String modality,
                       @Param("startDate") String startDate,
                       @Param("endDate") String endDate,
                       Pageable pageable);

    List<Study> findByStudydateLessThanEqualOrderByStudydateDescStudykeyDesc(String currentDate);

    List<Study> findByStudydateGreaterThanEqualOrderByStudydateAscStudykeyAsc(String currentDate);
}