/* 서비스 상세 페이지 공용 스크립트: 운영자 링크 반영 + 업종 탭 전환.
   PLACE_URL · BLOG_URL 은 메인 페이지(index) CONFIG 와 같은 값으로 맞춰 주세요. */
const LINKS = {
  PLACE_URL: "https://naver.me/GmbJ6hFc",
  BLOG_URL: "https://blog.naver.com/saimdang_suwoncare"
};

const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// 상품 카드에서 고른 구성을 메인 상담 신청서까지 전달합니다.
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-offer]');
  if (!a) return;
  try { sessionStorage.setItem('lp_guide_plan', a.dataset.offer); } catch (err) {}
});

// 메인에서 '자세히 보기'로 들어오면 이전 스크롤 위치가 남지 않고 항상 맨 위부터 보이게 합니다.
// 주소 끝에 #care 처럼 페이지 안의 위치가 붙어 있으면 그 위치로 갑니다.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function toTop() {
  const id = location.hash.slice(1);
  const target = id && document.getElementById(id);
  if (target) { if (target.tagName === 'DETAILS') target.open = true; return; }
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

(() => {
  // 세팅 후 플레이스 이미지 슬라이드: 손가락으로 넘길 수 있고, 화면에 보일 때만 3초마다 다음 장으로 넘어갑니다.
  document.querySelectorAll(".np-slider").forEach(sl => {
    const track = sl.querySelector(".np-track");
    const slides = [...track.children];
    const dots = [...sl.querySelectorAll(".np-dots i")];
    if (slides.length < 2) return;
    let idx = 0, paused = false, visible = false;
    const step = () => slides[1].offsetLeft - slides[0].offsetLeft;
    const mark = () => dots.forEach((d, k) => d.classList.toggle("on", k === idx));
    const go = i => { idx = (i + slides.length) % slides.length; mark(); track.scrollTo({ left: idx * step(), behavior: "smooth" }); };
    track.addEventListener("scroll", () => {
      idx = Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
      mark();
    }, { passive: true });
    ["pointerdown", "touchstart", "focusin"].forEach(ev => track.addEventListener(ev, () => { paused = true; }, { passive: true }));
    track.addEventListener("mouseenter", () => { paused = true; });
    track.addEventListener("mouseleave", () => { paused = false; });
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.4 }).observe(track);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(() => { if (visible && !paused && !document.hidden) go(idx + 1); }, 3000);
  });
})();
