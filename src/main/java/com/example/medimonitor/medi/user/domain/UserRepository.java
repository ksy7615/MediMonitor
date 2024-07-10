package com.example.medimonitor.medi.user.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    public User findByPhone(String phone);

    public List<User> findByAuthorityFalse();

//    public Page<User> findByAuthorityFalse(Pageable pageable);

    public List<User> findByAuthorityTrue();

    public User findByUsernameAndPassword(String username, String password);

//    @Query(nativeQuery = true, value = "SELECT * FROM users WHERE authority=0 LIMIT 8 OFFSET ?1")
//    public List<User> findUserListByAuthorityFalse(@Param("OFFSET") int offset);

//    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM users WHERE authority=0")
//    public int countByAuthorityFalse();


    public List<User> findByName(String name);
}
