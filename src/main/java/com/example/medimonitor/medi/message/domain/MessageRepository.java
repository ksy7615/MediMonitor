package com.example.medimonitor.medi.message.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    public List<Message> findByRecipientOrderByRegDateDesc(String recipient);

    public List<Message> findBySenderOrderByRegDateDesc(String sender);

    @Query(nativeQuery = true, value = "SELECT * FROM message WHERE recipient=?1 ORDER BY reg_date DESC LIMIT 30 OFFSET 0")
    public List<Message> findByRecipientLimit(String recipient);

    @Query(nativeQuery = true, value = "SELECT * FROM message WHERE sender=?1 ORDER BY reg_date DESC LIMIT 30 OFFSET 0")
    public List<Message> findBySenderLimit(String sender);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE message SET status=1 WHERE code=?1")
    public int updateStatus(int code);
}
