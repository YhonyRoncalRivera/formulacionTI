(function () {
  "use strict";
  var root = document.documentElement;
  var STORAGE_KEY = "sycetec-iot-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var label = btn.querySelector(".theme-label");
      var iconSun = btn.querySelector(".icon-sun");
      var iconMoon = btn.querySelector(".icon-moon");
      if (label) label.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
      if (iconSun) iconSun.style.display = theme === "dark" ? "block" : "none";
      if (iconMoon) iconMoon.style.display = theme === "dark" ? "none" : "block";
    });
  }

  var saved = localStorage.getItem(STORAGE_KEY);
  var preferred = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(preferred);

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      });
    });

    var current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-item-link").forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === current);
      if (link.getAttribute("href") === current) link.setAttribute("aria-current", "page");
    });

    var offcanvasEl = document.getElementById("sidebarOffcanvas");
    if (offcanvasEl && window.bootstrap) {
      document.querySelectorAll(".nav-item-link").forEach(function (link) {
        link.addEventListener("click", function () {
          var instance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (instance) instance.hide();
        });
      });
    }

    var progressBar = document.getElementById("scroll-progress");
    function updateProgress() {
      if (!progressBar) return;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    document.querySelectorAll(".principle-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        var body = document.getElementById(btn.getAttribute("aria-controls"));
        btn.setAttribute("aria-expanded", String(!expanded));
        if (body) body.hidden = expanded;
      });
    });
  });
})();
