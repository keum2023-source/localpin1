/* 서비스 상세 페이지 공용 스크립트: 운영자 링크 반영 + 업종 탭 전환.
   PLACE_URL · BLOG_URL 은 메인 페이지(index) CONFIG 와 같은 값으로 맞춰 주세요. */
const LINKS = {
  PLACE_URL: "https://naver.me/GmbJ6hFc",
  BLOG_URL: "https://blog.naver.com/saimdang_suwoncare"
};

const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$$(".cfg-place").forEach(el => { if (LINKS.PLACE_URL) el.href = LINKS.PLACE_URL; else el.hidden = true; });
$$(".cfg-blog").forEach(el => { if (LINKS.BLOG_URL) el.href = LINKS.BLOG_URL; else el.hidden = true; });

// 업종 탭: 같은 페이지의 모든 탭·예시를 함께 바꿉니다. 링크 끝에 #postpartum, #hospital 을 붙이면 그 업종 화면으로 열립니다.
function setInd(ind) {
  $$(".ind-tabs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.ind === ind));
  $$("[data-for]").forEach(el => el.hidden = el.dataset.for !== ind);
}
$$(".ind-tabs button").forEach(b => b.addEventListener("click", () => setInd(b.dataset.ind)));
const startInd = location.hash.slice(1);
setInd($$(".ind-tabs button").some(b => b.dataset.ind === startInd) ? startInd : "academy");
