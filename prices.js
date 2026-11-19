/* 로컬핀 마케팅 상품·가격 단일 기준 (2026-11-16 리뉴얼 기준, 모두 부가세 별도)
   - HTML의 data-p="키" 요소는 이 값으로 다시 채워집니다. HTML에 적힌 글자는 JS가 꺼져 있을 때 보이는 같은 값입니다.
   - 가격을 바꿀 때는 이 파일을 고친 뒤 `node 가격점검.mjs`로 모든 페이지의 글자가 같은지 확인하세요. */
window.LP_PRICES = {
  // 처음 한 번: 브랜드 구축 (1회)
  placeBasic: { name: "플레이스 BASIC",              won: 49,   unit: "1회" },
  place:      { name: "플레이스 BRANDING",           won: 99,   unit: "1회" },
  blogBuild:  { name: "블로그 초기 구축",            won: 39,   unit: "1회" },
  home:       { name: "홈페이지 제작",               won: 149,  unit: "1회", from: true },
  // 구축 패키지 (sum = 따로 할 때 합계)
  placeBlog:  { name: "플레이스 BRANDING + 블로그",  won: 119,  unit: "1회", sum: 138 },
  webBasic:   { name: "홈페이지 + 플레이스 BASIC",   won: 179,  unit: "1회", from: true, sum: 198 },
  placeHome:  { name: "SIGNATURE (홈페이지 + 플레이스 BRANDING)", won: 199, unit: "1회", from: true, sum: 248 },
  allInOne:   { name: "ALL-IN-ONE (홈페이지 + 플레이스 BRANDING + 블로그)", won: 249, unit: "1회", from: true, sum: 287 },
  // 매달: 정기관리
  basic:      { name: "BASIC",   won: 14.9, unit: "월", minMonths: 1 },
  growth:     { name: "GROWTH",  won: 29.9, unit: "월", minMonths: 3 },
  premium:    { name: "PREMIUM", won: 59.9, unit: "월", minMonths: 3 },
  // 단품 월 관리·결합 (블로그 단품 = 콘텐츠 제작 중심, 2026-11-16 확정)
  homeCare:   { name: "홈페이지 유지관리", won: 9.9,  unit: "월", minMonths: 1 },
  blog4:      { name: "블로그 월 4건",     won: 22,   unit: "월", minMonths: 3 },
  blog8:      { name: "블로그 월 8건",     won: 34.9, unit: "월", minMonths: 3 },
  blog12:     { name: "블로그 월 12건",    won: 49.9, unit: "월", minMonths: 3 },
  growthHome: { name: "GROWTH + 홈페이지 유지관리", won: 34.9, unit: "월", minMonths: 3, sum: 39.8 }
};
window.LP_FREE = { placeBasicMonths: 1, placeMonths: 3, homeMonths: 1 };
window.lpWon = k => { const p = window.LP_PRICES[k]; return p.won + "만원" + (p.from ? "부터" : ""); };
window.lpSum = k => { const p = window.LP_PRICES[k]; return p.sum + "만원" + (p.from ? "부터" : ""); };
window.lpSave = k => { const p = window.LP_PRICES[k]; return Number((p.sum - p.won).toFixed(1)) + "만원"; };
document.querySelectorAll("[data-p]").forEach(el => { if (window.LP_PRICES[el.dataset.p]) el.textContent = window.lpWon(el.dataset.p); });
document.querySelectorAll("[data-sum]").forEach(el => { if (window.LP_PRICES[el.dataset.sum]?.sum) el.textContent = window.lpSum(el.dataset.sum); });
document.querySelectorAll("[data-save]").forEach(el => { if (window.LP_PRICES[el.dataset.save]?.sum) el.textContent = window.lpSave(el.dataset.save); });

/* 상품별 가치 환산 (2026-11-19 대표님 지시: "우리 가치는 이만큼인데, 이 가격에 해 드린다")
   - 각 작업을 따로 맡길 때의 가치를 로컬핀 기준으로 환산한 금액(원). '정가·원래 가격·할인'이라는 말은 쓰지 않습니다.
   - [data-value="키"] → "총 ○○원 상당의 가치" 한 줄, [data-value-stack="키"] → 항목별 "○○원 상당" 목록 + 합계 + 로컬핀 가격 */
