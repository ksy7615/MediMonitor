package com.example.medimonitor.pacs.series.controller;

import com.example.medimonitor.medi.log.service.LogService;
import com.example.medimonitor.medi.log.dto.LogRequestDto;
import com.example.medimonitor.medi.user.dto.UserResponseDto;
import com.example.medimonitor.pacs.series.service.SeriesService;
import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class SeriesRestController {

    private final LogService logService;
    private final SeriesService seriesService;
    private final StudyService studyService;

    @GetMapping("/detail/{studykey}")
    @ResponseBody
    public Map<String, Object> findAllSeriesByStudykey(@PathVariable("studykey") long studykey, HttpSession session) {
        Study study = studyService.findByStudykey(studykey).stream().findFirst().orElse(null);
        List<String> seriesKeyList = seriesService.findAllSerieskey(studykey);

        // 로그 저장
        saveLog(studykey, session);

        // 정보 뽑아오기 ( Study 의 정보 + 시리즈키 값만 )
        Map<String, Object> response = new HashMap<>();
        response.put("study", study);
        response.put("seriesList", seriesKeyList);

        return response;
    }

    // 로그 저장을 위한 메서드
    private void saveLog(long studykey, HttpSession session) {
        UserResponseDto userResponseDto = (UserResponseDto) session.getAttribute("user");
        String username = userResponseDto != null ? userResponseDto.getUsername() : null;

        LogRequestDto logRequestDto = new LogRequestDto();
        logRequestDto.setStudykey(studykey);
        logRequestDto.setUsername(username);

        logService.save(logRequestDto);
    }
}
