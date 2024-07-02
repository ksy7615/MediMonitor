package com.example.medimonitor.pacs.study.domain;

import org.springframework.data.jpa.domain.Specification;

public interface StudySpecification {
    public static Specification<Study> hasPidLike(String pid) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("pid"), "%" + pid + "%");
    }

    public static Specification<Study> hasPnameLike(String pname) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("pname"), "%" + pname + "%");
    }

    public static Specification<Study> hasReportStatus(Long reportStatus) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("reportstatus"), reportStatus);
    }

    public static Specification<Study> hasModalityLike(String modality) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("modality"), "%" + modality + "%");
    }

    public static Specification<Study> hasStudyDateBetween(String startDate, String endDate) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("studydate"), startDate, endDate);
    }
}
