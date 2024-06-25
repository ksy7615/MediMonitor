package com.example.medimonitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MedimonitorApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedimonitorApplication.class, args);
    }

}
