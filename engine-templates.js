/* LOCALPIN AI GROWTH ENGINE · 업종별 진단 기준과 제작 자료 목록 (1단계)
   항목을 고치면 관리자 화면의 "기준 다시 채우기"로 사업장에 없는 항목만 추가됩니다(기존 기록은 지우지 않음). */
window.ENG_INDUSTRY = {
  academy: "요양보호사교육원",
  postpartum: "산후관리사 파견업체",
  homecare: "방문요양센터",
  other: "기타 지역 전문서비스",
};
window.ENG_CHANNEL = { place: "플레이스", home: "홈페이지", blog: "블로그", brand: "브랜드", contact: "상담 동선" };

// [key, 채널, 항목, 중요도(1 높음~3 낮음)]
const COMMON = [
  ["p_name", "place", "업체명·업종이 한눈에 분명한가", 1],
  ["p_basic", "place", "운영시간·주소·연락처가 정확한가", 1],
  ["p_photos", "place", "대표 이미지(첫 사진 몇 장)가 업장을 설명하는가", 1],
  ["p_intro", "place", "소개글에 서비스·전문성이 구체적으로 있는가", 1],
  ["p_expert", "place", "원장·기관 전문성(경력·자격)이 드러나는가", 2],
  ["p_news", "place", "최근 소식이 올라와 있는가", 2],
  ["p_cta", "place", "전화·톡톡·예약 버튼이 연결되어 있는가", 1],
  ["p_links", "place", "홈페이지·블로그가 연결되어 있는가", 2],
  ["p_reviews", "place", "리뷰 운영 상태(공개 정보 기준)", 3],
  ["p_match", "place", "공개 정보가 실제 운영 정보와 일치하는가", 1],
  ["h_hero", "home", "첫 화면 메시지가 누구·무엇을 분명히 말하는가", 1],
  ["h_expert", "home", "업체 전문성·운영 방식이 보이는가", 1],
  ["h_service", "home", "서비스 설명과 비용 안내가 찾기 쉬운가", 2],
  ["h_mobile", "home", "휴대폰 화면에서 편하게 보이는가", 1],
  ["h_cta", "home", "상담·전화·예약 버튼이 눈에 띄고 작동하는가", 1],
  ["h_meta", "home", "제목·설명(검색 정보)이 들어 있는가", 2],
  ["h_privacy", "home", "개인정보 처리 고지가 있는가", 2],
  ["h_links", "home", "깨진 링크·느린 로딩이 없는가", 3],
  ["b_profile", "blog", "프로필·소개가 업장과 일치하는가", 2],
  ["b_category", "blog", "카테고리가 정리되어 있는가", 3],
  ["b_recent", "blog", "최근 30일 안에 글이 있는가", 1],
  ["b_questions", "blog", "고객이 실제로 묻는 질문에 답하는 글이 있는가", 1],
  ["b_contact", "blog", "글에서 상담으로 이어지는 안내가 있는가", 2],
  ["b_ads", "blog", "과도한 광고 표현·부정확한 정보가 없는가", 2],
  ["r_message", "brand", "세 채널의 핵심 메시지가 같은가", 1],
  ["r_proof", "brand", "경력·자격에 근거가 있는가", 2],
  ["r_visual", "brand", "로고·색이 채널마다 일관된가", 3],
  ["r_diff", "brand", "주변 업체와 구분되는 설명이 있는가", 1],
  ["r_review_ok", "brand", "후기 사용 시 동의·개인정보 가림이 되어 있는가", 2],
  ["c_flow", "contact", "어느 채널에서든 3번 안에 연락할 수 있는가", 1],
];
const BY_INDUSTRY = {
  academy: [
    ["a_course", "brand", "교육과정(자격 과정) 안내가 분명한가", 1],
    ["a_schedule", "brand", "개강 일정이 최신으로 안내되는가", 1],
    ["a_class", "brand", "주간·야간·주말반 안내가 있는가", 2],
    ["a_fund", "brand", "국비·내일배움카드 안내가 있는가(조건은 공식 자료로 확인)", 1],
    ["a_exam", "brand", "자격시험·실습 안내가 있는가", 2],
    ["a_teacher", "brand", "강사진·교육원 전문성이 보이는가", 2],
    ["a_facility", "brand", "시설·교육 환경 사진이 있는가", 2],
  ],
  postpartum: [
    ["pp_voucher", "brand", "정부지원·바우처 이용 안내가 있는가(금액은 공식 자료로 확인)", 1],
    ["pp_scope", "brand", "서비스 범위가 분명한가", 1],
    ["pp_manager", "brand", "관리사 자격·교육 안내가 있는가", 1],
    ["pp_booking", "brand", "예약 가능 시기·절차 안내가 있는가", 1],
    ["pp_cost", "brand", "비용·본인부담 안내가 있는가", 2],
    ["pp_area", "brand", "서비스 지역이 분명한가", 2],
  ],
  homecare: [
    ["hc_grade", "brand", "장기요양등급·이용 절차 안내가 있는가(제도는 공식 자료로 확인)", 1],
    ["hc_family", "brand", "보호자가 묻는 질문에 답하는가", 1],
    ["hc_area", "brand", "이용 가능 지역이 분명한가", 2],
    ["hc_scope", "brand", "서비스 제공 범위가 분명한가", 1],
    ["hc_staff", "brand", "인력·기관 전문성이 보이는가", 2],
    ["hc_cost", "brand", "비용·본인부담 안내가 있는가(공식 감경·면제 제도만)", 2],
    ["hc_law", "brand", "본인부담금 임의 할인·면제·금품 제공 유인 표현이 없는가(노인장기요양보험법 제35조)", 1],
  ],
  other: [],
};
window.engAuditTemplate = ind => COMMON.concat(BY_INDUSTRY[ind] || []);

