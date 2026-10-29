/**
 * ==============================================================================
 * Ironwood Athletic Club - Core Application Logic
 * ==============================================================================
 * Renders dynamic content from SITE_CONFIG, injects CSS custom properties,
 * enforces feature toggles, manages navigation, timetable filtering,
 * testimonials, lightbox, accordion, and dual-tab form validation.
 */

(function () {
  "use strict";

  // Ensure SITE_CONFIG exists
  if (!window.SITE_CONFIG) {
    console.error("SITE_CONFIG is missing. Please ensure js/config.js is loaded first.");
    return;
  }

  const CONFIG = window.SITE_CONFIG;

  // ----------------------------------------------------------------------------
  // 1. Theme Variables Injection
  // ----------------------------------------------------------------------------
  function applyTheme() {
    const root = document.documentElement;
    const theme = CONFIG.theme || {};
    if (theme.bg) root.style.setProperty("--bg", theme.bg);
    if (theme.surface) root.style.setProperty("--surface", theme.surface);
    if (theme.surfaceRaised) root.style.setProperty("--surface-raised", theme.surfaceRaised);
    if (theme.border) root.style.setProperty("--border", theme.border);
    if (theme.text) root.style.setProperty("--text", theme.text);
    if (theme.textMuted) root.style.setProperty("--text-muted", theme.textMuted);
    if (theme.accent) root.style.setProperty("--accent", theme.accent);
    if (theme.accentGlow) root.style.setProperty("--accent-glow", theme.accentGlow);
    if (theme.error) root.style.setProperty("--error", theme.error);
    if (theme.success) root.style.setProperty("--success", theme.success);
    if (theme.fontHeadline) root.style.setProperty("--font-headline", theme.fontHeadline);
    if (theme.fontBody) root.style.setProperty("--font-body", theme.fontBody);
  }

  // ----------------------------------------------------------------------------
  // 2. Feature Toggles & Clean DOM Pruning
  // ----------------------------------------------------------------------------
  function applyFeatures() {
    const feat = CONFIG.features || {};

    const sectionFeatureMap = {
      video: "#video-band",
      intro: "#intro",
      programs: "#programs",
      facilities: "#facilities",
      trainers: "#trainers",
      plans: "#plans",
      timetable: "#timetable",
      gallery: "#gallery",
      testimonials: "#testimonials",
      faq: "#faq",
      location: "#location",
      stickyMobileBar: "#sticky-mobile-bar"
    };

    // Remove or hide sections if feature switch is false
    Object.keys(sectionFeatureMap).forEach(key => {
      if (feat[key] === false) {
        const el = document.querySelector(sectionFeatureMap[key]);
        if (el) el.remove();

        // Also clean up navigation links matching this section href
        const targetHref = sectionFeatureMap[key];
        document.querySelectorAll(`a[href="${targetHref}"]`).forEach(link => {
          const li = link.closest("li");
          if (li) li.remove();
          else link.remove();
        });
      }
    });

    // Contact buttons feature controls
    if (feat.call === false) {
      const navPhone = document.getElementById("nav-phone-link");
      if (navPhone) navPhone.remove();
      const cardCall = document.getElementById("contact-card-call");
      if (cardCall) cardCall.remove();
      const stickyCall = document.getElementById("sticky-call-btn");
      if (stickyCall) stickyCall.remove();
    }

    if (feat.whatsapp === false) {
      const heroWa = document.getElementById("hero-secondary-cta");
      if (heroWa) heroWa.remove();
      const cardWa = document.getElementById("contact-card-whatsapp");
      if (cardWa) cardWa.remove();
      const stickyWa = document.getElementById("sticky-wa-btn");
      if (stickyWa) stickyWa.remove();
    }

    if (feat.email === false) {
      const cardEmail = document.getElementById("contact-card-email");
      if (cardEmail) cardEmail.remove();
    }

    if (feat.trial === false) {
      const navTrial = document.getElementById("nav-trial-btn");
      if (navTrial) navTrial.remove();
      const heroTrial = document.getElementById("hero-primary-cta");
      if (heroTrial) heroTrial.remove();
      const stickyTrial = document.getElementById("sticky-trial-btn");
      if (stickyTrial) stickyTrial.remove();
      const mobileTrial = document.getElementById("mobile-menu-trial-btn");
      if (mobileTrial) mobileTrial.remove();
      const tabTrial = document.getElementById("tab-trial-btn");
      if (tabTrial) tabTrial.remove();
      const formTrial = document.getElementById("form-trial");
      if (formTrial) formTrial.remove();

      // Automatically activate membership tab if trial is removed
      const tabMember = document.getElementById("tab-membership-btn");
      const formMember = document.getElementById("form-membership");
      if (tabMember && formMember) {
        tabMember.classList.add("active");
        tabMember.setAttribute("aria-selected", "true");
        formMember.style.display = "flex";
      }
    }

    if (feat.membership === false) {
      const tabMember = document.getElementById("tab-membership-btn");
      if (tabMember) tabMember.remove();
      const formMember = document.getElementById("form-membership");
      if (formMember) formMember.remove();
    }
  }

  // ----------------------------------------------------------------------------
  // 3. Brand & Global Details Binding
  // ----------------------------------------------------------------------------
  function populateBrand() {
    const brand = CONFIG.brand || {};

    // Page title and meta
    if (brand.name && brand.city) {
      document.title = `${brand.name} | ${brand.city} Performance Facility`;
    }

    // Phone bindings
    const phoneDisplay = brand.phone ? brand.phone.display : "";
    const phoneTel = brand.phone ? brand.phone.tel : "";
    const phoneTextEl = document.getElementById("nav-phone-text");
    if (phoneTextEl) phoneTextEl.textContent = phoneDisplay;

    document.querySelectorAll("a[href^='tel:']").forEach(link => {
      link.href = `tel:${phoneTel}`;
    });
    const contactPhoneVal = document.getElementById("contact-phone-val");
    if (contactPhoneVal) contactPhoneVal.textContent = phoneDisplay;

    // WhatsApp bindings
    const waNumber = brand.whatsapp ? brand.whatsapp.number : "";
    const waMsg = brand.whatsapp ? encodeURIComponent(brand.whatsapp.prefilledMessage || "") : "";
    const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;
    document.querySelectorAll("a[href^='https://wa.me']").forEach(link => {
      link.href = waUrl;
    });

    // Email bindings
    const emailVal = brand.email || "";
    document.querySelectorAll("a[href^='mailto:']").forEach(link => {
      link.href = `mailto:${emailVal}`;
    });
    const contactEmailVal = document.getElementById("contact-email-val");
    if (contactEmailVal) contactEmailVal.textContent = emailVal;
    const footerEmail = document.getElementById("footer-email");
    if (footerEmail) footerEmail.innerHTML = `<a href="mailto:${emailVal}">${emailVal}</a>`;

    // Address & City
    const fullAddress = brand.fullAddress || "";
    const contactAddrVal = document.getElementById("contact-address-val");
    if (contactAddrVal) contactAddrVal.textContent = fullAddress;
    const mapAddressText = document.getElementById("map-address-text");
    if (mapAddressText) mapAddressText.textContent = fullAddress;
    const footerAddress = document.getElementById("footer-address");
    if (footerAddress) footerAddress.textContent = fullAddress;

    // Directions Link
    const mapDirectionsLink = document.getElementById("map-directions-link");
    if (mapDirectionsLink) {
      mapDirectionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    }

    // Hero Eyebrow
    const heroEyebrow = document.getElementById("hero-eyebrow");
    if (heroEyebrow) heroEyebrow.textContent = `${brand.city}, ${brand.state}`;

    // Taglines & Footers
    const footerTagline = document.getElementById("footer-tagline");
    if (footerTagline) footerTagline.textContent = brand.tagline || "";
    const footerBrandName = document.getElementById("footer-brand-name");
    if (footerBrandName) footerBrandName.textContent = brand.name || "";
    const mapBrandName = document.getElementById("map-brand-name");
    if (mapBrandName) mapBrandName.textContent = brand.name || "";
    const footerYear = document.getElementById("footer-year");
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // Social Strip in Footer (Hide empty ones)
    const socialStrip = document.getElementById("footer-social-strip");
    if (socialStrip && brand.social) {
      socialStrip.innerHTML = "";
      const socialIcons = {
        instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
        facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
        youtube: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="YouTube"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`
      };

      Object.keys(brand.social).forEach(network => {
        const url = brand.social[network];
        if (url && url.trim().length > 0) {
          const a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "social-icon-btn";
          a.setAttribute("aria-label", network);
          a.innerHTML = socialIcons[network] || network;
          socialStrip.appendChild(a);
        }
      });
    }

    // Video band poster & src
    if (CONFIG.video) {
      const gymVideo = document.getElementById("gym-video");
      if (gymVideo) {
        if (CONFIG.video.poster) gymVideo.poster = CONFIG.video.poster;
        const source = gymVideo.querySelector("source");
        if (source && CONFIG.video.file) source.src = CONFIG.video.file;
      }
      const overlayLine = document.getElementById("video-overlay-line");
      if (overlayLine && CONFIG.video.overlayLine) {
        overlayLine.textContent = CONFIG.video.overlayLine;
      }
    }
  }

  // ----------------------------------------------------------------------------
  // 4. Programs Rendering
  // ----------------------------------------------------------------------------
  function renderPrograms() {
    const grid = document.getElementById("programs-grid");
    if (!grid || !CONFIG.programs) return;

    grid.innerHTML = "";
    CONFIG.programs.forEach(prog => {
      const card = document.createElement("div");
      card.className = "program-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("data-program-id", prog.id);

      const chipsHtml = (prog.chips || [])
        .map(chip => `<span class="chip">${chip}</span>`)
        .join("");

      card.innerHTML = `
        <div class="program-img-wrapper">
          <img src="${prog.image}" alt="${prog.alt || prog.title}" loading="lazy">
          <div class="program-gradient-overlay" aria-hidden="true"></div>
        </div>
        <div class="program-body">
          <div class="program-chips">${chipsHtml}</div>
          <h3 class="program-title">${prog.title}</h3>
          <p class="program-desc">${prog.desc}</p>
          <div class="program-enquire">
            <span>Enquire</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>
      `;

      // Click / Enter preselects trial interest & scrolls to enquiry
      const handleSelect = () => {
        const select = document.getElementById("trial-interest");
        if (select) {
          select.value = prog.id;
        }
        // Activate Free Trial tab
        const tabTrial = document.getElementById("tab-trial-btn");
        if (tabTrial) tabTrial.click();
        const enquiry = document.getElementById("enquiry");
        if (enquiry) enquiry.scrollIntoView({ behavior: "smooth" });
      };

      card.addEventListener("click", handleSelect);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelect();
        }
      });

      grid.appendChild(card);
    });
  }

  // ----------------------------------------------------------------------------
  // 5. Facilities Bento Grid & Amenities
  // ----------------------------------------------------------------------------
  function renderFacilities() {
    const bento = document.getElementById("bento-grid");
    if (bento && CONFIG.facilities && CONFIG.facilities.tiles) {
      bento.innerHTML = "";
      CONFIG.facilities.tiles.forEach(tile => {
        const item = document.createElement("div");
        item.className = `bento-tile ${tile.gridClass || ""}`;
        item.innerHTML = `
          <img src="${tile.image}" alt="${tile.alt || tile.title}" loading="lazy">
          <div class="bento-caption">
            <h3 class="bento-title">${tile.title}</h3>
            <p class="bento-desc">${tile.desc}</p>
          </div>
        `;
        bento.appendChild(item);
      });
    }

    const amenitiesContainer = document.getElementById("amenities-strip");
    if (amenitiesContainer && CONFIG.facilities && CONFIG.facilities.amenities) {
      amenitiesContainer.innerHTML = "";
      const iconSVGs = {
        barbell: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2" /><line x1="6" y1="12" x2="18" y2="12" /></svg>`,
        turf: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
        sauna: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
        shower: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h7a4 4 0 0 1 4 4v12M15 14l-2 2m4 0l-2 2"/></svg>`,
        towel: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10"/></svg>`,
        locker: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
        water: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
        wifi: `<svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>`
      };

      CONFIG.facilities.amenities.forEach(amenity => {
        const div = document.createElement("div");
        div.className = "amenity-item";
        div.innerHTML = `
          ${iconSVGs[amenity.icon] || iconSVGs.barbell}
          <span>${amenity.label}</span>
        `;
        amenitiesContainer.appendChild(div);
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 6. Trainers Rendering
  // ----------------------------------------------------------------------------
  function renderTrainers() {
    const grid = document.getElementById("trainers-grid");
    if (!grid || !CONFIG.trainers) return;

    grid.innerHTML = "";
    const showSample = CONFIG.forms ? CONFIG.forms.sampleLabels : true;

    CONFIG.trainers.forEach(trainer => {
      const card = document.createElement("div");
      card.className = "trainer-card";
      card.innerHTML = `
        <div class="trainer-photo-wrap">
          <img src="${trainer.image}" alt="${trainer.alt || trainer.name}" loading="lazy">
        </div>
        <div class="trainer-body">
          <div class="trainer-specialty-badge">${trainer.specialty}</div>
          <h3 class="trainer-name">${trainer.name}</h3>
          <div class="trainer-role">${trainer.role} ${showSample ? '<span class="sample-badge">Sample Profile</span>' : ''}</div>
          <p class="trainer-bio">${trainer.bio}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ----------------------------------------------------------------------------
  // 7. Membership Plans & Billing Toggle
  // ----------------------------------------------------------------------------
  let isAnnualBilling = false;

  function renderPlans() {
    const grid = document.getElementById("plans-grid");
    if (!grid || !CONFIG.plans) return;

    grid.innerHTML = "";
    const showSample = CONFIG.forms ? CONFIG.forms.sampleLabels : true;

    CONFIG.plans.forEach(plan => {
      const card = document.createElement("div");
      card.className = `plan-card ${plan.popular ? "popular" : ""}`;
      card.setAttribute("data-plan-id", plan.id);

      const price = isAnnualBilling ? plan.annualPrice : plan.weeklyPrice;
      const period = isAnnualBilling ? "/ year" : "/ week";

      const badgeHtml = plan.popular
        ? `<div class="plan-badge-top">${plan.badge || "Most Popular"}</div>`
        : "";

      const featuresHtml = (plan.features || [])
        .map(feat => `
          <li class="plan-feature-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${feat}</span>
          </li>
        `)
        .join("");

      card.innerHTML = `
        ${badgeHtml}
        <h3 class="plan-name">${plan.name}</h3>
        <p class="plan-desc">${plan.desc}</p>
        <div class="plan-price-box">
          <span class="price-currency">$</span>
          <span class="price-number" data-weekly="${plan.weeklyPrice}" data-annual="${plan.annualPrice}">${price}</span>
          <span class="price-period">${period}</span>
        </div>
        <ul class="plan-features-list">
          ${featuresHtml}
        </ul>
        <button class="btn ${plan.popular ? "btn-primary" : "btn-secondary"} btn-plan-select" data-plan-id="${plan.id}">
          Select ${plan.name}
        </button>
      `;

      // Select plan action
      const btn = card.querySelector(".btn-plan-select");
      btn.addEventListener("click", () => {
        const select = document.getElementById("member-plan");
        if (select) select.value = plan.id;
        const tabMember = document.getElementById("tab-membership-btn");
        if (tabMember) tabMember.click();
        const enquiry = document.getElementById("enquiry");
        if (enquiry) enquiry.scrollIntoView({ behavior: "smooth" });
      });

      grid.appendChild(card);
    });

    // Toggle button handler
    const toggleBtn = document.getElementById("plans-billing-toggle");
    const weeklyLabel = document.getElementById("toggle-weekly-label");
    const annualLabel = document.getElementById("toggle-annual-label");

    if (toggleBtn) {
      toggleBtn.onclick = () => {
        isAnnualBilling = !isAnnualBilling;
        toggleBtn.classList.toggle("annual", isAnnualBilling);
        toggleBtn.setAttribute("aria-checked", isAnnualBilling ? "true" : "false");
        if (weeklyLabel) weeklyLabel.classList.toggle("active", !isAnnualBilling);
        if (annualLabel) annualLabel.classList.toggle("active", isAnnualBilling);

        // Crossfade prices
        document.querySelectorAll(".price-number").forEach(numEl => {
          numEl.style.opacity = "0";
          setTimeout(() => {
            const weekly = numEl.getAttribute("data-weekly");
            const annual = numEl.getAttribute("data-annual");
            numEl.textContent = isAnnualBilling ? annual : weekly;
            numEl.style.opacity = "1";
          }, 150);
        });

        document.querySelectorAll(".price-period").forEach(periodEl => {
          periodEl.textContent = isAnnualBilling ? "/ year" : "/ week";
        });
      };
    }
  }

  // ----------------------------------------------------------------------------
  // 8. Timetable Schedule & Filtering
  // ----------------------------------------------------------------------------
  let activeTimetableDayIndex = 0;
  let activeTimetableCategory = "all";

  function initTimetable() {
    const timetable = CONFIG.timetable;
    if (!timetable || !timetable.days) return;

    const dayTabsContainer = document.getElementById("timetable-day-tabs");
    const chipsContainer = document.getElementById("timetable-chips");

    if (dayTabsContainer) {
      dayTabsContainer.innerHTML = "";
      timetable.days.forEach((dayObj, idx) => {
        const btn = document.createElement("button");
        btn.className = `day-tab ${idx === activeTimetableDayIndex ? "active" : ""}`;
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", idx === activeTimetableDayIndex ? "true" : "false");
        btn.textContent = `${dayObj.day}`;
        btn.addEventListener("click", () => {
          activeTimetableDayIndex = idx;
          document.querySelectorAll(".day-tab").forEach((tab, tIdx) => {
            tab.classList.toggle("active", tIdx === idx);
            tab.setAttribute("aria-selected", tIdx === idx ? "true" : "false");
          });
          renderTimetableRows();
        });
        dayTabsContainer.appendChild(btn);
      });
    }

    if (chipsContainer && timetable.categories) {
      chipsContainer.innerHTML = "";
      timetable.categories.forEach(cat => {
        const chip = document.createElement("button");
        chip.className = `category-chip ${cat.id === activeTimetableCategory ? "active" : ""}`;
        chip.textContent = cat.label;
        chip.addEventListener("click", () => {
          activeTimetableCategory = cat.id;
          document.querySelectorAll(".category-chip").forEach(c => {
            c.classList.toggle("active", c === chip);
          });
          renderTimetableRows();
        });
        chipsContainer.appendChild(chip);
      });
    }

    renderTimetableRows();
  }

  function renderTimetableRows() {
    const list = document.getElementById("timetable-list");
    if (!list || !CONFIG.timetable || !CONFIG.timetable.days) return;

    const currentDay = CONFIG.timetable.days[activeTimetableDayIndex];
    if (!currentDay) return;

    list.innerHTML = "";
    const filtered = (currentDay.sessions || []).filter(session => {
      if (activeTimetableCategory === "all") return true;
      return session.category === activeTimetableCategory;
    });

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); background: var(--surface); border-radius: 12px; border: 1px solid var(--border);">
          No sessions scheduled for this category on ${currentDay.day}.
        </div>
      `;
      return;
    }

    filtered.forEach(session => {
      const row = document.createElement("div");
      row.className = "timetable-row";
      row.innerHTML = `
        <div class="row-time">${session.time}</div>
        <div class="row-title">${session.title}</div>
        <div class="row-trainer">${session.trainer}</div>
        <div class="row-level"><span class="chip">${session.level}</span></div>
        <div class="row-action">
          <button class="btn btn-secondary btn-sm btn-book-class" data-class-name="${session.title}" data-category="${session.category}">
            Book Session
          </button>
        </div>
      `;

      row.querySelector(".btn-book-class").addEventListener("click", () => {
        const select = document.getElementById("trial-interest");
        if (select) {
          // Preselect closest program category
          const catMap = {
            strength: "strength-muscle",
            cardio: "cardio-conditioning",
            classes: "group-classes",
            recovery: "recovery-wellness"
          };
          if (catMap[session.category]) select.value = catMap[session.category];
        }
        const tabTrial = document.getElementById("tab-trial-btn");
        if (tabTrial) tabTrial.click();
        const enquiry = document.getElementById("enquiry");
        if (enquiry) enquiry.scrollIntoView({ behavior: "smooth" });
      });

      list.appendChild(row);
    });

    // Trigger row stagger animation if motion is enabled
    if (window.animateTimetableRows) {
      window.animateTimetableRows();
    }
  }

  // ----------------------------------------------------------------------------
  // 9. Gallery & Lightbox
  // ----------------------------------------------------------------------------
  let currentLightboxIndex = 0;

  function initGallery() {
    const masonry = document.getElementById("gallery-masonry");
    if (!masonry || !CONFIG.gallery) return;

    masonry.innerHTML = "";
    CONFIG.gallery.forEach((item, idx) => {
      const tile = document.createElement("div");
      tile.className = "gallery-tile";
      tile.setAttribute("role", "button");
      tile.setAttribute("tabindex", "0");
      tile.setAttribute("aria-label", `View ${item.title}`);
      tile.innerHTML = `
        <img src="${item.image}" alt="${item.alt || item.title}" loading="lazy">
        <div class="gallery-tile-overlay">
          <div class="gallery-tile-caption">${item.title}</div>
        </div>
      `;

      const openTile = () => openLightbox(idx);
      tile.addEventListener("click", openTile);
      tile.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openTile();
        }
      });

      masonry.appendChild(tile);
    });

    initLightboxEvents();
  }

  function openLightbox(index) {
    if (!CONFIG.gallery || !CONFIG.gallery[index]) return;
    currentLightboxIndex = index;
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");

    const item = CONFIG.gallery[index];
    img.src = item.image;
    img.alt = item.alt || item.title;
    caption.textContent = item.title;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    // Focus close button for accessible focus trapping
    const closeBtn = document.getElementById("lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function changeLightbox(delta) {
    if (!CONFIG.gallery) return;
    let nextIdx = currentLightboxIndex + delta;
    if (nextIdx < 0) nextIdx = CONFIG.gallery.length - 1;
    if (nextIdx >= CONFIG.gallery.length) nextIdx = 0;
    openLightbox(nextIdx);
  }

  function initLightboxEvents() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => changeLightbox(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => changeLightbox(1));

    if (lightbox) {
      lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
      });

      // Keyboard trap & controls (Esc, ArrowLeft, ArrowRight)
      window.addEventListener("keydown", e => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") changeLightbox(-1);
        else if (e.key === "ArrowRight") changeLightbox(1);
      });

      // Touch swipe gestures
      let touchStartX = 0;
      let touchEndX = 0;
      lightbox.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) changeLightbox(-1); // Swiped right -> prev
          else changeLightbox(1);           // Swiped left -> next
        }
      }, { passive: true });
    }
  }

  // ----------------------------------------------------------------------------
  // 10. Testimonials Carousel
  // ----------------------------------------------------------------------------
  let testimonialIndex = 0;
  let testimonialTimer = null;
  const TESTIMONIAL_INTERVAL = 7000;

  function initTestimonials() {
    const tests = CONFIG.testimonials;
    if (!tests || tests.length === 0) return;

    const prevBtn = document.getElementById("test-prev");
    const nextBtn = document.getElementById("test-next");
    const card = document.getElementById("testimonials-card");

    function showTestimonial(idx) {
      testimonialIndex = (idx + tests.length) % tests.length;
      const t = tests[testimonialIndex];

      const textEl = document.getElementById("testimonial-text");
      const nameEl = document.getElementById("author-name");
      const roleEl = document.getElementById("author-role");

      if (textEl) {
        textEl.style.opacity = "0";
        setTimeout(() => {
          textEl.textContent = `"${t.text}"`;
          textEl.style.opacity = "1";
        }, 150);
      }
      if (nameEl) nameEl.textContent = t.name;
      if (roleEl) {
        roleEl.innerHTML = `${t.role} <span class="sample-badge">Sample Review</span>`;
      }
    }

    function startTimer() {
      stopTimer();
      testimonialTimer = setInterval(() => {
        showTestimonial(testimonialIndex + 1);
      }, TESTIMONIAL_INTERVAL);
    }

    function stopTimer() {
      if (testimonialTimer) {
        clearInterval(testimonialTimer);
        testimonialTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showTestimonial(testimonialIndex - 1);
        startTimer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showTestimonial(testimonialIndex + 1);
        startTimer();
      });
    }

    if (card) {
      card.addEventListener("mouseenter", stopTimer);
      card.addEventListener("mouseleave", startTimer);
      card.addEventListener("touchstart", stopTimer, { passive: true });
      card.addEventListener("touchend", startTimer, { passive: true });
    }

    // Pause on visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });

    showTestimonial(0);
    startTimer();
  }

  // ----------------------------------------------------------------------------
  // 11. FAQ Accordion
  // ----------------------------------------------------------------------------
  function initFAQ() {
    const list = document.getElementById("faq-list");
    if (!list || !CONFIG.faqs) return;

    list.innerHTML = "";
    CONFIG.faqs.forEach((faq, idx) => {
      const item = document.createElement("div");
      item.className = "faq-item";
      item.innerHTML = `
        <button class="faq-trigger" id="faq-btn-${idx}" aria-expanded="false" aria-controls="faq-content-${idx}">
          <span>${faq.q}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <div class="faq-content" id="faq-content-${idx}" role="region" aria-labelledby="faq-btn-${idx}">
          <div class="faq-body">${faq.a}</div>
        </div>
      `;

      const trigger = item.querySelector(".faq-trigger");
      const content = item.querySelector(".faq-content");

      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close other items
        document.querySelectorAll(".faq-item").forEach(other => {
          if (other !== item && other.classList.contains("open")) {
            other.classList.remove("open");
            other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
            other.querySelector(".faq-content").style.maxHeight = "0";
          }
        });

        if (isOpen) {
          item.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
          content.style.maxHeight = "0";
        } else {
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });

      list.appendChild(item);
    });
  }

  // ----------------------------------------------------------------------------
  // 12. Location & Operating Hours Table
  // ----------------------------------------------------------------------------
  function initLocationHours() {
    const tbody = document.getElementById("hours-table-body");
    if (!tbody || !CONFIG.hours) return;

    tbody.innerHTML = "";
    const todayNumeric = new Date().getDay(); // 0 is Sunday, 1 is Monday...

    CONFIG.hours.forEach(hourRow => {
      const tr = document.createElement("tr");
      // Check if today matches numeric days
      const isToday = (hourRow.daysNumeric || []).includes(todayNumeric);
      if (isToday) tr.className = "today-highlight";

      tr.innerHTML = `
        <td>${hourRow.days}</td>
        <td>${hourRow.time}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ----------------------------------------------------------------------------
  // 13. Form Tabs, Validation & Submission Handling
  // ----------------------------------------------------------------------------
  function initForms() {
    const tabTrial = document.getElementById("tab-trial-btn");
    const tabMember = document.getElementById("tab-membership-btn");
    const formTrial = document.getElementById("form-trial");
    const formMember = document.getElementById("form-membership");

    if (tabTrial && tabMember && formTrial && formMember) {
      tabTrial.addEventListener("click", () => {
        tabTrial.classList.add("active");
        tabTrial.setAttribute("aria-selected", "true");
        tabMember.classList.remove("active");
        tabMember.setAttribute("aria-selected", "false");
        formTrial.style.display = "flex";
        formMember.style.display = "none";
      });

      tabMember.addEventListener("click", () => {
        tabMember.classList.add("active");
        tabMember.setAttribute("aria-selected", "true");
        tabTrial.classList.remove("active");
        tabTrial.setAttribute("aria-selected", "false");
        formMember.style.display = "flex";
        formTrial.style.display = "none";
      });
    }

    // Validation Rules
    function validateInput(value, type) {
      if (type === "name") return value.trim().length >= 2;
      if (type === "phone") {
        // Allow digits, spaces, plus, dashes; clean digits must be 8-15
        const cleaned = value.replace(/[\s\+\-\(\)]/g, "");
        return /^\d{8,15}$/.test(cleaned);
      }
      if (type === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      }
      if (type === "required") return value.trim().length > 0;
      return true;
    }

    function handleFieldValidation(inputEl, groupEl, type) {
      const isValid = validateInput(inputEl.value, type);
      if (!isValid) {
        groupEl.classList.add("has-error", "shake");
        setTimeout(() => groupEl.classList.remove("shake"), 400);
      } else {
        groupEl.classList.remove("has-error");
      }
      return isValid;
    }

    // Generic submit setup
    function setupForm(formId, fields, btnId, bannerId, demoNoteId) {
      const form = document.getElementById(formId);
      const submitBtn = document.getElementById(btnId);
      const banner = document.getElementById(bannerId);
      const demoNote = document.getElementById(demoNoteId);

      if (!form || !submitBtn) return;

      // Realtime validation clearing on user typing
      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const group = document.getElementById(f.groupId);
        if (input && group) {
          input.addEventListener("input", () => {
            if (group.classList.contains("has-error")) {
              validateInput(input.value, f.type) && group.classList.remove("has-error");
            }
          });
        }
      });

      form.addEventListener("submit", async e => {
        e.preventDefault();

        let firstInvalid = null;
        let isAllValid = true;

        fields.forEach(f => {
          const input = document.getElementById(f.id);
          const group = document.getElementById(f.groupId);
          if (input && group) {
            const valid = handleFieldValidation(input, group, f.type);
            if (!valid) {
              isAllValid = false;
              if (!firstInvalid) firstInvalid = input;
            }
          }
        });

        if (!isAllValid) {
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // Form is valid: trigger loading state
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        const endpoint = CONFIG.forms ? CONFIG.forms.endpoint : "";
        const accessKey = CONFIG.forms ? CONFIG.forms.accessKey : "";

        try {
          if (endpoint && endpoint.trim().length > 0) {
            if (accessKey) payload.access_key = accessKey;
            const res = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Submission network failure");
          } else {
            // Simulated 1.2s delay
            await new Promise(resolve => setTimeout(resolve, 1200));
          }

          // Show success state
          submitBtn.classList.remove("loading");
          submitBtn.style.display = "none";
          fields.forEach(f => {
            const group = document.getElementById(f.groupId);
            if (group) group.style.display = "none";
          });

          if (banner) banner.classList.add("visible");
          if (demoNote && (!CONFIG.forms || CONFIG.forms.showDemoNote !== false)) {
            demoNote.style.display = "block";
          }
        } catch (err) {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
          alert("Submission could not be completed. Please check your network or reach us directly on WhatsApp.");
        }
      });
    }

    // Wire Free Trial Form
    setupForm(
      "form-trial",
      [
        { id: "trial-name", groupId: "group-trial-name", type: "name" },
        { id: "trial-phone", groupId: "group-trial-phone", type: "phone" },
        { id: "trial-email", groupId: "group-trial-email", type: "email" },
        { id: "trial-interest", groupId: "group-trial-interest", type: "required" }
      ],
      "btn-submit-trial",
      "trial-success-banner",
      "trial-demo-note"
    );

    // Wire Membership Form
    setupForm(
      "form-membership",
      [
        { id: "member-name", groupId: "group-member-name", type: "name" },
        { id: "member-phone", groupId: "group-member-phone", type: "phone" },
        { id: "member-email", groupId: "group-member-email", type: "email" },
        { id: "member-plan", groupId: "group-member-plan", type: "required" }
      ],
      "btn-submit-membership",
      "member-success-banner",
      "member-demo-note"
    );
  }

  // ----------------------------------------------------------------------------
  // 14. Navigation & Mobile Menu Behavior
  // ----------------------------------------------------------------------------
  function initNavigation() {
    const header = document.getElementById("site-header");
    const progressBar = document.getElementById("scroll-progress");
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const stickyBar = document.getElementById("sticky-mobile-bar");
    const hero = document.getElementById("hero");
    const enquiry = document.getElementById("enquiry");

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress percentage
      if (progressBar && docHeight > 0) {
        const progress = (currentScrollY / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }

      // Header styling & hide on scroll down
      if (header) {
        if (currentScrollY > 80) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > 200 && currentScrollY > lastScrollY && !mobileMenu.classList.contains("open")) {
          header.classList.add("nav-hidden");
        } else {
          header.classList.remove("nav-hidden");
        }
      }

      // Sticky mobile bar logic
      if (stickyBar && hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        let isPastHero = currentScrollY > heroBottom - 100;

        // Check if enquiry area is on screen
        let isEnquiryVisible = false;
        if (enquiry) {
          const rect = enquiry.getBoundingClientRect();
          isEnquiryVisible = rect.top < window.innerHeight && rect.bottom > 0;
        }

        if (isPastHero && !isEnquiryVisible) {
          stickyBar.classList.add("visible");
        } else {
          stickyBar.classList.remove("visible");
        }
      }

      lastScrollY = currentScrollY;
    }, { passive: true });

    // Mobile Menu Toggle
    if (toggleBtn && mobileMenu) {
      function toggleMenu() {
        const isOpen = mobileMenu.classList.contains("open");
        if (isOpen) {
          mobileMenu.classList.remove("open");
          toggleBtn.classList.remove("open");
          toggleBtn.setAttribute("aria-expanded", "false");
          mobileMenu.setAttribute("aria-hidden", "true");
          document.body.classList.remove("no-scroll");
        } else {
          mobileMenu.classList.add("open");
          toggleBtn.classList.add("open");
          toggleBtn.setAttribute("aria-expanded", "true");
          mobileMenu.setAttribute("aria-hidden", "false");
          document.body.classList.add("no-scroll");
        }
      }

      toggleBtn.addEventListener("click", toggleMenu);

      // Close menu on link click
      mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          if (mobileMenu.classList.contains("open")) toggleMenu();
        });
      });

      // Close on Esc
      window.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
          toggleMenu();
        }
      });
    }

    // Active link highlighting on scroll
    const navAnchors = document.querySelectorAll("#desktop-nav-links a");
    const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

    window.addEventListener("scroll", () => {
      let currentSectionId = "";
      const scrollPos = window.scrollY + 120;

      sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          currentSectionId = `#${sec.id}`;
        }
      });

      navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === currentSectionId);
      });
    }, { passive: true });
  }

  // ----------------------------------------------------------------------------
  // Vertical Video Reels Carousel (7-Video Loop)
  // ----------------------------------------------------------------------------
  let activeReelIndex = 0;
  let reelTimer = null;
  const REEL_CYCLE_MS = 3500; // auto-advances every 3.5s

  function initReelsCarousel() {
    const stage = document.getElementById("reels-stage");
    const cards = document.querySelectorAll(".reel-card");
    const prevBtn = document.getElementById("reels-prev");
    const nextBtn = document.getElementById("reels-next");
    const counter = document.getElementById("reels-counter");
    const dotsContainer = document.getElementById("reels-dots");
    const section = document.getElementById("video-band");

    if (!stage || cards.length === 0) return;
    const totalReels = cards.length;

    // Render dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < totalReels; i++) {
        const dot = document.createElement("button");
        dot.className = `hero-dot ${i === 0 ? "active" : ""}`;
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
        dot.setAttribute("aria-label", `Reel ${i + 1}`);
        dot.addEventListener("click", () => {
          goToReel(i);
          startReelTimer();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateReelPositions() {
      const dots = dotsContainer ? dotsContainer.querySelectorAll(".hero-dot") : [];
      
      cards.forEach((card, i) => {
        let offset = (i - activeReelIndex) % totalReels;
        if (offset > 3) offset -= totalReels;
        if (offset < -3) offset += totalReels;

        // Reset classes
        card.className = "reel-card";

        if (offset === 0) {
          // Center Active
          card.classList.add("active");
          card.style.transform = "translateX(0%) translateZ(80px) scale(1.15)";
          card.style.opacity = "1";
          card.style.zIndex = "10";
          card.style.pointerEvents = "auto";
          card.setAttribute("aria-hidden", "false");
        } else if (offset === 1) {
          // Immediate Right
          card.classList.add("slot-right-1");
          card.style.transform = "translateX(115%) translateZ(-40px) scale(0.88) rotateY(-14deg)";
          card.style.opacity = "0.65";
          card.style.zIndex = "6";
          card.style.pointerEvents = "auto";
          card.setAttribute("aria-hidden", "false");
        } else if (offset === -1) {
          // Immediate Left
          card.classList.add("slot-left-1");
          card.style.transform = "translateX(-115%) translateZ(-40px) scale(0.88) rotateY(14deg)";
          card.style.opacity = "0.65";
          card.style.zIndex = "6";
          card.style.pointerEvents = "auto";
          card.setAttribute("aria-hidden", "false");
        } else if (offset === 2) {
          // Far Right
          card.classList.add("slot-right-2");
          card.style.transform = "translateX(210%) translateZ(-100px) scale(0.74) rotateY(-22deg)";
          card.style.opacity = "0.28";
          card.style.zIndex = "3";
          card.style.pointerEvents = "auto";
          card.setAttribute("aria-hidden", "false");
        } else if (offset === -2) {
          // Far Left
          card.classList.add("slot-left-2");
          card.style.transform = "translateX(-210%) translateZ(-100px) scale(0.74) rotateY(22deg)";
          card.style.opacity = "0.28";
          card.style.zIndex = "3";
          card.style.pointerEvents = "auto";
          card.setAttribute("aria-hidden", "false");
        } else {
          // Hidden Behind
          card.classList.add("slot-hidden");
          card.style.transform = offset > 0 ? "translateX(280%) scale(0.6)" : "translateX(-280%) scale(0.6)";
          card.style.opacity = "0";
          card.style.zIndex = "0";
          card.style.pointerEvents = "none";
          card.setAttribute("aria-hidden", "true");
        }
      });

      if (counter) counter.textContent = `0${activeReelIndex + 1} / 0${totalReels}`;

      dots.forEach((dot, idx) => {
        const isActive = idx === activeReelIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }

    function goToReel(targetIdx) {
      activeReelIndex = (targetIdx + totalReels) % totalReels;
      updateReelPositions();
    }

    function nextReel() {
      goToReel(activeReelIndex + 1);
    }

    function prevReel() {
      goToReel(activeReelIndex - 1);
    }

    function startReelTimer() {
      stopReelTimer();
      reelTimer = setInterval(nextReel, REEL_CYCLE_MS);
    }

    function stopReelTimer() {
      if (reelTimer) {
        clearInterval(reelTimer);
        reelTimer = null;
      }
    }

    // Attach card click handlers: clicking any side card rotates it to center
    cards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        if (idx !== activeReelIndex) {
          goToReel(idx);
          startReelTimer();
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevReel();
        startReelTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextReel();
        startReelTimer();
      });
    }

    // Hover & touch pauses
    const wrapper = document.getElementById("reels-stage-wrapper");
    if (wrapper) {
      wrapper.addEventListener("mouseenter", stopReelTimer);
      wrapper.addEventListener("mouseleave", startReelTimer);
      wrapper.addEventListener("touchstart", stopReelTimer, { passive: true });
      wrapper.addEventListener("touchend", startReelTimer, { passive: true });

      // Touch swipe gestures
      let touchStartX = 0;
      let touchEndX = 0;
      wrapper.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      wrapper.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) prevReel();
          else nextReel();
          startReelTimer();
        }
      }, { passive: true });
    }

    // Pause on hidden tab
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopReelTimer();
      else startReelTimer();
    });

    // IntersectionObserver: play all videos while section is visible on screen
    if (section) {
      const allVideos = stage.querySelectorAll("video");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            allVideos.forEach(v => v.play().catch(() => {}));
            startReelTimer();
          } else {
            allVideos.forEach(v => v.pause());
            stopReelTimer();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(section);
    }

    updateReelPositions();
    startReelTimer();
  }

  // ----------------------------------------------------------------------------
  // 15. Missing Image Fallback Gradients
  // ----------------------------------------------------------------------------
  function initImageFallbacks() {
    document.querySelectorAll("img").forEach(img => {
      img.addEventListener("error", function () {
        this.classList.add("img-fallback");
        this.style.opacity = "0.75";
      });
    });
  }

  // ----------------------------------------------------------------------------
  // App Bootstrapper
  // ----------------------------------------------------------------------------
  function init() {
    applyTheme();
    applyFeatures();
    populateBrand();
    initReelsCarousel();
    renderPrograms();
    renderFacilities();
    renderTrainers();
    renderPlans();
    initTimetable();
    initGallery();
    initTestimonials();
    initFAQ();
    initLocationHours();
    initForms();
    initNavigation();
    initImageFallbacks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

