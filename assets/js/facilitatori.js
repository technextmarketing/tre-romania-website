// Asociația TRE® România — Facilitators directory
// Searchable / filterable grid. Each card links to a dedicated profile page
// (facilitator.html?f=<slug>). Data comes from facilitators-data.js.
(function () {
  "use strict";

  var PLACEHOLDER = "images/logo-badge.png";
  var FACILITATORS = window.TRE_FACILITATORS || [];

  var CANONICAL_CITIES = [
    "București", "Brașov", "Cluj-Napoca", "Timișoara", "Iași",
    "Miercurea Ciuc", "Constanța", "Mangalia", "Vama Veche",
    "Bragadiru", "Tunari", "Ilfov"
  ];

  function norm(s) {
    return (s || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }
  function esc(s) {
    return (s || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function citiesFor(fac) {
    var n = norm(fac.city), out = [];
    CANONICAL_CITIES.forEach(function (c) { if (n.indexOf(norm(c)) !== -1) out.push(c); });
    return out;
  }

  var grid = document.getElementById("fac-grid");
  if (!grid) return;
  var searchInput = document.getElementById("fac-search");
  var citySelect = document.getElementById("fac-city");
  var typeChips = [].slice.call(document.querySelectorAll("#fac-types .chip"));
  var countEl = document.getElementById("fac-count");
  var noResults = document.getElementById("fac-noresults");

  // ---- Build the card grid (each card is a link to the profile page) ----
  FACILITATORS.forEach(function (fac, i) {
    var hasPhoto = !!fac.photo;
    var src = hasPhoto ? fac.photo : PLACEHOLDER;
    var isAdv = fac.type === "Facilitator Avansat";

    var a = document.createElement("a");
    a.className = "fac-card";
    a.href = "facilitator.html?f=" + encodeURIComponent(fac.slug);
    a.setAttribute("data-index", i);

    var html = "";
    html += '<span class="fac-avatar' + (hasPhoto ? "" : " fac-avatar--ph") + '">';
    html += '<img src="' + esc(src) + '" alt="' + (hasPhoto ? "Portret " + esc(fac.name) : "Asociația TRE® România") + '" loading="lazy">';
    html += "</span>";
    html += '<span class="fac-badge' + (isAdv ? " fac-badge--adv" : "") + '">' + esc(fac.type) + "</span>";
    html += '<span class="fac-card__name">' + esc(fac.name) + "</span>";
    if (fac.city) html += '<span class="fac-card__city">Oraș: ' + esc(fac.city) + "</span>";
    html += '<span class="fac-card__view">Vezi profilul →</span>';
    a.innerHTML = html;
    grid.appendChild(a);
  });
  var cards = [].slice.call(grid.querySelectorAll(".fac-card"));

  // ---- City dropdown --------------------------------------------------
  (function () {
    var present = {};
    FACILITATORS.forEach(function (f) { citiesFor(f).forEach(function (c) { present[c] = true; }); });
    CANONICAL_CITIES.filter(function (c) { return present[c]; })
      .sort(function (a, b) { return a.localeCompare(b, "ro"); })
      .forEach(function (c) {
        var opt = document.createElement("option");
        opt.value = c; opt.textContent = c;
        if (citySelect) citySelect.appendChild(opt);
      });
  })();

  // ---- Type-chip counts ----------------------------------------------
  (function () {
    var total = FACILITATORS.length;
    var adv = FACILITATORS.filter(function (f) { return f.type === "Facilitator Avansat"; }).length;
    var counts = { all: total, "Facilitator": total - adv, "Facilitator Avansat": adv };
    typeChips.forEach(function (chip) {
      var c = chip.querySelector(".chip__count");
      if (c) c.textContent = counts[chip.getAttribute("data-type")];
    });
  })();

  // ---- Filtering ------------------------------------------------------
  function activeType() {
    var pressed = document.querySelector('#fac-types .chip[aria-pressed="true"]');
    return pressed ? pressed.getAttribute("data-type") : "all";
  }
  function applyFilters() {
    var q = norm(searchInput ? searchInput.value : "");
    var type = activeType();
    var city = citySelect ? citySelect.value : "all";
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

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (citySelect) citySelect.addEventListener("change", applyFilters);
  typeChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      typeChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      applyFilters();
    });
  });

  applyFilters();
})();
