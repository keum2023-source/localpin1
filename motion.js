/* 스크롤 등장 효과: 화면에 들어올 때 살짝(14px) 떠오르며 나타납니다.
   - 첫 화면(맨 위 섹션)과 고정 요소(요약 바·점수판·오른쪽 패널)는 건드리지 않습니다.
   - '동작 줄이기'를 켠 기기, 오래된 브라우저, 스크립트가 꺼진 경우에는 모든 내용이 그대로 보입니다. */
(() => {
  if (!("IntersectionObserver" in window)) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const main = document.querySelector("main");
  if (!main) return;

  // 카드가 나란히 놓이는 묶음: 묶음 대신 안의 카드를 하나씩 조금씩 늦게 띄웁니다.
  const GROUPS = [".offer-grid", ".ap-grid", ".plans", ".tiers", ".grid", ".bs-grid", ".pf-work-grid", ".why-list",
    ".do-grid", ".value-grid", ".blog-grid", ".hp-grid", ".site-cards", ".fit-grid", ".output-board", ".month-track",
    ".journey", ".difference-board", ".faq", ".nlist", ".compare-scope", ".flow-line"].join(",");
  const SKIP = ".calc, .score, .detail-rail, .np-track, .np-slider, .d-hero, .hero, [hidden]";

  const sections = [...main.querySelectorAll(":scope > section")].slice(1); // 첫 화면 제외
  const targets = new Set();
  for (const sec of sections) {
    const wrap = sec.querySelector(":scope > .wrap") || sec;
    for (const block of wrap.children) {
      if (block.matches(SKIP) || block.querySelector(".calc, .score")) continue;
      const groups = block.matches(GROUPS) ? [block] : [...block.querySelectorAll(GROUPS)];
      if (groups.length) {
        groups.forEach(g => [...g.children].forEach((c, i) => {
          if (c.matches(SKIP)) return;
          c.style.setProperty("--rv-delay", Math.min(i, 4) * 70 + "ms");
          targets.add(c);
        }));
        if (!block.matches(GROUPS)) {
          // 묶음 바깥의 제목·설명은 따로 띄움
          [...block.children].filter(c => !c.matches(GROUPS) && !c.querySelector(GROUPS) && !c.matches(SKIP)).forEach(c => targets.add(c));
        }
      } else targets.add(block);
    }
  }

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("rv-in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });

  const vh = innerHeight;
  targets.forEach(el => {
    // 처음부터 화면 안에 있는 것(예: #contact 로 바로 들어온 경우)은 효과 없이 바로 보이게
    if (el.getBoundingClientRect().top < vh * 0.9) return;
    // 접힌 칸(details) 안이나 숨겨진 단계 안의 내용은 펼칠 때 바로 보여야 하므로 제외
    const fold = el.parentElement && el.parentElement.closest("details");
    if (fold || el.closest("[hidden]")) return;
    el.classList.add("rv");
    io.observe(el);
  });
})();
