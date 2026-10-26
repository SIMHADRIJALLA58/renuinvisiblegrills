document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".bg-hero-slide");
    const progressItems = document.querySelectorAll(".bg-progress-item");
    const prevBtn = document.querySelector(".bg-prev");
    const nextBtn = document.querySelector(".bg-next");

    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 4000; // 4 seconds

    function showSlide(index) {

        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove("active"));
        progressItems.forEach(item => item.classList.remove("active"));

        // Keep index within the slide range
        currentSlide = (index + slides.length) % slides.length;

        // Activate current slide and progress indicator
        slides[currentSlide].classList.add("active");

        if (progressItems[currentSlide]) {
            progressItems[currentSlide].classList.add("active");
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Start automatic slideshow
    function startSlider() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            prevSlide();
            startSlider();
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            startSlider();
        });
    }

    // Click progress indicators to select a slide
    progressItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            showSlide(index);
            startSlider();
        });
    });

    // Initialize slider
    showSlide(0);
    startSlider();

});





document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector("#luxeHome");

    if (!hero) return;

    const panels = Array.from(
        hero.querySelectorAll(".luxe-panel")
    );

    const tracks = Array.from(
        hero.querySelectorAll(".luxe-track")
    );

    const previousButton = hero.querySelector(".luxe-previous");
    const nextButton = hero.querySelector(".luxe-next");
    const currentNumber = hero.querySelector(".luxe-current-number");

    if (!panels.length) return;

    const duration = 4000;

    let currentIndex = Math.max(
        0,
        panels.findIndex(panel => panel.classList.contains("is-current"))
    );

    let timer = null;
    let touchStartX = 0;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function displaySlide(index) {
        currentIndex = (index + panels.length) % panels.length;

        panels.forEach((panel, i) => {
            const active = i === currentIndex;

            panel.classList.toggle("is-current", active);
            panel.setAttribute("aria-hidden", String(!active));

            if (active) {
                panel.removeAttribute("inert");
            } else {
                panel.setAttribute("inert", "");
            }
        });

        tracks.forEach((track, i) => {
            const active = i === currentIndex;

            track.classList.toggle("is-current", active);
            track.setAttribute("aria-pressed", String(active));
        });

        if (currentNumber) {
            currentNumber.textContent = String(
                currentIndex + 1
            ).padStart(2, "0");
        }
    }

    function stopSlider() {
        window.clearInterval(timer);
        timer = null;
    }

    function startSlider() {
        stopSlider();

        if (reduceMotion.matches || panels.length < 2) return;

        timer = window.setInterval(() => {
            displaySlide(currentIndex + 1);
        }, duration);
    }

    function goToSlide(index) {
        displaySlide(index);
        startSlider();
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            goToSlide(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            goToSlide(currentIndex + 1);
        });
    }

    tracks.forEach((track, index) => {
        track.addEventListener("click", () => {
            goToSlide(index);
        });
    });

    // Pause while the visitor interacts with the hero.
    hero.addEventListener("mouseenter", stopSlider);
    hero.addEventListener("mouseleave", startSlider);

    hero.addEventListener("focusin", stopSlider);
    hero.addEventListener("focusout", event => {
        if (!hero.contains(event.relatedTarget)) {
            startSlider();
        }
    });

    // Touch swipe support.
    hero.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    hero.addEventListener("touchend", event => {
        const touchEndX = event.changedTouches[0].clientX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 55) {
            displaySlide(
                currentIndex + (difference < 0 ? 1 : -1)
            );
            startSlider();
        }
    }, { passive: true });

    // Respect the visitor's motion preference.
    reduceMotion.addEventListener("change", () => {
        if (reduceMotion.matches) {
            stopSlider();
        } else {
            startSlider();
        }
    });

    // Initialize.
    displaySlide(currentIndex);
    startSlider();
});






