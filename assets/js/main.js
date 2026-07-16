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

  // Mark current page in nav
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[href]").forEach(function (a) {
    var target = a.getAttribute("href").split("#")[0];
    if (target === here) a.setAttribute("aria-current", "page");
  });

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

    var modal = document.getElementById("event-modal");
    var modalBody = modal ? modal.querySelector(".modal__body") : null;
    var scroll = modal ? modal.querySelector(".modal__scroll") : null;
    var lastFocused = null;

    function openEvent(card) {
      if (!modal || !modalBody) return;
      var full = card.querySelector(".ev-card__full");
      modalBody.innerHTML = full ? full.innerHTML : "";
      if (scroll) scroll.scrollTop = 0;
      if (modal.open) return; // already open — content swapped in place
      lastFocused = document.activeElement;
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.setAttribute("open", "");
    }
    function closeEvent() {
      if (!modal) return;
      if (typeof modal.close === "function") modal.close();
      else modal.removeAttribute("open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    cards.forEach(function (card) {
      var btn = card.querySelector(".ev-card__btn");
      if (btn) btn.addEventListener("click", function (e) { e.preventDefault(); openEvent(card); });
    });

    if (modal) {
      var closeBtn = modal.querySelector(".modal__close");
      if (closeBtn) closeBtn.addEventListener("click", closeEvent);
      // click on backdrop (dialog itself) closes
      modal.addEventListener("click", function (e) { if (e.target === modal) closeEvent(); });
      modal.addEventListener("cancel", function () { if (lastFocused && lastFocused.focus) lastFocused.focus(); });
    }

    // Open the matching event when arriving via a cross-page anchor (#slug).
    // Deferred so it runs after the browser settles its own fragment navigation.
    function openFromHash() {
      if (location.hash.length <= 1) return;
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && target.classList.contains("ev-card")) {
        target.scrollIntoView({ block: "center" });
        openEvent(target);
      }
    }
    setTimeout(openFromHash, 60);
    // Also respond to in-page hash changes (e.g. clicking an anchor while here)
    window.addEventListener("hashchange", openFromHash);
  }
})();
