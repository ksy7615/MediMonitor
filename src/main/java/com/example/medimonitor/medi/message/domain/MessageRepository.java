package com.example.medimonitor.medi.message.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    public List<Message> findByRecipient(String recipient);

    public List<Message> findBySender(String sender);

    @Query(nativeQuery = true, value = "SELECT * FROM message WHERE sender=?1 ORDER BY reg_date DESC LIMIT 30 OFFSET 0")
    public List<Message> findByRecipientOrderByRegDateDesc(String recipient);

    @Query(nativeQuery = true, value = "SELECT * FROM message WHERE sender=?1 ORDER BY reg_date DESC LIMIT 30 OFFSET 0")
    public List<Message> findBySenderOrderByRegDateDesc(String sender);

}
