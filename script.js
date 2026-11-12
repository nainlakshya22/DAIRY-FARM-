const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const siteHeader = document.querySelector(".site-header");

function closeMenu() {
  if (!menuToggle || !mainNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  mainNav.classList.remove("is-open");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

function updateHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(
  ".reason-card, .product-card, .journey-step, .promise-values > div",
);
if ("IntersectionObserver" in window) {
  document.body.classList.add("has-scroll-reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => {
    item.classList.add("scroll-reveal");
    revealObserver.observe(item);
  });
}

const whatsappLink = document.querySelector(".whatsapp-float");
if (whatsappLink?.dataset.phone) {
  const whatsappPhone = whatsappLink.dataset.phone.replace(/\D/g, "");
  whatsappLink.href = `https://wa.me/${whatsappPhone}`;
}

const testimonialCarousel = document.querySelector("#testimonial-carousel");
const testimonialSlides = testimonialCarousel
  ? [...testimonialCarousel.querySelectorAll(".testimonial-slide")]
  : [];
const testimonialDots = testimonialCarousel
  ? [...testimonialCarousel.querySelectorAll(".carousel-dot")]
  : [];
let activeTestimonial = 0;

function showTestimonial(index) {
  if (!testimonialSlides.length) return;
  activeTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeTestimonial;
    slide.hidden = !isActive;
    slide.classList.toggle("is-active", isActive);
  });
  testimonialDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeTestimonial;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

if (testimonialCarousel) {
  testimonialCarousel.querySelectorAll("[data-carousel-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      showTestimonial(activeTestimonial + Number(button.dataset.carouselDirection));
    });
  });

  testimonialDots.forEach((button) => {
    button.addEventListener("click", () => {
      showTestimonial(Number(button.dataset.carouselIndex));
    });
  });

  testimonialCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showTestimonial(activeTestimonial - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showTestimonial(activeTestimonial + 1);
    }
  });
}

const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const recipient = form.dataset.email;
  const data = new FormData(form);
  const subject = `Dairy Farm Inquiry - ${data.get("name")}`;
  const body = [
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    "",
    "Message:",
    data.get("message"),
  ].join("\n");
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
