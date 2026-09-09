/* =====================================================================
   main.js — nạp partial header/footer + điều hướng + tiện ích
   Vanilla ES6, không phụ thuộc ngoài. Nạp với <script defer>.
   Lưu ý: fetch() partial cần chạy qua HTTP server (không mở file://).
   ===================================================================== */
(function () {
  "use strict";

  var DESKTOP = window.matchMedia("(min-width: 1024px)");

  /* ---------- 1. Nạp partial [data-include] ---------- */
  function loadIncludes() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));
    if (!nodes.length) return Promise.resolve();

    return Promise.all(
      nodes.map(function (node) {
        var url = node.getAttribute("data-include");
        return fetch(url)
          .then(function (res) {
            if (!res.ok) throw new Error(res.status + " " + url);
            return res.text();
          })
          .then(function (html) {
            node.outerHTML = html;
          })
          .catch(function (err) {
            console.warn(
              "[main.js] Không nạp được partial '" + url + "'. " +
                "Hãy chạy site qua HTTP server (vd: python -m http.server), đừng mở bằng file://.",
              err
            );
            node.remove();
          });
      })
    );
  }

  /* ---------- 2. Đánh dấu link trang hiện tại ---------- */
  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function markActiveLinks() {
    var here = currentPage();
    var links = document.querySelectorAll(".nav a[href], .nav__panel a[href]");
    Array.prototype.forEach.call(links, function (a) {
      var target = a.getAttribute("href").split("/").pop().split("#")[0];
      if (target === here) {
        a.setAttribute("aria-current", "page");
        var panel = a.closest(".nav__panel");
        if (panel) {
          var group = panel.closest(".nav__group");
          var trigger = group && group.querySelector(".nav__trigger");
          if (trigger) trigger.setAttribute("aria-current", "true");
        }
      }
    });
  }

  /* ---------- 3. Menu mobile ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
      document.body.style.overflow = open && !DESKTOP.matches ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    DESKTOP.addEventListener("change", function () {
      setOpen(false);
    });

    setOpen(false);
  }

  /* ---------- 4. Dropdown (chỉ hoạt động ở desktop) ---------- */
  function initDropdowns() {
    var groups = Array.prototype.slice.call(document.querySelectorAll(".nav__group"));
    if (!groups.length) return;

    function closeAll(except) {
      groups.forEach(function (g) {
        if (g === except) return;
        g.removeAttribute("data-open");
        var t = g.querySelector(".nav__trigger");
        var p = g.querySelector(".nav__panel");
        if (t) t.setAttribute("aria-expanded", "false");
        if (p) p.removeAttribute("data-open");
      });
    }

    groups.forEach(function (group) {
      var trigger = group.querySelector(".nav__trigger");
      var panel = group.querySelector(".nav__panel");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", function (e) {
        if (!DESKTOP.matches) return; // mobile: accordion mở sẵn bằng CSS
        e.preventDefault();
        var open = group.getAttribute("data-open") === "true";
        closeAll(group);
        group.setAttribute("data-open", String(!open));
        trigger.setAttribute("aria-expanded", String(!open));
        panel.setAttribute("data-open", String(!open));
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav__group")) closeAll(null);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });

    DESKTOP.addEventListener("change", function () {
      closeAll(null);
    });
  }

  /* ---------- 5. Năm động trong footer ---------- */
  function fillYear() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    loadIncludes().then(function () {
      markActiveLinks();
      initMobileMenu();
      initDropdowns();
      fillYear();
    });
  });
})();
