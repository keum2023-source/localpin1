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