window.LP_VALUE = {
  placeBasic: [["info", "운영시간·가격·위치 등 기본 정보 정비", 200000], ["doc", "기본 소개글 작성", 200000], ["img", "플레이스 이미지 2종 직접 제작", 160000], ["search", "기본 온라인 상태 진단", 100000], ["cal", "구축 후 1개월 기본 점검", 100000]],
  place: [["search", "AI 활용 지역·경쟁 환경 분석", 500000], ["chart", "그 지역 동종 업체 정보 비교", 200000], ["chat", "전문성·차별화 메시지 설계", 300000], ["doc", "소개글·서비스 정보 정비", 200000], ["img", "플레이스 이미지 5종 직접 제작", 400000], ["star", "로고 정리 또는 기본형 로고 1종", 500000], ["cal", "구축 후 3개월 기본 점검", 300000]],
  blogBuild: [["pen", "블로그 프로필·배너·메뉴 버튼 세팅", 300000], ["list", "카테고리 구성", 100000], ["search", "고객 질문·키워드 기획", 200000], ["doc", "초기 콘텐츠 2건 작성", 200000]],
  home: [["chat", "브랜드 메시지·신뢰 중심 기획", 500000], ["web", "반응형 원페이지 디자인·제작 (최대 8개 구간)", 1500000], ["search", "모바일 점검·상담 버튼 연결·검색엔진 설정", 300000], ["pen", "공개 전 통합 수정 2회", 200000], ["cal", "납품 후 1개월 보완", 200000]],
  basic: [["info", "플레이스 정보 점검 월 1회", 100000], ["doc", "플레이스 소식 월 1건", 100000], ["list", "간단한 관리 보고", 50000], ["search", "최초 기본 키워드 점검", 50000]],
  growth: [["info", "플레이스 정보 점검 월 2회·소식 월 2건", 200000], ["pen", "블로그 콘텐츠 월 3건", 300000], ["img", "브랜드 이미지 월 1건", 100000], ["search", "AI 활용 키워드 분석 월 1회", 100000], ["chat", "상담 연결 점검·개선 제안", 100000], ["chart", "월간 2쪽 PDF 브랜드 브리핑", 150000]],
  premium: [["info", "플레이스 정보 점검 월 4회·소식 월 4건", 400000], ["pen", "블로그 콘텐츠 월 6건", 600000], ["img", "브랜드 이미지 월 2건", 200000], ["chat", "상담 연결 점검·개선 제안 월 2건", 150000], ["search", "AI 활용 키워드 분석 월 1회", 100000], ["chart", "분기 경쟁업체 분석·전략 점검", 200000], ["list", "월간 PDF 브랜드 브리핑", 150000]]
};
window.LP_VALUE.placeBlog = [["star", "플레이스 BRANDING 전체", "place"], ["pen", "블로그 초기 구축 전체", "blogBuild"]];
window.LP_VALUE.webBasic = [["web", "홈페이지 제작 전체", "home"], ["info", "플레이스 BASIC 전체", "placeBasic"]];
window.LP_VALUE.placeHome = [["web", "홈페이지 제작 전체", "home"], ["star", "플레이스 BRANDING 전체", "place"]];
window.LP_VALUE.allInOne = [["web", "홈페이지 제작 전체", "home"], ["star", "플레이스 BRANDING 전체", "place"], ["pen", "블로그 초기 구축 전체", "blogBuild"]];
window.lpValueItems = k => (window.LP_VALUE[k] || []).map(([ic, name, v]) => [ic, name, typeof v === "string" ? window.lpValueItems(v).reduce((s, x) => s + x[2], 0) : v]);
window.lpValueTotal = k => window.lpValueItems(k).reduce((s, x) => s + x[2], 0);
(() => {
  const won = n => n.toLocaleString("ko-KR") + "원";
  const monthly = k => window.LP_PRICES[k].unit === "월";
  const I = { search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>', chart: '<path d="M5 20V11M12 20V5M19 20v-6"/>', chat: '<path d="M5 6h14v9H10l-4 3v-3H5z"/>', doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M10 12h5M10 16h5"/>', img: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m5 18 5-5 4 4 2-2 3 3"/>', star: '<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"/>', cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>', info: '<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8v.1"/>', pen: '<path d="M5 19l1-4L16 5l3 3L9 18z"/>', list: '<path d="M9 7h10M9 12h10M9 17h10M5 7h.1M5 12h.1M5 17h.1"/>', web: '<rect x="3" y="5" width="18" height="13" rx="2"/><path d="M3 9h18M9 21h6"/>' };
  const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[k] || I.info}</svg>`;
  document.querySelectorAll("[data-value]").forEach(el => {
    const k = el.dataset.value; if (!window.LP_VALUE[k]) return;
    el.innerHTML = `${el.dataset.valueLabel ? el.dataset.valueLabel + " " : ""}${monthly(k) ? "매달 " : "총 "}<b>${won(window.lpValueTotal(k))}</b> 상당의 가치`;
  });
  document.querySelectorAll("[data-value-stack]").forEach(el => {
    const k = el.dataset.valueStack; if (!window.LP_VALUE[k]) return;
    const p = window.LP_PRICES[k], m = monthly(k), name = el.dataset.name || p.name;
    el.innerHTML = `<p class="vk-kicker">${name}${m ? " 한 달" : ""}에 들어 있는 것</p>
<ul class="vk-list">${window.lpValueItems(k).map(([ic, n, v]) => `<li><i class="vk-ic">${svg(ic)}</i><span class="vk-name">${n}<b>${won(v)} 상당</b></span></li>`).join("")}</ul>
<div class="vk-sum"><span>모두 합치면</span><b>${m ? "월 " : ""}${won(window.lpValueTotal(k))} 상당</b></div>
<div class="vk-price"><span>로컬핀에서는</span><b>${m ? "월 " : ""}${window.lpWon(k)}</b><small>${m ? (p.minMonths > 1 ? "최소 " + p.minMonths + "개월 · " : "") : "1회 · "}부가세 별도</small></div>
<p class="vk-note">'상당' 금액은 각 작업을 따로 맡길 때의 가치를 로컬핀 기준으로 환산한 것입니다.</p>`;
  });
})();
