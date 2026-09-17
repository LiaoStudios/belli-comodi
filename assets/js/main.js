/* Belli Comodi — interactions */
(function () {
  "use strict";

  /* --- Nav: shrink on scroll --- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- Mobile drawer --- */
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  const setDrawer = (open) => {
    drawer.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    toggle.setAttribute("aria-label", open ? "Chiudi il menù" : "Apri il menù");
  };
  toggle.addEventListener("click", () => setDrawer(!drawer.classList.contains("open")));
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));

  /* --- Menu tabs --- */
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === name));
    });
  });

  /* --- Gallery lightbox --- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  lightbox.addEventListener("click", closeLightbox);
  lightboxClose.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }
})();
