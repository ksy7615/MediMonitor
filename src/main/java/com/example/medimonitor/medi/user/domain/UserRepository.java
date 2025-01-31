package com.example.medimonitor.medi.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    public User findByPhone(String phone);

    public List<User> findByAuthorityFalse();

    public List<User> findByAuthorityTrue();

    public User findByUsernameAndPassword(String username, String password);

    public List<User> findByName(String name);
}
