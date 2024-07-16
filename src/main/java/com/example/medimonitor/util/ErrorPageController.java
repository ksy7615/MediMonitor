package com.example.medimonitor.util;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

public class ErrorPageController {
    @Controller
    public class CustomErrorController implements ErrorController {

        @RequestMapping(value = "/error")
        public String handleError(HttpServletRequest request){
            Object status  = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
            return "error";
        }
    }
}