// 제작 자료 22항목 [key, 이름]
window.ENG_MATERIALS = [
  ["logo", "로고 있음 여부"], ["logo_file", "로고 원본 파일"], ["color", "브랜드 색"],
  ["profile_photo", "대표·원장 프로필 사진"], ["career_proof", "원장 경력·자격 증빙"],
  ["exterior", "사업장 외관·내부 사진"], ["facility", "시설·교육 사진"],
  ["service_desc", "서비스 설명"], ["price", "서비스 가격"], ["hours", "운영시간"],
  ["location", "위치·주차 정보"], ["schedule", "교육과정·개강 일정 / 예약 가능 일정"],
  ["has_home", "홈페이지 보유 여부"], ["domain", "기존 도메인·호스팅"],
  ["place_access", "플레이스 관리 권한(매니저 초대)"], ["blog_access", "블로그 관리 권한"],
  ["contact_way", "전화·예약·상담 연결 방법"], ["review_consent", "고객 후기 사용 동의"],
  ["legal", "개인정보·필수 사업자 고지 자료"], ["design_ref", "디자인 참고 자료"],
  ["avoid", "피하고 싶은 표현"], ["etc", "기타 원장님 확인 사항"],
];
/* 방문요양 등 콘텐츠 발행 전 검수 대상 표현(발견 시 검수 필요로 표시) */
window.ENG_RISK_WORDS = ["본인부담금 할인", "본인부담금 면제", "본인부담 0원", "본인부담금 없", "무료로 이용", "현금 지급", "현금 드", "상품권", "선물 증정", "사은품", "페이백", "대신 내 드"];
window.ENG_MAT_STATUS = { have: "보유", need: "추가 필요", na: "해당 없음", verify: "검증 필요" };
window.ENG_AUDIT_STATUS = { good: "양호", improve: "개선 필요", unknown: "확인 불가" };
window.ENG_PRODUCT = { placeBasic: "플레이스 BASIC", place: "플레이스 BRANDING", home: "홈페이지 제작", placeBlog: "플레이스 BRANDING + 블로그", webBasic: "홈페이지 + 플레이스 BASIC", placeHome: "SIGNATURE", allInOne: "ALL-IN-ONE", none: "구축 필요 없음" };
window.ENG_PLAN = { none: "정기관리 없음", basic: "BASIC", growth: "GROWTH", premium: "PREMIUM" };
