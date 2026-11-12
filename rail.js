/* 상세페이지 오른쪽 상품 선택 패널.
   상품 가격은 prices.js에서 읽고, 신청 버튼은 메인 상담서에 선택 구성을 전달합니다. */
(() => {
  const kind = document.body.dataset.rail;
  if (!kind || !window.LP_PRICES || !window.lpWon) return;

  const plans = {
    place: [
      {
        label: "플레이스", name: "네이버 플레이스 브랜드 구축", key: "place", unit: "1회",
        intro: "검색 결과 첫 화면에 원장님 이야기와 문의 방법을 담습니다.",
        items: ["원장님 인터뷰·소개 문장", "맞춤 대표 이미지·로고(필요 시)", "가격표·기본 정보·톡톡 연결", "3개월 무료 안착 점검"],
        note: "블로그 글과 홈페이지 제작은 포함되지 않습니다.", pick: "place",
      },
      {
        label: "통합 구축", name: "플레이스+블로그 통합 구축", key: "placeBlog", unit: "1회",
        intro: "두 채널의 첫인상을 한 번의 인터뷰로 같은 방향에 맞춥니다.",
        items: ["플레이스 브랜드 구축 전체", "블로그 대문·프로필·카테고리", "키워드·주제 설계·핵심 글 2건", "플레이스 3개월 안착 점검"],
        note: "매달 글을 발행하는 GROWTH는 별도 선택입니다.", pick: "place+blog",
      },
      {
        label: "브랜드 기본", name: "플레이스+홈페이지 브랜드 기본", key: "placeHome", unit: "1회",
        intro: "검색 첫 화면과 상담 신청 페이지를 함께 구축합니다.",
        items: ["플레이스 브랜드 구축 전체", "한 페이지 홈페이지 맞춤 제작", "상담 신청 기능·기본 검색 등록", "플레이스 3개월 점검·홈페이지 1개월 보완"],
        note: "홈페이지 추가 페이지·기능과 도메인·서버 실비는 별도입니다.", pick: "place+home",
      }
    ],
    blog: [
      {
        label: "월 4건", name: "블로그 단품 운영 · 월 4건", key: "blog4", unit: "월",
        intro: "일주일에 한 편씩 검색 질문에 답하는 글을 쌓습니다.",
        items: ["월 4건 주제·원고·발행", "글마다 본문 이미지 제작", "프로필·카테고리 기본 정리", "매달 방문자·검색어 기본 요약"],
        note: "최소 3개월. 플레이스 관리는 포함되지 않습니다.", pick: "blog",
      },
      {
        label: "월 8건", name: "블로그 단품 운영 · 월 8건", key: "blog8", unit: "월",
        intro: "정보성 글과 실제 자료를 바탕으로 한 글을 더 촘촘히 발행합니다.",
        items: ["월 8건 주제·원고·발행", "글마다 본문 이미지 제작", "프로필·카테고리 기본 정리", "매달 방문자·검색어 기본 요약"],
        note: "최소 3개월. 플레이스 관리는 포함되지 않습니다.", pick: "blog",
      },
      {
        label: "월 12건", name: "블로그 단품 운영 · 월 12건", key: "blog12", unit: "월",
        intro: "다룰 질문이 많은 업종에서 주제 범위를 넓혀 발행합니다.",
        items: ["월 12건 주제·원고·발행", "글마다 본문 이미지 제작", "프로필·카테고리 기본 정리", "매달 방문자·검색어 기본 요약"],
        note: "최소 3개월. 플레이스 관리는 포함되지 않습니다.", pick: "blog",
      }
    ],
    home: [
      {
        label: "홈페이지만", name: "한 페이지 홈페이지 제작", key: "home", unit: "1회",
        intro: "원장 소개부터 상담 신청까지 한 페이지에 담습니다.",
        items: ["원장님 인터뷰·첫 화면 문구", "모바일 맞춤 한 페이지 제작", "상담 신청·신청 관리 기능", "기본 검색 등록·1개월 납품 보완"],
        note: "추가 페이지·기능과 도메인·서버 실비는 별도입니다.", pick: "home",
      },
      {
        label: "플레이스 결합", name: "플레이스+홈페이지 브랜드 기본", key: "placeHome", unit: "1회",
        intro: "플레이스 첫 사진부터 홈페이지 상담 동선까지 맞춥니다.",
        items: ["플레이스 브랜드 구축 전체", "한 페이지 홈페이지 맞춤 제작", "상담 신청 기능·기본 검색 등록", "플레이스 3개월 점검·홈페이지 1개월 보완"],
        note: "추가 페이지·기능과 도메인·서버 실비는 별도입니다.", pick: "place+home",
      }
    ],
    growth: [
      {
        label: "BASIC", name: "BASIC · 플레이스 월 관리", key: "basic", unit: "월",
        intro: "플레이스 정보를 점검하고 새 소식을 가볍게 이어갑니다.",
        items: ["플레이스 정보 점검 월 1회", "플레이스 소식 월 1건", "간단한 완료 요약"],
        note: "1개월부터. 블로그 글과 홈페이지 관리는 포함되지 않습니다.", pick: "place",
      },
      {
        label: "GROWTH", name: "GROWTH · 플레이스+블로그 운영", key: "growth", unit: "월",
        intro: "검색 질문과 최신 소식을 두 채널에서 함께 운영합니다.",
        items: ["블로그 글 월 4건", "플레이스 점검 2회·소식 2건", "별도 홍보 이미지 월 2건", "월 키워드 분석·1장 보고"],
        note: "최소 3개월. 분기 경쟁 분석·전략 상담 포함. 홈페이지 관리는 별도입니다.", pick: "place+blog",
      },
      {
        label: "PREMIUM", name: "PREMIUM · 더 자주 운영", key: "premium", unit: "월",
        intro: "콘텐츠와 플레이스 소식을 더 자주 발행합니다.",
        items: ["블로그 글 월 8건", "플레이스 점검 4회·소식 4건", "별도 홍보 이미지 월 4건", "월 경쟁 분석·상담·보고"],
        note: "최소 3개월. 홈페이지 관리는 포함되지 않습니다.", pick: "place+blog",
      }
    ]
  };

  const list = plans[kind];
  if (!list) return;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);

  const rail = document.createElement("aside");
  rail.className = "detail-rail";
  rail.setAttribute("aria-label", "상품 구성 선택");
  rail.innerHTML = `
    <div class="rail-head"><span>지금 보고 있는 서비스</span><b>구성을 선택해 보세요</b></div>
    <div class="rail-tabs" role="tablist" aria-label="상품 구성">
      ${list.map((p, i) => `<button type="button" role="tab" id="rail-tab-${i}" aria-controls="rail-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">${escapeHtml(p.label)}</button>`).join("")}
    </div>
    <div class="rail-panel" id="rail-panel" role="tabpanel" aria-labelledby="rail-tab-0"></div>
    <div class="rail-actions"><a class="rail-secondary" href="./#contact">무료 진단 문의하기</a><a class="rail-primary" href="./#contact">제작 신청하기</a></div>
    <div class="rail-disclaimer"><p>선택한 구성이 신청서에 담깁니다.</p><p>신청만으로는 계약·결제되지 않습니다.</p><p>최종 범위와 비용은 무료 진단 후 서면으로 알려드립니다.</p></div>
  `;
  document.querySelector("main")?.append(rail);
  const tabs = [...rail.querySelectorAll('[role="tab"]')];
  const panel = rail.querySelector(".rail-panel");
  const primary = rail.querySelector(".rail-primary");
  const secondary = rail.querySelector(".rail-secondary");

  function select(index, moveFocus = false) {
    const p = list[index];
    if (!p) return;
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    if (moveFocus) tabs[index].focus();
    panel.setAttribute("aria-labelledby", `rail-tab-${index}`);
    const mm = window.LP_PRICES[p.key].minMonths;
    const term = p.unit === "월" ? (mm === 1 ? "1개월부터" : `최소 ${mm}개월`) : "1회";
    panel.innerHTML = `
      <span class="rail-kicker">${escapeHtml(p.unit === "월" ? "매달 운영" : "처음 한 번 구축")}</span>
      <h2>${escapeHtml(p.name)}</h2>
      <p class="rail-price"><strong>${p.unit === "월" ? "월 " : ""}${escapeHtml(window.lpWon(p.key))}</strong><small>${escapeHtml(term)} · 부가세 별도</small></p>
      <p class="rail-intro">${escapeHtml(p.intro)}</p>
      <ul class="rail-list">${p.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <p class="rail-note">${escapeHtml(p.note)}</p>
    `;
    const href = `./?pick=${encodeURIComponent(p.pick)}#contact`;
    primary.href = href;
    secondary.href = href;
    const minMonths = window.LP_PRICES[p.key].minMonths;
    const selected = `${p.name} · ${p.unit === "월" ? "월 " : ""}${window.lpWon(p.key)}
      ${minMonths ? (minMonths === 1 ? " · 1개월부터" : ` · 최소 ${minMonths}개월`) : " · 1회"}${kind === "growth" ? " · 초기 구축 필요 여부 무료 진단" : ""}`.replace(/\s+/g, " ").trim();
    primary.dataset.offer = `[제작 신청] ${selected}`;
    secondary.dataset.offer = `[무료 진단 문의] ${selected}`;
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", e => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === "Home" ? 0 : e.key === "End" ? list.length - 1
        : (i + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length;
      select(next, true);
    });
  });
  select(kind === "growth" ? 1 : 0);
  document.body.classList.add("rail-ready");

  const footer = document.querySelector("footer");
  if (footer && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => rail.classList.toggle("is-near-footer", entry.isIntersecting),
      { threshold: 0 }).observe(footer);
  }
})();
