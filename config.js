/*
 * Everything couple-specific lives here. Edit this file, commit, and the
 * site updates. Values marked "ПЛЕЙСХОЛДЕР" are still template placeholders.
 */
window.WEDDING = {
  // Names as they appear on the invitation
  partnerOne: { first: "Abylai", full: "Abylai" },
  partnerTwo: { first: "Sezim", full: "Sezim" },

  // Initials engraved on the envelope flap
  monogram: { left: "A", right: "S" },

  // Ceremony start, with the venue's UTC offset (Karaganda = UTC+5)
  date: "2027-03-27T15:00:00+05:00",
  // Written out the formal way for the invitation card
  dateWords: {
    day: "Сенбі",
    date: "27 наурыз",
    year: "2027 жыл",
    time: "сағат 15:00-де",
  },
  // Short form, used on the envelope and footer
  dateShort: "27 · 03 · 27",

  hosts: "Екі отбасының атынан",

  ceremony: {
    name: "Emerald Hall",
    address: "143-й учетный квартал, ст760",
    time: "сағат 15:00",
    mapUrl: "https://2gis.kz/karaganda/geo/70000001114726103/73.165373,49.779887?inv_by=59f14c2cf832437b80c8418b9a97ec05&inv_ts=1794738552",
  },
  // ПЛЕЙСХОЛДЕР: замените на свои данные
  reception: {
    name: "Банкет залының атауы",
    address: "Мекенжайы",
    time: "сағат 17:30",
    mapUrl: "https://maps.google.com/?q=Tagaytay+City",
  },

  dressCode: {
    title: "Салтанатты, көк реңктерде",
    note: "Жұмсақ көк, сұр және ақ түстер. Ақ және піл сүйегі түстерін қалыңдыққа қалдыруды өтінеміз.",
  },

  // Order of the day
  schedule: [
    { time: "14:30", label: "Қонақтарды қарсы алу", detail: "Emerald Hall" },
    { time: "15:00", label: "Салтанатты рәсім" },
    { time: "16:15", label: "Фотосессия және жеңіл тағам", detail: "Emerald Hall" },
    { time: "17:30", label: "Коктейль", detail: "Банкет залы" },
    { time: "18:30", label: "Кешкі ас және тосттар" },
    { time: "20:00", label: "Жастардың алғашқы биі, одан соң — барлығымыздікі" },
    { time: "23:00", label: "Соңғы ән" },
  ],

  note:
    "Бұл күнді біз ұзақ уақыт армандадық, және оның әрбір көрінісінде сіздер болдыңыздар. Өздеріңіздей болып келіңіздер, қалағанша қалыңыздар және кем дегенде бір рет билеңіздер.",

  // ПЛЕЙСХОЛДЕР: замените на свои данные
  stay: [
    {
      name: "Қонақүйдің атауы",
      detail: "Банкет залынан он минуттық жерде. Топтық жеңілдік алу үшін біздің есімдерімізді айтыңыздар.",
    },
    {
      name: "Шағын қонақүйдің атауы",
      detail: "Залға жаяу баруға болады. Кішкентай болғандықтан, орынды алдын ала брондаңыздар.",
    },
  ],

  // RSVP: set `url` to a form link when ready. While empty, the reply card
  // says details will follow.
  rsvp: {
    by: "2027 жылғы 1 наурызға дейін",
    url: "",
  },

  faq: [
    {
      q: "Қасыма бір адамды ертіп келуге бола ма?",
      a: "Шақыру қағазында біз орын дайындаған барлық қонақтың аты көрсетілген. Қонақтар саны туралы сұрағыңыз болса, бізге тікелей жазыңыз.",
    },
    {
      q: "Балалармен келуге бола ма?",
      a: "Кішкентайларыңызды жақсы көреміз, бірақ мереке ересектерге арналған. Тек отбасымыздың гүл тапсыратын және жүзік алып жүретін балалары қатысады.",
    },
    {
      q: "Көлік қоятын орын бар ма?",
      a: "Иә, Emerald Hall жанында тұрақ бар. Қызметкерлер жол көрсетеді.",
    },
    {
      q: "Сыйлық туралы не айтасыздар?",
      a: "Сіздердің қатысуларыңыз — біз үшін ең үлкен сыйлық. Егер тағы бір нәрсе сыйлағыларыңыз келсе, банкет залында сыйлықтарға арналған үстел болады.",
    },
  ],

  // Optional background music. Put an .mp3 in /assets and set the path,
  // e.g. "assets/song.mp3". Leave empty to hide the music button.
  music: "assets/music.mp3",
};