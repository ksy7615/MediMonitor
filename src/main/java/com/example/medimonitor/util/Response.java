package com.example.medimonitor.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Response {
    private int status;
    private String message;

    public Response(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
