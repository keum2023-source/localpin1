/* 서비스 상세 페이지 공용 스크립트: 운영자 링크 반영 + 업종 탭 전환.
   PLACE_URL · BLOG_URL 은 메인 페이지(index) CONFIG 와 같은 값으로 맞춰 주세요. */
const LINKS = {
  PLACE_URL: "https://naver.me/GmbJ6hFc",
  BLOG_URL: "https://blog.naver.com/saimdang_suwoncare"
};

const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// 메인에서 '자세히 보기'로 들어오면 이전 스크롤 위치가 남지 않고 항상 맨 위부터 보이게 합니다.
// 주소 끝에 #care 처럼 페이지 안의 위치가 붙어 있으면 그 위치로 갑니다.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function toTop() {
  const id = location.hash.slice(1);
  if (id && document.getElementById(id)) return;
  window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelector("header.top")?.scrollIntoView({ block: "start", behavior: "instant" });
}
toTop();
addEventListener("load", toTop);
addEventListener("pageshow", e => { if (e.persisted) toTop(); });

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

(() => {
  // PC 화면 옆 무료 진단 배너: 첫 화면을 지나면 나타나고, 신청서가 보이면 숨깁니다.
  const sc = document.querySelector(".side-cta");
  if (!sc) return;
  let atForm = false;
  const upd = () => sc.classList.toggle("on", scrollY > 500 && !atForm);
  addEventListener("scroll", upd, { passive: true });
  const form = document.getElementById("contact");
  if (form && "IntersectionObserver" in window) new IntersectionObserver(([e]) => { atForm = e.isIntersecting; upd(); }, { threshold: 0.05 }).observe(form);
  upd();
})();
