(() => {
  const W = window.WEDDING || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), W);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- fill the page from config.js ---------- */
  document.querySelectorAll("[data-field]").forEach((el) => {
    const value = get(el.dataset.field);
    if (typeof value === "string") el.textContent = value;
  });
  document.querySelectorAll("[data-href]").forEach((el) => {
    const value = get(el.dataset.href);
    if (value) el.href = value;
    else el.hidden = true;
  });

  if (W.partnerOne && W.partnerTwo) {
    document.title = `${W.partnerOne.first} & ${W.partnerTwo.first}`;
  }

  const schedule = $("#schedule");
  (W.schedule || []).forEach((item) => {
    const li = document.createElement("li");
    const time = document.createElement("time");
    time.textContent = item.time;
    const text = document.createElement("span");
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = item.label;
    text.append(label);
    if (item.detail) {
      const sub = document.createElement("span");
      sub.className = "sub";
      sub.textContent = item.detail;
      text.append(sub);
    }
    li.append(time, text);
    schedule.append(li);
  });
  if (!schedule.children.length) schedule.closest(".card").hidden = true;

  const stay = $("#stay");
  (W.stay || []).forEach((place) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.className = "small-caps";
    name.textContent = place.name;
    const detail = document.createElement("p");
    detail.textContent = place.detail;
    li.append(name, detail);
    stay.append(li);
  });
  if (!stay.children.length) stay.closest(".card").hidden = true;

  const faq = $("#faq");
  (W.faq || []).forEach(({ q, a }) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = q;
    const p = document.createElement("p");
    p.textContent = a;
    details.append(summary, p);
    faq.append(details);
  });
  if (!faq.children.length) faq.closest(".card").hidden = true;

  if (W.rsvp && W.rsvp.url) {
    const link = $("#rsvp-link");
    link.href = W.rsvp.url;
    link.hidden = false;
    $("#rsvp-pending").hidden = true;
  }

  /* ---------- countdown ---------- */
  const countdown = $("#countdown");
  const weddingDate = W.date ? new Date(W.date) : null;
  if (weddingDate && !isNaN(weddingDate)) {
    const days = Math.ceil((weddingDate - Date.now()) / 86400000);
    if (days > 1) countdown.innerHTML = `<strong>${days}</strong> days until we say I do`;
    else if (days === 1) countdown.textContent = "Tomorrow, we say I do";
    else if (days === 0) countdown.textContent = "Today is the day";
  }

  /* ---------- add to calendar (.ics) ---------- */
  const icsDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const icsText = (s) => String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

  $("#add-cal").addEventListener("click", () => {
    if (!weddingDate) return;
    const end = new Date(weddingDate.getTime() + 9 * 3600000);
    const title = `${W.partnerOne.first} & ${W.partnerTwo.first}'s wedding`;
    const place = [W.ceremony?.name, W.ceremony?.address].filter(Boolean).join(", ");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//wedding-invitation//EN",
      "BEGIN:VEVENT",
      `UID:${icsDate(weddingDate)}-wedding@invitation`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(weddingDate)}`,
      `DTEND:${icsDate(end)}`,
      `SUMMARY:${icsText(title)}`,
      `LOCATION:${icsText(place)}`,
      `DESCRIPTION:${icsText(`Ceremony at ${W.ceremony?.name}. Reception at ${W.reception?.name}.\n${place}`)}`,
      `URL:${window.location.href.split("#")[0]}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding.ics";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  /* ---------- music ---------- */
  // const musicBtn = $("#music");
  // const audio = $("#audio");
  // if (W.music) {
  //   audio.src = W.music;
  //   musicBtn.hidden = false;
  //   musicBtn.addEventListener("click", () => {
  //     if (audio.paused) audio.play().catch(() => {});
  //     else audio.pause();
  //   });
  //   audio.addEventListener("play", () => {
  //     musicBtn.setAttribute("aria-pressed", "true");
  //     musicBtn.setAttribute("aria-label", "Pause music");
  //   });
  //   audio.addEventListener("pause", () => {
  //     musicBtn.setAttribute("aria-pressed", "false");
  //     musicBtn.setAttribute("aria-label", "Play music");
  //   });
  // }
  /* ---------- music ---------- */
  const audio = $("#audio");
  if (W.music) {
    audio.src = W.music;
    // если браузер заблокировал автозапуск, музыка начнётся при первом касании
    document.addEventListener(
      "pointerdown",
      () => { if (audio.paused) audio.play().catch(() => {}); },
      { once: true }
    );
  }

  /* ---------- cards settle as they scroll in ---------- */
  const cards = document.querySelectorAll("[data-settle]");
  let observer = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion");
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-settled");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
  }
  const watchCards = () => {
    if (!observer) return;
    cards.forEach((card) => {
      card.classList.remove("is-settled");
      observer.observe(card);
    });
  };

  /* ---------- the envelope ---------- */
  const intro = $("#intro");
  const envelope = $("#envelope");
  const suite = $("#suite");
  let timers = [];
  let opened = false;

  const at = (ms, fn) => timers.push(setTimeout(fn, ms));

  const reveal = () => {
    document.body.classList.remove("is-sealed");
    suite.inert = false;
    watchCards();
  };

  const open = () => {
    if (opened) return;
    opened = true;
    if (W.music) audio.play().catch(() => {});

    if (reduceMotion) {
      reveal();
      at(900, () => intro.classList.add("is-gone"));
      return;
    }

    // pull back until the whole envelope sits in the lower part of the screen
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(0.92 * vw / envelope.offsetWidth, 0.5 * vh / envelope.offsetHeight, 1);
    envelope.style.setProperty("--settle", `translateY(${Math.round(vh * 0.12)}px) scale(${scale.toFixed(4)})`);

    intro.classList.add("is-lifting");
    at(900, () => intro.classList.add("is-flap-open"));
    at(1380, () => intro.classList.add("is-flap-behind"));
    at(1750, () => intro.classList.add("is-letter-out"));
    at(3500, () => {
      intro.classList.add("is-leaving");
      reveal();
    });
    at(4500, () => intro.classList.add("is-gone"));
  };

  const seal = () => {
    timers.forEach(clearTimeout);
    timers = [];
    opened = false;
    window.scrollTo(0, 0);
    intro.className = "intro";
    document.body.classList.add("is-sealed");
    suite.inert = true;
    envelope.focus({ preventScroll: true });
  };

  intro.addEventListener("click", open);
  $("#reseal").addEventListener("click", seal);

  // ?open skips the envelope (handy when sharing a link to the details)
  if (new URLSearchParams(location.search).has("open")) {
    opened = true;
    reveal();
    intro.classList.add("is-gone");
  } else {
    suite.inert = true;
  }
})();
