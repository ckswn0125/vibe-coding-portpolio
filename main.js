document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const backToTop = document.getElementById("backToTop");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");

  /* Mobile menu */
  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "메뉴 닫기");
    document.body.classList.add("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    if (nav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* Header shadow + back to top */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 12);
    backToTop.classList.toggle("is-visible", y > 400);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Active nav link by section */
  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    let current = "home";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.replace("#", "");
      link.classList.toggle("is-active", href === current);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* Scroll reveal */
  const revealTargets = document.querySelectorAll(
    ".hero__content, .hero__visual, .about__content, .about__visual, .skill-card, .project-card, .contact__banner"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el, index) => {
    if (el.classList.contains("skill-card") || el.classList.contains("project-card")) {
      el.style.transitionDelay = `${(index % 6) * 0.06}s`;
    }
    observer.observe(el);
  });

  /* Close menu on resize to desktop */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
