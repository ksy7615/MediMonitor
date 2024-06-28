package com.example.medimonitor.pacs.study.controller;

import com.example.medimonitor.pacs.study.domain.Study;
import com.example.medimonitor.pacs.study.domain.StudyRepository;
import com.example.medimonitor.pacs.study.dto.StudyRequestDto;
import com.example.medimonitor.pacs.study.dto.InfoResponseDto;
import com.example.medimonitor.pacs.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class StudyController {

    private final StudyService studyService;


    @CrossOrigin
    @GetMapping("/mainAllSearch")
    @ResponseBody
    public Page<InfoResponseDto> getAllStudies(@RequestParam(defaultValue="0") int page, @RequestParam(defaultValue = "5") int size) {
        return studyService.findStudiesWithPagination(page, size);
    }

    @GetMapping("/mainPrevious/{pId}")
    @ResponseBody
    public List<InfoResponseDto> getStudiesByPid(@PathVariable String pId) {
        return studyService.getStudiesByPid(pId);
    }

    @GetMapping("/main")
    public String getMainView() {
        return "main";
    }

    @GetMapping("/search")
    @ResponseBody
    public List<Study> findStudies(@ModelAttribute StudyRequestDto studyRequestDto){
        List<Study> result = new ArrayList<>();
        List<Study> temp = new ArrayList<>();

        List<Study> findPid = new ArrayList<>();
        List<Study> findPName = new ArrayList<>();
        List<Study> findReportStatus = new ArrayList<>();
        List<Study> findModality = new ArrayList<>();

        boolean pidFlag = false;
        boolean pNameFlag = false;
        boolean reportStatusFlag = false;
        boolean modalityFlag = false;

        boolean start = false;

        String pid = studyRequestDto.getPid();
        String pname = studyRequestDto.getPname();
        long reportstatus = studyRequestDto.getReportstatus();
        String modality = studyRequestDto.getModality();
        Date startDate = studyRequestDto.getStartDate();
        Date endDate = studyRequestDto.getEndDate();

        System.out.println(startDate + " - " + endDate);

        if(!pid.isEmpty()){
            findPid = studyService.findByPidLike(pid);
            pidFlag = true;
        }

        if(!pname.isEmpty()){
            findPName = studyService.findByPnameLike(pname);
            pNameFlag = true;
        }

        if(reportstatus != -1){
            findReportStatus = studyService.findByReportstatus(reportstatus);
            reportStatusFlag = true;
        }

        if(!modality.isEmpty()){
            findModality = studyService.findByModality(modality);
            modalityFlag = true;
        }

        if(pidFlag){
            result.addAll(findPid);
            start = true;
        }

        if(pNameFlag && !start){
            result.addAll(findPName);
            start = true;
        } else if (pNameFlag && start) {
            for(int i=0; i<findPName.size(); i++){
                Study study = findPName.get(i);

                for(int j=0; j<result.size(); j++){
                    if(study.getStudykey() == result.get(j).getStudykey()){
                        temp.add(study);
                    }
                }
            }
            result.clear();
            result.addAll(temp);
            temp.clear();
        }

        if(reportStatusFlag && !start){
            result.addAll(findReportStatus);
            start = true;
        } else if (reportStatusFlag && start) {
            for(int i=0; i<findReportStatus.size(); i++){
                Study study = findReportStatus.get(i);

                for(int j=0; j<result.size(); j++){
                    if(study.getStudykey() == result.get(j).getStudykey()){
                        temp.add(study);
                    }
                }
            }
            result.clear();
            result.addAll(temp);
            temp.clear();
        }

        if(modalityFlag && !start){
            result.addAll(findModality);
            start = true;
        } else if (modalityFlag && start) {
            for(int i=0; i<findModality.size(); i++){
                Study study = findModality.get(i);

                for(int j=0; j<result.size(); j++){
                    if(study.getStudykey() == result.get(j).getStudykey()){
                        temp.add(study);
                    }
                }
            }
            result.clear();
            result.addAll(temp);
            temp.clear();
        }
        return  result;
    }
}
