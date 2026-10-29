/**
 * ==============================================================================
 * Ironwood Athletic Club - Cinematic Motion System (GSAP 3.12.5 + ScrollTrigger)
 * ==============================================================================
 * Controls:
 * - Hero entrance choreography timeline (line draw, letterbox bars, light sweep, word reveal)
 * - Three Worlds scene cycler with slice wipe & dot controls
 * - Scrubbed video band expansion & word-by-word reveal
 * - Inset clip-path image reveals & card stagger physics
 * - Magnetic pull on primary CTAs (fine pointer only)
 * - Timetable row stagger re-triggers
 * - MatchMedia adaptation (desktop, mobile, prefers-reduced-motion)
 */

(function () {
  "use strict";

  // Check if GSAP is available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger not loaded. Site remains fully readable without motion.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Progressive enhancement: add js-motion to <html> only after confirming GSAP
  document.documentElement.classList.add("js-motion");

  const CONFIG = window.SITE_CONFIG || {};
  let heroCycleTimer = null;
  let currentSceneIndex = 0;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----------------------------------------------------------------------------
  // 1. Hero Entrance Choreography Timeline
  // ----------------------------------------------------------------------------
  function initHeroEntrance() {
    const isMobile = window.innerWidth <= 1024;
    const heroImg1 = document.getElementById("hero-img-1");
    const letterboxTop = document.getElementById("letterbox-top");
    const letterboxBottom = document.getElementById("letterbox-bottom");
    const introLine = document.getElementById("hero-intro-line");
    const lightSweep = document.getElementById("hero-light-sweep");
    const header = document.getElementById("site-header");
    const words = document.querySelectorAll(".hero-word");
    const subline = document.getElementById("hero-subline");
    const ctas = document.querySelectorAll(".hero-ctas .btn");
    const pulseRing = document.getElementById("hero-pulse-ring");
    const controls = document.querySelector(".hero-controls");

    if (isReducedMotion) {
      // Immediate clean static display
      if (letterboxTop) letterboxTop.style.display = "none";
      if (letterboxBottom) letterboxBottom.style.display = "none";
      if (introLine) introLine.style.display = "none";
      if (lightSweep) lightSweep.style.display = "none";
      gsap.set([header, words, subline, ctas, controls], { opacity: 1, y: 0 });
      initSceneCycle();
      return;
    }

    // Set initial states
    gsap.set(header, { y: -50, opacity: 0 });
    gsap.set(words, { yPercent: 110 });
    gsap.set(subline, { opacity: 0, y: 25 });
    gsap.set(ctas, { opacity: 0, y: 30 });
    gsap.set(controls, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        initSceneCycle();
      }
    });

    if (!isMobile) {
      // Desktop Full Entrance Choreography (per Section 6 timing spec)
      // 0.0s: Thin orange line draws across (0.6s), then wipes up
      tl.to(introLine, { scaleX: 1, duration: 0.6, ease: "expo.inOut" })
        .to(introLine, { yPercent: -100, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.6);

      // 0.8s: Letterbox bars slide away (1.2s, power4.inOut); photo 1 settles 115% -> 105%
      tl.to(letterboxTop, { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, 0.8)
        .to(letterboxBottom, { yPercent: 100, duration: 1.2, ease: "power4.inOut" }, 0.8)
        .fromTo(heroImg1, { scale: 1.15, opacity: 0.4 }, { scale: 1.05, opacity: 1, duration: 1.4, ease: "power3.out" }, 0.8);

      // 1.4s: Orange light sweep crosses the frame (1.0s)
      if (lightSweep) {
        tl.fromTo(lightSweep, { x: "-80%", opacity: 0 }, { x: "220%", opacity: 1, duration: 1.0, ease: "power2.inOut" }, 1.4);
      }

      // 1.6s: Navigation fades down (0.6s)
      tl.to(header, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.6);

      // 1.8s: Headline words rise from behind masks (0.9s, expo.out, 0.08s stagger)
      tl.to(words, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" }, 1.8);

      // 2.6s: Supporting line fades up (0.6s)
      tl.to(subline, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.6);

      // 2.9s: CTAs rise; one soft orange pulse ring plays once
      tl.to(ctas, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "expo.out" }, 2.9);
      if (pulseRing) {
        tl.fromTo(pulseRing, { scale: 1, opacity: 0.8 }, { scale: 1.35, opacity: 0, duration: 1.0, ease: "power2.out" }, 3.1);
      }

      // 3.3s: Scene counter, dots and scroll cue appear
      tl.to(controls, { opacity: 1, duration: 0.6, ease: "power2.out" }, 3.3);

    } else {
      // Mobile Streamlined Entrance (Skip letterbox bars, keep orange line & word reveal)
      if (letterboxTop) letterboxTop.style.display = "none";
      if (letterboxBottom) letterboxBottom.style.display = "none";
      if (lightSweep) lightSweep.style.display = "none";

      tl.to(introLine, { scaleX: 1, duration: 0.5, ease: "expo.inOut" })
        .to(introLine, { opacity: 0, duration: 0.2 }, 0.5)
        .to(header, { y: 0, opacity: 1, duration: 0.4 }, 0.5)
        .to(words, { yPercent: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" }, 0.6)
        .to(subline, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
        .to(ctas, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 1.1)
        .to(controls, { opacity: 1, duration: 0.5 }, 1.3);
    }
  }

  // ----------------------------------------------------------------------------
  // 2. 'The Three Worlds' Scene Cycler
  // ----------------------------------------------------------------------------
  function initSceneCycle() {
    const scenes = document.querySelectorAll(".hero-scene");
    const dots = document.querySelectorAll(".hero-dot");
    const counter = document.getElementById("hero-counter");
    const label = document.getElementById("hero-scene-label");

    if (!scenes || scenes.length <= 1) return;

    const intervalTime = window.innerWidth <= 1024 ? 5000 : 6000;

    function goToScene(targetIndex) {
      if (targetIndex === currentSceneIndex) return;
      const outgoing = scenes[currentSceneIndex];
      const incoming = scenes[targetIndex];
      const isMobile = window.innerWidth <= 1024;

      // Update indicators
      currentSceneIndex = targetIndex;
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === targetIndex);
        dot.setAttribute("aria-selected", idx === targetIndex ? "true" : "false");
      });

      if (counter) counter.textContent = `0${targetIndex + 1} / 03`;
      if (label && incoming.dataset.label) {
        gsap.to(label, {
          y: -10,
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            label.textContent = incoming.dataset.label;
            gsap.fromTo(label, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
          }
        });
      }

      if (isReducedMotion) {
        // Reduced motion: 0.4s simple crossfade
        scenes.forEach(s => s.classList.remove("active"));
        incoming.classList.add("active");
        gsap.fromTo(incoming, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        return;
      }

      incoming.classList.add("active");

      if (!isMobile) {
        // Desktop Cinematic Slice Wipe (1.4s clip-path slice)
        gsap.fromTo(
          incoming,
          { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 1, zIndex: 3 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.4,
            ease: "power4.inOut",
            onComplete: () => {
              outgoing.classList.remove("active");
              incoming.style.zIndex = "2";
              gsap.set(incoming, { clearProps: "clipPath" });
            }
          }
        );
        // Outgoing photo pushes in gently
        const outImg = outgoing.querySelector("img");
        if (outImg) {
          gsap.to(outImg, { scale: 1.08, duration: 1.4, ease: "power2.out" });
        }
      } else {
        // Mobile: Smooth crossfade + slight scale
        gsap.fromTo(incoming, { opacity: 0, scale: 1.05 }, {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => {
            outgoing.classList.remove("active");
          }
        });
      }
    }

    function startCycle() {
      stopCycle();
      if (!isReducedMotion) {
        heroCycleTimer = setInterval(() => {
          const next = (currentSceneIndex + 1) % scenes.length;
          goToScene(next);
        }, intervalTime);
      }
    }

    function stopCycle() {
      if (heroCycleTimer) {
        clearInterval(heroCycleTimer);
        heroCycleTimer = null;
      }
    }

    // Attach click events to dots
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        goToScene(idx);
        startCycle();
      });
    });

    // Pause on hidden tab
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopCycle();
      else startCycle();
    });

    startCycle();
  }

  // ----------------------------------------------------------------------------
  // 3. Scroll-Out Parallax on Hero
  // ----------------------------------------------------------------------------
  function initHeroParallax() {
    if (isReducedMotion) return;

    const hero = document.getElementById("hero");
    const heroScenes = document.getElementById("hero-scenes-container");
    const heroContent = document.querySelector(".hero-content-wrapper");

    if (hero && heroScenes && heroContent) {
      gsap.to(heroScenes, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(heroContent, {
        opacity: 0,
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "20% top",
          end: "70% top",
          scrub: true
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 4. Vertical Reels Stage Reveal
  // ----------------------------------------------------------------------------
  function initVideoBand() {
    const videoSection = document.getElementById("video-band");
    const stageWrapper = document.getElementById("reels-stage-wrapper");

    if (!videoSection || !stageWrapper) return;
    if (isReducedMotion) return;

    gsap.fromTo(
      stageWrapper,
      { opacity: 0.6, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videoSection,
          start: "top 75%"
        }
      }
    );
  }

  // ----------------------------------------------------------------------------
  // 5. Section Reveals & Card Insets
  // ----------------------------------------------------------------------------
  function initSectionReveals() {
    if (isReducedMotion) return;

    // Intro Split photo reveal through clip-path mask
    const introMask = document.getElementById("intro-media-mask");
    if (introMask) {
      gsap.fromTo(
        introMask,
        { clipPath: "inset(15% 15% 15% 15%)", opacity: 0.5 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: introMask,
            start: "top 80%"
          }
        }
      );
    }

    // Facilities Bento Grid: Reveal tiles from subtle alternating offsets
    const bentoTiles = document.querySelectorAll(".bento-tile");
    if (bentoTiles.length > 0) {
      gsap.from(bentoTiles, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "#facilities",
          start: "top 75%"
        }
      });
    }

    // Trainers: slide in from subtle alternating sides
    const trainerCards = document.querySelectorAll(".trainer-card");
    if (trainerCards.length > 0) {
      gsap.from(trainerCards, {
        y: 60,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "#trainers",
          start: "top 75%"
        }
      });
    }

    // Membership Plans cards rise
    const planCards = document.querySelectorAll(".plan-card");
    if (planCards.length > 0) {
      gsap.from(planCards, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "#plans-grid",
          start: "top 80%"
        }
      });
    }

    // Footer brand word huge reveal
    const footerBrand = document.getElementById("footer-brand-huge");
    if (footerBrand) {
      gsap.fromTo(
        footerBrand,
        { opacity: 0, y: 50 },
        {
          opacity: 0.04,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#site-footer",
            start: "top 90%"
          }
        }
      );
    }
  }

  // ----------------------------------------------------------------------------
  // 6. Programs 3D Tilt (Desktop Fine Pointer Only)
  // ----------------------------------------------------------------------------
  function initProgramTilts() {
    if (isReducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = document.querySelectorAll(".program-card");
    cards.forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 7. Magnetic Pull on Primary CTAs (Desktop Fine Pointer Only)
  // ----------------------------------------------------------------------------
  function initMagneticButtons() {
    if (isReducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const btns = document.querySelectorAll(".btn-primary");
    btns.forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        // Max 12px pull
        const clampX = Math.max(-12, Math.min(12, x * 0.25));
        const clampY = Math.max(-12, Math.min(12, y * 0.25));

        gsap.to(btn, { x: clampX, y: clampY, duration: 0.2, ease: "power2.out" });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 8. Timetable Row Stagger Trigger (Exposed to app.js)
  // ----------------------------------------------------------------------------
  window.animateTimetableRows = function () {
    if (isReducedMotion) return;
    const rows = document.querySelectorAll(".timetable-row");
    if (rows.length > 0) {
      gsap.fromTo(
        rows,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }
      );
    }
  };

  // ----------------------------------------------------------------------------
  // 9. Startup & Refresh Sync
  // ----------------------------------------------------------------------------
  function initMotion() {
    initHeroEntrance();
    initHeroParallax();
    initVideoBand();
    initSectionReveals();
    initProgramTilts();
    initMagneticButtons();

    // Call ScrollTrigger.refresh() after fonts and hero image load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMotion);
  } else {
    initMotion();
  }
})();
