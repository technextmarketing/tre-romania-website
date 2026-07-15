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
})();
