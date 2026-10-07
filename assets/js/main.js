/* Progressive enhancement only: the page is fully readable without this file. */
(function () {
  "use strict";

  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  /* ---------- Theme toggle ---------- */
  var toggle = document.getElementById("theme-toggle");

  function systemTheme() {
    return media && media.matches ? "dark" : "light";
  }

  function paintToggle(theme) {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    paintToggle(theme);
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (e) { /* storage may be unavailable */ }
    }
  }

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
  setTheme(stored === "light" || stored === "dark" ? stored : systemTheme(), false);

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  if (media && media.addEventListener) {
    media.addEventListener("change", function () {
      var saved = null;
      try { saved = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
      if (saved !== "light" && saved !== "dark") setTheme(systemTheme(), false);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Publication filters ---------- */
  var filters = document.querySelectorAll(".filter");
  var pubs = document.querySelectorAll(".pub");
  var groups = document.querySelectorAll(".pub-year");
  var count = document.getElementById("pub-count");

  function matches(pub, kind) {
    if (kind === "all") return true;
    if (kind === "first") return pub.getAttribute("data-first") === "true";
    var k = pub.getAttribute("data-kind");
    if (kind === "journal") return k === "journal";
    if (kind === "conference") return k === "conference" || k === "poster";
    return true;
  }

  function applyFilter(kind) {
    var shown = 0;
    pubs.forEach(function (pub) {
      var ok = matches(pub, kind);
      pub.hidden = !ok;
      if (ok) shown += 1;
    });
    groups.forEach(function (g) {
      g.hidden = g.querySelectorAll(".pub:not([hidden])").length === 0;
    });
    filters.forEach(function (f) {
      f.setAttribute("aria-pressed", f.getAttribute("data-filter") === kind ? "true" : "false");
    });
    if (count) count.textContent = "Showing " + shown + " of " + pubs.length;
  }

  filters.forEach(function (f) {
    f.addEventListener("click", function () { applyFilter(f.getAttribute("data-filter")); });
  });
  if (filters.length) applyFilter("all");

  /* ---------- Active nav link (scroll spy) ---------- */
  var navLinks = document.querySelectorAll(".nav a[href^='#']");
  var sections = [];
  navLinks.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s) sections.push({ link: a, el: s });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (s) {
          if (s.el === entry.target) s.link.setAttribute("aria-current", "true");
          else s.link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
