package com.example.medimonitor.test.service;

import com.example.medimonitor.test.domain.Users;
import com.example.medimonitor.test.domain.UsersReposioty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UsersService {

    private  final UsersReposioty usersReposioty;

    public List<Users> findAll(){
        return usersReposioty.findAll();
    }
}
