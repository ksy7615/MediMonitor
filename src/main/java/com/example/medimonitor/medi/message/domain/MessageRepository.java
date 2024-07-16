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

    public int countByStatusFalseAndRecipient(String recipient);

    public int countByRecipient(String recipient);

    public List<Message> findBySenderOrderByRegDateDesc(String sender);

    public int countByStatusFalseAndSender(String sender);

    public int countBySender(String sender);

    public List<Message> findFirst30ByRecipientOrderByRegDateDesc(String recipient);

    public List<Message> findFirst30BySenderOrderByRegDateDesc(String sender);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE message SET status=1 WHERE code=?1")
    public int updateStatus(int code);
}
