/* 상세페이지 오른쪽 상품 선택 패널.
   상품 가격은 prices.js에서 읽고, 신청 버튼은 메인 신청서에 선택 구성을 전달합니다.
   상품 구조: 구축 placeBasic·place(BRANDING)·blogBuild·home, 패키지 placeBlog·webBasic·placeHome(SIGNATURE)·allInOne, 정기관리 basic·growth·premium·growthHome. */
(() => {
  const kind = document.body.dataset.rail;
  if (!kind || !window.LP_PRICES || !window.lpWon) return;

  const W = k => window.lpWon(k);
  const placeBasic = {
    label: "BASIC", name: "플레이스 BASIC", key: "placeBasic", unit: "1회",
    intro: "플레이스 기본 정보부터 깔끔하게 정비합니다.",
    items: ["기본 정보 정비·기본 소개글", "이미지 2종 (디자인별 기본 수정 1회)", "기본 온라인 상태 진단·상담 연결 점검", "구축 후 1개월 기본 점검·경미한 변경 1건"],
    note: "새 로고는 만들지 않고 기존 로고를 활용합니다. 지역·경쟁 분석과 차별화 메시지 설계는 BRANDING에 들어갑니다.", pick: "placeBasic",
  };
  const placeBranding = {
    label: "BRANDING", name: "플레이스 BRANDING", key: "place", unit: "1회",
    intro: "지역 검색에서 전문성과 차별점이 보이도록 플레이스를 설계합니다.",
    items: ["AI 활용 지역·경쟁 환경 분석 (그 지역 동종 업체 정보 비교)", "전문성·차별화 메시지 설계", "이미지 5종 (디자인별 기본 수정 1회)", "기존 로고 간단 정리, 없으면 기본형 로고 1종", "소개글·서비스 정보 정비·상담 연결 점검", "구축 후 3개월 기본 점검·경미한 변경 월 1건"],
    note: "전문 로고 개발·여러 시안·상표 검토는 별도 견적입니다. 블로그 글과 홈페이지 제작은 포함되지 않습니다.", pick: "place",
  };
  const placeBlog = {
    label: "+블로그", name: "플레이스 BRANDING + 블로그", key: "placeBlog", unit: "1회",
    intro: "검색 첫인상과 블로그 운영 기반을 같은 방향으로 함께 세웁니다.",
    items: ["플레이스 BRANDING 전체", "블로그 프로필·브랜드 기본 세팅·카테고리", "고객 질문·키워드 기획·초기 콘텐츠 2건", "플레이스 3개월 기본 점검"],
    note: "매달 글을 발행하는 GROWTH는 별도 선택입니다.", pick: "place+blog",
  };
  const webBasic = {
    label: "+BASIC", name: "홈페이지 + 플레이스 BASIC", key: "webBasic", unit: "1회",
    intro: "홈페이지를 만들면서 플레이스 기본 정보도 함께 정리합니다.",
    items: ["반응형 원페이지 홈페이지", "플레이스 BASIC 전체 (기본 정보·소개글·이미지 2종)", "상담 버튼 연결·기본 검색엔진 설정", "플레이스 1개월 점검·홈페이지 1개월 보완"],
    note: "플레이스 전문 브랜딩까지 원하시면 SIGNATURE입니다. 추가 기능은 별도 견적, 도메인·서버 실비 별도입니다.", pick: "placeBasic+home",
  };
  const signature = {
    label: "SIGNATURE", name: "SIGNATURE · 홈페이지 + 플레이스 BRANDING", key: "placeHome", unit: "1회",
    intro: "발견되는 플레이스와 신뢰를 확인하는 홈페이지를 한 메시지로 만듭니다.",
    items: ["플레이스 BRANDING 전체", "반응형 원페이지 홈페이지 (기본 최대 8개 섹션)", "상담 버튼 연결·기본 검색엔진 설정", "플레이스 3개월 점검·홈페이지 1개월 보완"],
    note: "로컬핀 대표 패키지입니다. 로고는 BRANDING 기준, 홈페이지 통합 수정 2회, 자료 확정 후 약 2~3주(자료·피드백에 따라 달라질 수 있음). 추가 기능은 별도 견적, 도메인·서버 실비 별도입니다.", pick: "place+home",
  };
  const allInOne = {
    label: "올인원", name: "ALL-IN-ONE · 홈페이지 + 플레이스 BRANDING + 블로그", key: "allInOne", unit: "1회",
    intro: "SIGNATURE에 블로그 운영 기반을 더해 세 채널을 같은 메시지로 만듭니다.",
    items: ["플레이스 BRANDING 전체", "반응형 원페이지 홈페이지", "블로그 초기 구축 (초기 콘텐츠 2건)", "플레이스 3개월 점검·홈페이지 1개월 보완"],
    note: `로고는 BRANDING 기준(기존 로고 간단 정리 또는 기본형 1종)입니다. 매달 관리(GROWTH+홈페이지 유지관리 월 ${W("growthHome")})는 별도입니다.`, pick: "place+blog+home",
  };
  const blogMonthly = n => ({
    label: `월 ${n}건`, name: `블로그 단품 운영 · 월 ${n}건`, key: `blog${n}`, unit: "월",
    intro: n === 4 ? "일주일에 한 편씩 검색 질문에 답하는 글을 쌓습니다." : n === 8 ? "정보성 글과 실제 자료를 바탕으로 한 글을 더 촘촘히 발행합니다." : "다룰 질문이 많은 업종에서 주제 범위를 넓혀 발행합니다.",
    items: [`월 ${n}건 주제·원고·발행`, "글마다 본문 이미지 제작", "운영에 필요한 블로그 기본 상태 확인", "매달 방문자·검색어 기본 요약"],
    note: "콘텐츠 제작 중심 상품입니다. 최소 3개월, 이후 1개월씩. 플레이스 관리와 신규 구축·전체 재설계(초기 구축)는 포함되지 않습니다.", pick: "",
  });
  const plans = {
    place: [placeBranding, placeBlog, signature, allInOne, placeBasic],
    blog: [
      {
        label: "초기 구축", name: "블로그 초기 구축", key: "blogBuild", unit: "1회",
        intro: "블로그 운영의 기본 틀을 처음 한 번 세웁니다.",
        items: ["프로필·브랜드 기본 세팅", "카테고리 구성", "고객 질문·키워드 기획", "초기 콘텐츠 2건"],
        note: "매달 글은 GROWTH(블로그 콘텐츠 월 3건 포함) 또는 블로그 단품으로 이어갈 수 있습니다.", pick: "blog",
      },
      blogMonthly(4), blogMonthly(8), blogMonthly(12)
    ],
    home: [
      {
        label: "홈페이지만", name: "홈페이지 제작", key: "home", unit: "1회",
        intro: "원장님의 전문성과 운영 방식을 확인하고 상담까지 이어지는 홈페이지를 만듭니다.",
        items: ["브랜드 메시지·신뢰 중심 기획", "반응형 원페이지 (기본 최대 8개 섹션)", "모바일 점검·상담 버튼 연결·기본 검색엔진 설정", "공개 전 통합 수정 2회", "납품 후 1개월 보완·경미한 변경 총 2건"],
        note: "자료 확정 후 약 10영업일이며 자료·피드백 상황에 따라 달라질 수 있습니다. 추가 기능은 별도 견적, 도메인·서버 실비 별도입니다.", pick: "home",
      },
      webBasic, signature, allInOne
    ],
    growth: [
      {
        label: "BASIC", name: "BASIC · 플레이스 정기관리", key: "basic", unit: "월",
        intro: "플레이스 정보를 점검하고 새 소식을 가볍게 이어갑니다.",
        items: ["플레이스 정보 점검 월 1회", "플레이스 소식 월 1건", "간단한 관리 보고", "최초 기본 키워드 점검"],
        note: "1개월 단위. 블로그 글과 홈페이지 관리는 포함되지 않습니다.", pick: "basic",
      },
      {
        label: "GROWTH", name: "GROWTH · 플레이스+블로그 정기관리", key: "growth", unit: "월",
        intro: "AI가 정리한 분석을 로컬핀이 검토해, 두 채널을 매달 함께 관리하는 통합 브랜드 관리입니다.",
        items: ["플레이스 정보 점검 월 2회·소식 월 2건", "블로그 콘텐츠 월 3건", "브랜드 이미지 월 1건", "AI 활용 키워드 분석 월 1회", "상담 연결 점검 월 1회·개선 제안 월 1건", "월간 2쪽 PDF 브랜드 브리핑"],
        note: "최소 3개월, 이후 1개월씩. 홈페이지 관리는 별도입니다.", pick: "growth",
      },
      {
        label: "PREMIUM", name: "PREMIUM · 더 자주 관리", key: "premium", unit: "월",
        intro: "GROWTH의 기본 점검과 상담 연결 점검을 포함해, 더 자주 발행하고 분기마다 전략을 점검합니다.",
        items: ["플레이스 정보 점검 월 4회·소식 월 4건", "블로그 콘텐츠 월 6건", "브랜드 이미지 월 2건", "상담 연결 점검 월 1회·개선 제안 월 2건", "AI 활용 키워드 분석 월 1회", "경쟁업체 분석·전략 점검 각 분기 1회", "월간 PDF 브랜드 브리핑"],
        note: "최소 3개월, 이후 1개월씩. 홈페이지 관리는 포함되지 않습니다.", pick: "premium",
      },
      {
        label: "+유지관리", name: "GROWTH + 홈페이지 유지관리", key: "growthHome", unit: "월",
        intro: "정기관리와 홈페이지 관리를 함께 맡깁니다.",
        items: ["GROWTH 월간 수행 항목 전부", "월 1회 접속·상담 신청 테스트", "도메인·보안 인증 만료일 확인과 갱신 안내", "기존 글·이미지의 경미한 수정 월 3건"],
        note: "최소 3개월, 이후 1개월씩. 도메인·서버 비용은 실비 별도입니다.", pick: "growth",
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
    <div class="rail-tabs${list.length > 4 ? " rn-growth-railtabs" : ""}" role="tablist" aria-label="상품 구성">
      ${list.map((p, i) => `<button type="button" role="tab" id="rail-tab-${i}" aria-controls="rail-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">${escapeHtml(p.label)}</button>`).join("")}
    </div>
    <div class="rail-panel" id="rail-panel" role="tabpanel" aria-labelledby="rail-tab-0"></div>
    <div class="rail-actions"><a class="rail-secondary" href="./#contact">무료 브랜드 진단 신청</a><a class="rail-primary" href="./#contact">제작 신청하기</a></div>
    <div class="rail-disclaimer"><p>선택한 구성이 신청서에 담깁니다.</p><p>신청만으로는 계약·결제되지 않습니다.</p><p>최종 범위와 비용은 무료 브랜드 진단 후 서면으로 알려드립니다.</p></div>
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
    const term = p.unit === "월" ? (mm === 1 ? "1개월 단위" : `최소 ${mm}개월`) : "1회";
    const price = window.LP_PRICES[p.key];
    const mo = p.unit === "월" ? "월 " : "";
    const saving = price.sum ? `<p class="rail-saving"><span>각각 ${mo}<s>${escapeHtml(window.lpSum(p.key))}</s> → 함께 ${mo}${escapeHtml(window.lpWon(p.key))}</span><strong>${p.unit === "월" ? "매월 " : price.from ? "기본 구성 기준 " : ""}${escapeHtml(window.lpSave(p.key))} 절약</strong></p>` : "";
    panel.innerHTML = `
      <span class="rail-kicker">${escapeHtml(p.unit === "월" ? "매달 정기관리" : "처음 한 번 구축")}</span>
      <h2>${escapeHtml(p.name)}</h2>
      <p class="rail-price"><strong>${p.unit === "월" ? "월 " : ""}${escapeHtml(window.lpWon(p.key))}</strong><small>${escapeHtml(term)} · 부가세 별도</small></p>
      ${saving}
      <p class="rail-intro">${escapeHtml(p.intro)}</p>
      <ul class="rail-list">${p.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <p class="rail-note">${escapeHtml(p.note)}</p>
    `;
    const href = p.pick ? `./?pick=${encodeURIComponent(p.pick)}#contact` : "./#contact"; // 월 관리만 고른 경우 구축 카드는 고르지 않음
    primary.href = href;
    primary.textContent = p.unit === "월" ? "관리 신청하기" : "제작 신청하기";
    secondary.href = href;
    const minMonths = window.LP_PRICES[p.key].minMonths;
    const selected = `${p.name} · ${p.unit === "월" ? "월 " : ""}${window.lpWon(p.key)}
      ${minMonths ? (minMonths === 1 ? " · 1개월 단위" : ` · 최소 ${minMonths}개월`) : " · 1회"}${kind === "growth" ? " · 초기 구축 필요 여부 무료 브랜드 진단" : ""}`.replace(/\s+/g, " ").trim();
    primary.dataset.offer = `[${p.unit === "월" ? "관리 신청" : "제작 신청"}] ${selected}`;
    secondary.dataset.offer = `[무료 브랜드 진단] ${selected}`;
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
  select(kind === "growth" || kind === "place" ? 1 : 0); // 플레이스는 BRANDING, 정기관리는 GROWTH를 먼저 보여 줍니다.
  document.body.classList.add("rail-ready");

  const footer = document.querySelector("footer");
  if (footer && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => rail.classList.toggle("is-near-footer", entry.isIntersecting),
      { threshold: 0 }).observe(footer);
  }
})();
