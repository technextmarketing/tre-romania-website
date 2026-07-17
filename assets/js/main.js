// Asociația TRE® România — shared behaviour

(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Dropdown groups (click for touch / keyboard; hover handled by CSS)
  document.querySelectorAll(".nav__group > button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var group = btn.parentElement;
      var wasOpen = group.classList.contains("open");
      document.querySelectorAll(".nav__group.open").forEach(function (g) {
        g.classList.remove("open");
      });
      if (!wasOpen) group.classList.add("open");
      btn.setAttribute("aria-expanded", wasOpen ? "false" : "true");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".nav__group.open").forEach(function (g) {
      g.classList.remove("open");
      var b = g.querySelector("button");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });
  // Hovering a group must close any *other* click-opened group, so a
  // click-opened menu + a hovered menu can never show at the same time.
  document.querySelectorAll(".nav__group").forEach(function (group) {
    group.addEventListener("mouseenter", function () {
      document.querySelectorAll(".nav__group.open").forEach(function (g) {
        if (g === group) return;
        g.classList.remove("open");
        var b = g.querySelector("button");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });
  });

  // Mark current page in nav
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[href]").forEach(function (a) {
    var target = a.getAttribute("href").split("#")[0];
    if (target === here) a.setAttribute("aria-current", "page");
  });

  // Countdown timer — start a live "Xz Yh Zm Ws" ticker on an element with
  // data-countdown="YYYY-MM-DDTHH:MM" (written into its [data-cd] child).
  // Exposed globally so dynamically-injected cards can start their own.
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  window.treCountdown = function (el) {
    var target = new Date(el.getAttribute("data-countdown")).getTime();
    if (isNaN(target)) { el.style.display = "none"; return; }
    function render() {
      var out = el.querySelector("[data-cd]") || el;
      var diff = target - Date.now();
      if (diff <= 0) { el.classList.add("is-live"); out.textContent = "Are loc acum"; return false; }
      var s = Math.floor(diff / 1000);
      out.textContent = Math.floor(s / 86400) + "z " + pad2(Math.floor((s % 86400) / 3600)) +
        "h " + pad2(Math.floor((s % 3600) / 60)) + "m " + pad2(s % 60) + "s";
      return true;
    }
    render();
    var iv = setInterval(function () { if (!render()) clearInterval(iv); }, 1000);
  };
  [].slice.call(document.querySelectorAll("[data-countdown]")).forEach(window.treCountdown);

  // Hero background video — nudge muted autoplay for stricter browsers /
  // bfcache restores. If blocked, the poster image remains as fallback.
  (function () {
    var hv = document.querySelector("video.hero__bg");
    if (!hv) return;
    hv.muted = true;
    var kick = function () { var p = hv.play(); if (p && p.catch) p.catch(function () {}); };
    kick();
    window.addEventListener("pageshow", kick);
  })();

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // Demo forms (static site): explain where the message goes
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (!note) {
        note = document.createElement("p");
        note.className = "form-note";
        note.style.fontFamily = "var(--font-display)";
        note.style.color = "var(--garnet)";
        form.appendChild(note);
      }
      note.textContent =
        "Mulțumim! Pentru moment, te rugăm să ne scrii direct la office@treromania.org — formularul va fi conectat în curând.";
    });
  });

  // Footer: toggle the legal fine print
  document.querySelectorAll("[data-legal-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest(".site-footer__legal");
      if (!wrap) return;
      var open = wrap.getAttribute("data-legal-open") === "true";
      wrap.setAttribute("data-legal-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  // Events page: filter chips + detail modal
  var grid = document.getElementById("ev-grid");
  if (grid) {
    var cards = [].slice.call(grid.querySelectorAll(".ev-card"));
    var chips = [].slice.call(document.querySelectorAll(".event-filters .chip"));
    var noResults = document.querySelector(".no-results");

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        var f = chip.getAttribute("data-filter");
        var visible = 0;
        cards.forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-type") === f;
          card.classList.toggle("is-hidden", !show);
          if (show) visible++;
        });
        if (noResults) noResults.style.display = visible ? "none" : "block";
      });
    });

    // Grid / list view toggle
    var viewBtns = [].slice.call(document.querySelectorAll(".view-btn"));
    viewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var view = btn.getAttribute("data-view");
        viewBtns.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        grid.classList.toggle("ev-grid--list", view === "list");
      });
    });

    // Each event card's "Vezi detalii" is now a link to a dedicated event
    // page (eveniment.html?e=<id>), so no in-page modal wiring is needed here.
  }
})();