// ---- Accordion: one answer open at a time ----
  const faqItems = document.querySelectorAll(".faq-item");
 
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-item__q");
    btn.addEventListener("click", () => {
      const opening = !item.classList.contains("is-open");
      faqItems.forEach((el) => {
        el.classList.remove("is-open");
        el.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
      });
      if (opening) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
 
  // ---- AOS (call once for the whole page) ----
  AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 60 });



  // =====================================================
  //  SETTINGS: country code + number, no "+", no spaces
  // =====================================================
  const WHATSAPP_NUMBER = "910000000000";
  const BRAND = "Renu Invisible Grills";
 
  const form      = document.getElementById("enquiryForm");
  const nameEl    = document.getElementById("enqName");
  const phoneEl   = document.getElementById("enqPhone");
  const areaEl    = document.getElementById("enqArea");
  const msgEl     = document.getElementById("enqMsg");
  const chipsEl   = document.getElementById("enqChips");
  const submitBtn = document.getElementById("enqSubmit");
  const submitTxt = document.getElementById("enqSubmitText");
  const statusEl  = document.getElementById("enqStatus");
 
  // keep only digits while typing in the phone box
  phoneEl.addEventListener("input", () => {
    phoneEl.value = phoneEl.value.replace(/[^\d+\s]/g, "");
  });
 
  function cleanPhone(raw) {
    let d = raw.replace(/\D/g, "");
    if (d.length === 12 && d.startsWith("91")) d = d.slice(2);   // allow +91 prefix
    if (d.length === 11 && d.startsWith("0"))  d = d.slice(1);   // allow leading 0
    return d;
  }
 
  function setError(wrapper, on) { wrapper.classList.toggle("has-error", on); }
 
  // clear an error as soon as the person fixes it
  nameEl.addEventListener("input", () => setError(nameEl.closest(".field"), false));
  phoneEl.addEventListener("input", () => setError(phoneEl.closest(".field"), false));
  chipsEl.addEventListener("change", () => setError(chipsEl, false));
 
  form.addEventListener("submit", (e) => {
    e.preventDefault();
 
    const name    = nameEl.value.trim();
    const phone   = cleanPhone(phoneEl.value);
    const area    = areaEl.value.trim();
    const message = msgEl.value.trim();
    const picked  = form.querySelector('input[name="service"]:checked');
 
    // ---- validation ----
    const nameOk  = name.length >= 2;
    const phoneOk = /^[6-9]\d{9}$/.test(phone);
    const svcOk   = !!picked;
 
    setError(nameEl.closest(".field"), !nameOk);
    setError(phoneEl.closest(".field"), !phoneOk);
    setError(chipsEl, !svcOk);
 
    if (!nameOk)       { nameEl.focus();  return; }
    if (!phoneOk)      { phoneEl.focus(); return; }
    if (!svcOk)        { chipsEl.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
 
    // ---- build the WhatsApp message ----
    const lines = [
      "Hello " + BRAND + "! 👋",
      "I would like a free inspection and quote.",
      "",
      "*Name:* " + name,
      "*Mobile:* +91 " + phone,
      "*Service:* " + picked.value
    ];
    if (area)    lines.push("*Area:* " + area);
    if (message) lines.push("*Details:* " + message);
 
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
 
    // ---- feedback + redirect ----
    submitBtn.disabled = true;
    submitTxt.textContent = "Opening WhatsApp…";
    statusEl.textContent = "Thank you, " + name.split(" ")[0] + "! Taking you to WhatsApp.";
 
    // open WhatsApp; if the browser blocks the new tab, go in the same tab
    const win = window.open(url, "_blank", "noopener");
    if (!win) window.location.href = url;
 
    // reset the form for the next time
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitTxt.textContent = "Send on WhatsApp";
      statusEl.textContent = "";
    }, 2500);
  });
 
  // ---- AOS (call once for the whole page) ----
  AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 60 });





  document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".gallery .g-item");

    if (!galleryItems.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "renu-lightbox";

    lightbox.innerHTML = `
        <button class="renu-lightbox-close" aria-label="Close image">&times;</button>

        <button class="renu-lightbox-prev" aria-label="Previous image">&#10094;</button>

        <div class="renu-lightbox-content">
            <img class="renu-lightbox-image" src="" alt="">
            <div class="renu-lightbox-info">
                <span class="renu-lightbox-category"></span>
                <h3 class="renu-lightbox-title"></h3>
                <span class="renu-lightbox-count"></span>
            </div>
        </div>

        <button class="renu-lightbox-next" aria-label="Next image">&#10095;</button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".renu-lightbox-image");
    const lightboxTitle = lightbox.querySelector(".renu-lightbox-title");
    const lightboxCategory = lightbox.querySelector(".renu-lightbox-category");
    const lightboxCount = lightbox.querySelector(".renu-lightbox-count");

    const closeBtn = lightbox.querySelector(".renu-lightbox-close");
    const prevBtn = lightbox.querySelector(".renu-lightbox-prev");
    const nextBtn = lightbox.querySelector(".renu-lightbox-next");

    let currentIndex = 0;
    let previousFocus = null;

    function showImage(index) {

        currentIndex = (index + galleryItems.length) % galleryItems.length;

        const item = galleryItems[currentIndex];
        const image = item.querySelector("img");

        if (!image) return;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;

        lightboxTitle.textContent = item.dataset.name || image.alt;
        lightboxCategory.textContent = item.dataset.cat || "Gallery";

        lightboxCount.textContent =
            `${currentIndex + 1} / ${galleryItems.length}`;
    }

    function openLightbox(index) {

        previousFocus = document.activeElement;

        showImage(index);

        lightbox.classList.add("active");
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Project gallery image viewer");

        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";

        lightboxImage.removeAttribute("src");

        if (previousFocus) previousFocus.focus();
    }

    galleryItems.forEach((item, index) => {

        item.addEventListener("click", function () {
            openLightbox(index);
        });

    });

    closeBtn.addEventListener("click", closeLightbox);

    nextBtn.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    prevBtn.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (event.key === "Tab") {
            const controls = [closeBtn, prevBtn, nextBtn];

            const first = controls[0];
            const last = controls[controls.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

    });

});







document.addEventListener("DOMContentLoaded", function () {

    const materialImage = document.querySelector(
        "#invisible-grill-materials .ig-main-image"
    );

    if (!materialImage) return;

    const lightbox = document.createElement("div");
    lightbox.className = "ig-material-lightbox";

    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Invisible grill materials image");

    lightbox.innerHTML = `
        <button type="button"
                class="ig-lightbox-close"
                aria-label="Close image">
            &times;
        </button>

        <img class="ig-lightbox-image"
             alt="Renu Invisible Grills premium installation materials">
    `;

    document.body.appendChild(lightbox);

    const popupImage = lightbox.querySelector(".ig-lightbox-image");
    const closeButton = lightbox.querySelector(".ig-lightbox-close");

    let previousFocus = null;
    let previousOverflow = "";

    function openImage() {
        previousFocus = document.activeElement;
        previousOverflow = document.body.style.overflow;

        popupImage.src = materialImage.currentSrc || materialImage.src;
        popupImage.alt = materialImage.alt;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeImage() {
        lightbox.classList.remove("active");
        document.body.style.overflow = previousOverflow;
        popupImage.removeAttribute("src");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    materialImage.setAttribute("tabindex", "0");
    materialImage.setAttribute("role", "button");
    materialImage.setAttribute("aria-label", "View invisible grill materials image in full size");

    materialImage.addEventListener("click", openImage);

    materialImage.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openImage();
        }
    });

    closeButton.addEventListener("click", closeImage);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeImage();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeImage();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            closeButton.focus();
        }
    });

});
