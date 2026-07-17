// Asociația TRE® România — Facilitators directory
// Page-scoped: searchable / filterable grid + profile modal.
// Self-contained (does not depend on main.js beyond the shared header/footer).
(function () {
  "use strict";

  var PLACEHOLDER = "images/logo-badge.png";
  var CONTACT_EMAIL = "office@treromania.org";

  // ---- Data ------------------------------------------------------------
  // type: "Facilitator" | "Facilitator Avansat"
  // photo: portrait copied from the member page (empty => logo placeholder)
  // profile: existing member page (empty => contact via association)
  var FACILITATORS = [
    { slug: "adriana-neagu", name: "Adriana Neagu", city: "București & Tunari (IF)", type: "Facilitator", photo: "", profile: "", bio: "2010 – Reiki Usui\n2011–2015 – Terapeut energetic\n2016–prezent – Practician QHHT (Quantum Healing Hypnosis Technique)\n2025–prezent – Facilitator TRE®\nwww.qhhtromania.ro", facebook: "", instagram: "", whatsapp: "0731885067" },
    { slug: "alice-cristina-mihailescu", name: "Alice Cristina Mihailescu", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "alice-negoita", name: "Alice Negoiță", city: "București", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "alina-mustata", name: "Alina Nicoleta Mustață", city: "Brașov", type: "Facilitator", photo: "images/Foto-pt-Website4.png", profile: "member-alina-mustata.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "anca-liana-vernon", name: "Anca Liana Vernon", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "andreea-baesu", name: "Andreea Băesu", city: "Brașov", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "catalina-musat", name: "Cătălina Mușat", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "claudia-vancu", name: "Claudia Vancu", city: "Cluj-Napoca", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "crina-tudor", name: "Crina Maria Tudor", city: "Timișoara", type: "Facilitator Avansat", photo: "images/member-crina-tudor.webp", profile: "member-crina-tudor.html", bio: "Facilitator TRE® (Tension, Stress, Trauma Release). Instructor yoga TTC 200 Hatha Yoga (PadmaKarma Yoga, Kerala, India) și TTC 200 Vinyasa Yoga (Frog Lotus Yoga International, Spania). NLP Practitioner. Inginer proiectant în construcții și auditor energetic.\n\nAm descoperit metoda TRE în 2016, într-un moment în care aveam disperată nevoie de ea. Am integrat-o ca instrument de auto-vindecare și auto-reglare, iar impactul a fost atât de mare încât am decis să devin facilitator, pentru a răspândi această metodă la cât mai multe persoane.", facebook: "", instagram: "", whatsapp: "+40745271186" },
    { slug: "cristina-teasa", name: "Cristina Teașă", city: "București, Ilfov", type: "Facilitator", photo: "images/Foto-pt-Website8.png", profile: "member-cristina-teasa.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "denisa-anghel", name: "Denisa Anghel", city: "București", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "diana-tataran", name: "Diana Tătăran", city: "Timișoara", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "doina-raita", name: "Doina Raita", city: "București + Ilfov", type: "Facilitator", photo: "images/IMG_3679-scaled-e1738250639131.jpg", profile: "member-doina-raita.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "eniko-balazs", name: "Enikő Balázs", city: "Brașov, Miercurea Ciuc", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "gabriela-abrudan", name: "Gabriela Cristina Abrudan", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "georgeta-apostol", name: "Georgeta Apostol", city: "București și Bragadiru", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "georgiana-sfetea", name: "Georgiana Sfetea", city: "Brașov", type: "Facilitator Avansat", photo: "images/Green-And-Grey-Nature-Facebook-Profile-Picture-2_1600.png", profile: "member-georgiana-sfetea.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "ilona-corfu", name: "Ilona Corfu", city: "Iași", type: "Facilitator", photo: "images/Foto-pt-Website6.png", profile: "member-ilona-corfu.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "ioana-tudor", name: "Ioana Tudor", city: "Brașov și București", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "saymara-ryon", name: "Saymara Ryon", city: "București", type: "Facilitator Avansat", photo: "images/HM-Iuia-Ioana-BW.jpeg", profile: "member-iulia-ioana-hm.html", bio: "Președinte Asociația TRE® România. Facilitator TRE® certificat în 2019. Trainer Institut Kutschera Austria, Master Coach Resonanz®, mentor în dezvoltare sustenabilă, autoare de cărți și cursuri. Fondatoare a metodei ReUnity MATRIX®.", facebook: "", instagram: "", whatsapp: "" },
    { slug: "larisa-anghel", name: "Larisa Anghel", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "lia-bolte", name: "Lia Bolte", city: "București", type: "Facilitator", photo: "images/Foto-pt-Website5.png", profile: "member-lia-bolte.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "madalina-luca", name: "Mădălina Luca", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "madalina-bozeanu", name: "Mădălina Bozeanu", city: "București", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "maria-elena-marin", name: "Maria Elena Marin", city: "București", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "monica-alexandrescu", name: "Monica Maria Alexandrescu", city: "Brașov", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "oana-alina-danila", name: "Oana-Alina Dănilă", city: "Mangalia, Vama Veche și Constanța", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "oltita-raluca-rad", name: "Oltița Raluca Rad", city: "Brașov", type: "Facilitator Avansat", photo: "images/Foto-pt-Website3.png", profile: "member-oltita-raluca-rad.html", bio: "", facebook: "", instagram: "", whatsapp: "" },
    { slug: "simona-balcan", name: "Simona Balcan", city: "", type: "Facilitator", photo: "", profile: "", bio: "", facebook: "", instagram: "", whatsapp: "" }
  ];

  // Canonical cities used to build the "Oraș" dropdown. A facilitator whose
  // free-text city contains one of these (diacritic-insensitive) is a match —
  // this keeps composite strings like "București, Ilfov" filterable per city.
  var CANONICAL_CITIES = [
    "București", "Brașov", "Cluj-Napoca", "Timișoara", "Iași",
    "Miercurea Ciuc", "Constanța", "Mangalia", "Vama Veche",
    "Bragadiru", "Tunari", "Ilfov"
  ];

  // ---- Helpers ---------------------------------------------------------
  function norm(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();
  }

  function esc(s) {
    return (s || "").toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // "0731885067" / "+40745271186" -> "40731885067" / "40745271186"
  function waNumber(raw) {
    var digits = (raw || "").replace(/[^\d]/g, "");
    if (!digits) return "";
    if (digits.charAt(0) === "0") digits = "40" + digits.slice(1);
    return digits;
  }

  function bioHtml(bio) {
    // Preserve line breaks: blank line => new paragraph, single \n => <br>.
    return bio.split(/\n{2,}/).map(function (para) {
      return "<p>" + esc(para).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function citiesFor(fac) {
    var n = norm(fac.city);
    var out = [];
    CANONICAL_CITIES.forEach(function (c) {
      if (n.indexOf(norm(c)) !== -1) out.push(c);
    });
    return out;
  }

  // Social SVG icon markup (fill: currentColor)
  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.7v8h3.2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm0-2.1a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm6.9-.3a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0zM12 4.2c-2.6 0-2.9 0-4 .1-1 0-1.6.2-2 .4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 1 .2 1.6.4 2 .2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2 .4 1.1.1 1.4.1 4 .1s2.9 0 4-.1c1 0 1.6-.2 2-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2 .1-1.1.1-1.4.1-4s0-2.9-.1-4c0-1-.2-1.6-.4-2a3.1 3.1 0 0 0-.8-1.2 3.1 3.1 0 0 0-1.2-.8c-.4-.2-1-.3-2-.4-1.1-.1-1.4-.1-4-.1z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.66-.77-3.08-1.24-5.04-4.4-5.19-4.6-.15-.2-1.24-1.65-1.24-3.15s.79-2.24 1.07-2.54c.28-.3.61-.38.81-.38.2 0 .4 0 .58.01.19.01.44-.07.68.52.24.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.36 1.46.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.13.07.75-.17 1.43z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>'
  };

  // ---- DOM refs --------------------------------------------------------
  var grid = document.getElementById("fac-grid");
  if (!grid) return;
  var searchInput = document.getElementById("fac-search");
  var citySelect = document.getElementById("fac-city");
  var typeChips = [].slice.call(document.querySelectorAll("#fac-types .chip"));
  var countEl = document.getElementById("fac-count");
  var noResults = document.getElementById("fac-noresults");
  var modal = document.getElementById("fac-modal");
  var modalBody = modal ? modal.querySelector(".modal__body") : null;
  var modalScroll = modal ? modal.querySelector(".modal__scroll") : null;
  var lastFocused = null;

  // ---- Build the card grid --------------------------------------------
  FACILITATORS.forEach(function (fac, i) {
    var hasPhoto = !!fac.photo;
    var src = hasPhoto ? fac.photo : PLACEHOLDER;
    var isAdv = fac.type === "Facilitator Avansat";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fac-card";
    btn.setAttribute("data-index", i);
    btn.setAttribute("aria-label", "Vezi profilul: " + fac.name);

    var html = '';
    html += '<span class="fac-avatar' + (hasPhoto ? '' : ' fac-avatar--ph') + '">';
    html += '<img src="' + esc(src) + '" alt="' + (hasPhoto ? 'Portret ' + esc(fac.name) : 'Asociația TRE® România') + '" loading="lazy">';
    html += '</span>';
    html += '<span class="fac-badge' + (isAdv ? ' fac-badge--adv' : '') + '">' + esc(fac.type) + '</span>';
    html += '<span class="fac-card__name">' + esc(fac.name) + '</span>';
    if (fac.city) html += '<span class="fac-card__city">Oraș: ' + esc(fac.city) + '</span>';
    btn.innerHTML = html;

    btn.addEventListener("click", function () { openProfile(fac, btn); });
    grid.appendChild(btn);
  });
  var cards = [].slice.call(grid.querySelectorAll(".fac-card"));

  // ---- Populate the city dropdown -------------------------------------
  (function () {
    var present = {};
    FACILITATORS.forEach(function (f) {
      citiesFor(f).forEach(function (c) { present[c] = true; });
    });
    CANONICAL_CITIES.filter(function (c) { return present[c]; })
      .sort(function (a, b) { return a.localeCompare(b, "ro"); })
      .forEach(function (c) {
        var opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        citySelect.appendChild(opt);
      });
  })();

  // ---- Type-chip counts -----------------------------------------------
  (function () {
    var total = FACILITATORS.length;
    var adv = FACILITATORS.filter(function (f) { return f.type === "Facilitator Avansat"; }).length;
    var counts = { all: total, "Facilitator": total - adv, "Facilitator Avansat": adv };
    typeChips.forEach(function (chip) {
      var c = chip.querySelector(".chip__count");
      if (c) c.textContent = counts[chip.getAttribute("data-type")];
    });
  })();

  // ---- Filtering -------------------------------------------------------
  function activeType() {
    var pressed = document.querySelector('#fac-types .chip[aria-pressed="true"]');
    return pressed ? pressed.getAttribute("data-type") : "all";
  }

  function applyFilters() {
    var q = norm(searchInput.value);
    var type = activeType();
    var city = citySelect.value;
    var visible = 0;

    cards.forEach(function (card) {
      var fac = FACILITATORS[+card.getAttribute("data-index")];
      var okName = !q || norm(fac.name).indexOf(q) !== -1;
      var okType = type === "all" || fac.type === type;
      var okCity = city === "all" || citiesFor(fac).indexOf(city) !== -1;
      var show = okName && okType && okCity;
      card.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    if (countEl) {
      countEl.textContent = visible === 1
        ? "1 facilitator afișat"
        : "Se afișează " + visible + " din " + FACILITATORS.length + " facilitatori";
    }
    if (noResults) noResults.style.display = visible ? "none" : "block";
  }

  searchInput.addEventListener("input", applyFilters);
  citySelect.addEventListener("change", applyFilters);
  typeChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      typeChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      applyFilters();
    });
  });

  applyFilters();

  // ---- Profile modal --------------------------------------------------
  function buildProfile(fac) {
    var hasPhoto = !!fac.photo;
    var src = hasPhoto ? fac.photo : PLACEHOLDER;
    var isAdv = fac.type === "Facilitator Avansat";

    var socials = "";
    if (fac.facebook) socials += '<a href="' + esc(fac.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.facebook + '</a>';
    if (fac.instagram) socials += '<a href="' + esc(fac.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.instagram + '</a>';
    if (fac.whatsapp) {
      var wa = waNumber(fac.whatsapp);
      if (wa) socials += '<a href="https://wa.me/' + wa + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICONS.whatsapp + '</a>';
    }

    var action;
    if (fac.profile) {
      action = '<a class="btn" href="' + esc(fac.profile) + '">Vezi profilul complet →</a>';
    } else {
      action = '<a class="btn" href="mailto:' + CONTACT_EMAIL + '?subject=' +
        encodeURIComponent("Contact facilitator: " + fac.name) + '">Contactează prin asociație</a>';
    }

    var h = '<div class="fac-modal">';
    h += '<div class="fac-modal__head">';
    h += '<span class="fac-modal__avatar' + (hasPhoto ? '' : ' fac-modal__avatar--ph') + '">';
    h += '<img src="' + esc(src) + '" alt="' + (hasPhoto ? 'Portret ' + esc(fac.name) : 'Asociația TRE® România') + '">';
    h += '</span>';
    h += '<div class="fac-modal__id">';
    h += '<span class="fac-badge' + (isAdv ? ' fac-badge--adv' : '') + '">' + esc(fac.type) + '</span>';
    h += '<h2>' + esc(fac.name) + '</h2>';
    if (fac.city) h += '<p class="fac-modal__city">' + ICONS.pin + '<span>Oraș: ' + esc(fac.city) + '</span></p>';
    if (socials) h += '<div class="fac-socials">' + socials + '</div>';
    h += '</div></div>';
    if (fac.bio) h += '<div class="fac-modal__bio">' + bioHtml(fac.bio) + '</div>';
    h += '<div class="fac-modal__actions">' + action + '</div>';
    h += '</div>';
    return h;
  }

  function openProfile(fac, trigger) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = buildProfile(fac);
    if (modalScroll) modalScroll.scrollTop = 0;
    if (modal.open) return;
    lastFocused = trigger || document.activeElement;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function closeProfile() {
    if (!modal) return;
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (modal) {
    var closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.addEventListener("click", closeProfile);
    // backdrop click (target is the dialog itself)
    modal.addEventListener("click", function (e) { if (e.target === modal) closeProfile(); });
    // Esc: <dialog> fires "cancel" and closes natively; restore focus
    modal.addEventListener("cancel", function () { if (lastFocused && lastFocused.focus) lastFocused.focus(); });
  }
})();
