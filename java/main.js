/* Jadoo Landing Page - vanilla JS, no dependencies */
(function () {
  "use strict";

  /* ---------- Sticky header ---------- */
  const header = document.getElementById("site-header");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    })
  );

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Testimonials slider ---------- */
  const track = document.getElementById("testimonials-track");
  const cards = track.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonials__dots .dot");
  let index = 0;
  let timer = null;

  function show(i) {
    index = (i + cards.length) % cards.length;
    cards.forEach((card, n) => card.classList.toggle("is-active", n === index));
    dots.forEach((dot, n) => {
      dot.classList.toggle("is-active", n === index);
      dot.setAttribute("aria-selected", String(n === index));
    });
  }

  function autoPlay() {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 7000);
  }

  dots.forEach((dot) =>
    dot.addEventListener("click", () => {
      show(Number(dot.dataset.slide));
      autoPlay();
    })
  );
  document.getElementById("t-prev").addEventListener("click", () => {
    show(index - 1);
    autoPlay();
  });
  document.getElementById("t-next").addEventListener("click", () => {
    show(index + 1);
    autoPlay();
  });

  show(0);
  autoPlay();

  /* ---------- Trip like button ---------- */
  const like = document.querySelector(".trip-card__like");
  like.addEventListener("click", () => {
    const liked = like.classList.toggle("is-liked");
    like.setAttribute("aria-pressed", String(liked));
  });

  /* ---------- Subscribe form ---------- */
  const form = document.getElementById("subscribe-form");
  const email = document.getElementById("email");
  const feedback = document.getElementById("subscribe-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

    feedback.classList.remove("is-error", "is-success");
    if (!valid) {
      feedback.textContent = "Please enter a valid email address.";
      feedback.classList.add("is-error");
      email.focus();
      return;
    }
    feedback.textContent = "Thanks for subscribing!";
    feedback.classList.add("is-success");
    form.reset();
  });
})();
