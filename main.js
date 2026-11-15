(() => {
  const W = window.WEDDING || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), W);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-field]").forEach((el) => {
    const value = get(el.dataset.field);
    if (typeof value === "string") el.textContent = value;
  });
  document.querySelectorAll("[data-href]").forEach((el) => {
    const value = get(el.dataset.href);
    if (value) el.href = value;
    else el.hidden = true;
  });

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
  if (!schedule.children.length) schedule.closest(".part").hidden = true;


  if (W.rsvp && W.rsvp.url) {
    const link = $("#rsvp-link");
    link.href = W.rsvp.url;
    link.hidden = false;
    $("#rsvp-pending").hidden = true;
  }

const timer = $("#timer");
const weddingDate = W.date ? new Date(W.date) : null;

if (timer && weddingDate && !isNaN(weddingDate)) {
  const cells = {
    days: $('[data-t="days"]', timer),
    hours: $('[data-t="hours"]', timer),
    minutes: $('[data-t="minutes"]', timer),
  };
  const pad = (n) => String(n).padStart(2, "0");

  const tick = () => {
    const s = Math.floor(Math.max(0, weddingDate - Date.now()) / 1000);
    cells.days.textContent = pad(Math.floor(s / 86400));
    cells.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    cells.minutes.textContent = pad(Math.floor((s % 3600) / 60));
  };

  tick();
  setInterval(tick, 30000);   
} else if (timer) {
  timer.hidden = true;
}


  const audio = $("#audio");
  if (W.music) {
    audio.src = W.music;
    document.addEventListener(
      "pointerdown",
      () => { if (audio.paused) audio.play().catch(() => {}); },
      { once: true }
    );
  }

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
