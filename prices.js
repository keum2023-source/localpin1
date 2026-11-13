/* 로컬핀 마케팅 상품·가격 단일 기준 (2026-11-12 확정, 모두 부가세 별도)
   - HTML의 data-p="키" 요소는 이 값으로 다시 채워집니다. HTML에 적힌 글자는 JS가 꺼져 있을 때 보이는 같은 값입니다.
   - 가격을 바꿀 때는 이 파일을 고친 뒤 `node 가격점검.mjs`로 모든 페이지의 글자가 같은지 확인하세요. */
window.LP_PRICES = {
  // 처음 한 번: 브랜드 구축 (1회)
  place:      { name: "네이버 플레이스 브랜드 구축", won: 119,  unit: "1회" },
  blogBuild:  { name: "블로그 심화 초기 구축",       won: 49,   unit: "1회" },
  placeBlog:  { name: "플레이스+블로그 통합 구축",   won: 149,  unit: "1회", sum: 168 },
  home:       { name: "한 페이지 홈페이지 제작",     won: 149,  unit: "1회", from: true },
  placeHome:  { name: "플레이스+홈페이지 브랜드 기본", won: 228, unit: "1회", from: true, sum: 268 },
  // 대표 상품: 세 채널을 한 번의 인터뷰로. 두 묶음 할인(19+40)을 그대로 더한 값 (따로 317만원부터)
  allInOne:   { name: "올인원 브랜드 구축", won: 259, unit: "1회", from: true, sum: 317 },
  // 매달: 통합 운영
  basic:      { name: "BASIC",   won: 19.9, unit: "월", minMonths: 1 },
  growth:     { name: "GROWTH",  won: 39.9, unit: "월", minMonths: 3 },
  premium:    { name: "PREMIUM", won: 79.9, unit: "월", minMonths: 3 },
  // 단품 월 관리·결합
  homeCare:   { name: "홈페이지 유지관리", won: 9.9,  unit: "월", minMonths: 1 },
  blog4:      { name: "블로그 월 4건",     won: 22,   unit: "월", minMonths: 3 },
  blog8:      { name: "블로그 월 8건",     won: 34.9, unit: "월", minMonths: 3 },
  blog12:     { name: "블로그 월 12건",    won: 49.9, unit: "월", minMonths: 3 },
  growthHome: { name: "GROWTH+홈페이지 유지관리", won: 44.9, unit: "월", minMonths: 3, sum: 49.8 }
};
window.LP_FREE = { placeMonths: 3, homeMonths: 1 };
window.lpWon = k => { const p = window.LP_PRICES[k]; return p.won + "만원" + (p.from ? "부터" : ""); };
window.lpSum = k => { const p = window.LP_PRICES[k]; return p.sum + "만원" + (p.from ? "부터" : ""); };
window.lpSave = k => { const p = window.LP_PRICES[k]; return Number((p.sum - p.won).toFixed(1)) + "만원"; };
document.querySelectorAll("[data-p]").forEach(el => { if (window.LP_PRICES[el.dataset.p]) el.textContent = window.lpWon(el.dataset.p); });
document.querySelectorAll("[data-sum]").forEach(el => { if (window.LP_PRICES[el.dataset.sum]?.sum) el.textContent = window.lpSum(el.dataset.sum); });
document.querySelectorAll("[data-save]").forEach(el => { if (window.LP_PRICES[el.dataset.save]?.sum) el.textContent = window.lpSave(el.dataset.save); });
