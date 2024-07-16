# 🏥MediMonitor

## ▶ INTRO
#### 개발기간
🗓️ 2024.06.18 ~ 2024.07.15 (28일)

#### 팀원
<img src="https://github.com/user-attachments/assets/92084965-d2fc-41d6-933c-0219e3ecc3b1" width="700px">

- 김선영(팀장)
   - 달력 구현
   - 검색 기능
   - 접근 로그 기록
- 윤소원(서기)
   - Previous
   - Report
   - 그리드 기능
   - Dicom 이미지 드래그, 클릭, 더블클릭 이벤트
- 김재현
   - Dicom 이미지 렌더링
   - Thumbnail
   - 툴바
   - 메타 데이터 기입입
- 허채은
   - 유저 기능
   - 권한 부여 기능
   - 쪽지 기능
   
## ▶ 프로젝트 개요
#### ⓛ 주제 선정 동기
   1. 현대 의료 기술의 발전
   2. 효과적인 관리와 분석을 위한 프로그램의 필요성
   3. 정확하고 신속한 진단을 내릴 수 있는 직관적이고 기능적인 뷰어 프로그램 <br>

▶ 현대 의료기술의 발전에 이어 의료 영상을 보다 효율적으로 조회하고 분석할 수 있는 전문적인 뷰어 프로그램을 개발하고자 함


#### ② 프로젝트 목표
  1. 효과적인 분석
      - 다양한 분석 도구 제공
  2. 직관적
      - 사용자 친화적인 인터페이스
  3. 보안성
      - 접근 제어
      - 로그 및 모니터링

#### ③ 프로젝트 요구사항 정의 및 기능
  1. 직관적인 사용자 인터페이스
  2. 정확하고 신속한 분석 도구 
      - 리포트 기능 <br>
  <img src="https://github.com/user-attachments/assets/118fe243-6ff1-4c19-869c-42ac3bc88461" width="550px"><br>
      - 31종의 도구
  3. 협업
      - 쪽지 기능
  4. 보안
      - 회원가입 시 관리자의 승인 후 최종 가입 완료
      - 모든 페이지는 로그인 후 이용 가능
      - 이미지 정보 접근 시 모든 로그 기록


## ▶ 활용 기술
<img src="https://github.com/user-attachments/assets/754c4ef8-a100-44fc-9348-6612a91c07be" width="700px">


## ▶ 프로젝트 문서
1. [요구사항 정의서](https://docs.google.com/spreadsheets/d/1qz6Qibb2Q5YubVvZVwLoBi7Ar3MUL0z3Kp018mO87yk/edit?usp=drive_link)
2. [인터페이스 정의서](https://docs.google.com/spreadsheets/d/1AznNA--CgFnc6EGh5GIyCHFvloFMJyWAF19_Oh941_k/edit?usp=drive_link)
3. [테이블 정의서](https://docs.google.com/spreadsheets/d/1jU3AHaCr0q3byJ2bof9I9myIQbTLlNy-RrEHzpwIE64/edit?usp=drive_link) <br>
<img src="https://github.com/user-attachments/assets/695e0e5d-c7ce-4c58-bc6e-76cee056a51c" width="700px"> <br>
4. [프로젝트 기획서]()
5. [화면설계](https://drive.google.com/file/d/1goYarkiMypbONTnecxaN7qWPpufWaR1m/view?usp=drive_link)
6. [WBS](https://docs.google.com/spreadsheets/d/1EwlwSsCUgzkFW5pGpehYE0ctfDgzc05q2HxDkOlRGB8/edit?usp=drive_link)


## 📹DEMO

#### 회원가입 (동의서)
<img src="https://github.com/user-attachments/assets/1e3fcc11-d5b5-464b-a78d-72db83903c33" width="1000px">

#### 로그인 실패 → 승인X
<img src="https://github.com/user-attachments/assets/cadfae7e-0e8c-4971-b90a-cc47a373a40d" width="1000px">

#### 관리자의 승인 관리
<img src="https://github.com/user-attachments/assets/e87522b3-b35d-4e06-83b5-597e1de7db54" width="1000px">

#### 관리자의 유저 삭제 관리
<img src="https://github.com/user-attachments/assets/8f18fe43-70bc-48e8-9022-ddc57adabf12" width="1000px">

#### 쪽지 
<img src="" width="1000px">

#### 검색
- 환자 아이디, 환자 이름, 판독상태, 검사일자, 검사장비로 세부 검색
<img src="https://github.com/user-attachments/assets/5cdb2797-0d82-4a6a-a936-cd70cb5611eb" width="1000px">

#### Previous(미리보기)
<img src="https://github.com/user-attachments/assets/bb545ecb-ffaa-4a1c-a5dd-6eeba6c7f3a4" width="700px">
<img src="https://github.com/user-attachments/assets/d4995cd0-2ac7-41d7-bfc9-57349c4db183" width="1000px">

#### 리포트
- 메인화면 리포트
<img src="https://github.com/user-attachments/assets/d28b4a03-74aa-4157-817d-97b8c19f5269" width="700px">

-  상세화면 리포트
<img src="https://github.com/user-attachments/assets/24cf08c5-e1b8-4865-8c44-325c65463e19" width="700px">

- 예비판독 및 판독 성공
<img src="https://github.com/user-attachments/assets/ee514d71-c45f-4bf6-996e-97efeba97e6b" width="400px">

- 예비판독 및 판독 업데이트 성공 (기입된 판독의와 로그인 유저가 동일할 시에만 가능)
<img src="https://github.com/user-attachments/assets/0a3700a8-20c1-4c22-9842-78e055cf43b2" width="400px">

- 예비판독이 완료된 검사에 다른 유저가 예비판독 시도
<img src="https://github.com/user-attachments/assets/4150d6ff-e18d-4e18-933a-43988c8a5e3f" width="400px">

- 판독이 완료된 검사에 예비판독 시도
<img src="https://github.com/user-attachments/assets/d89cc6a1-0483-411a-904c-ba124680ee93" width="400px">

