const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "मेन्यू खोलें" : "मेन्यू बंद करें");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
    mainNav.classList.remove("is-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const recipient = form.dataset.email;
  const data = new FormData(form);
  const subject = `डेयरी फ़ार्म की जानकारी - ${data.get("name")}`;
  const body = [
    `नाम: ${data.get("name")}`,
    `फ़ोन: ${data.get("phone")}`,
    "",
    "संदेश:",
    data.get("message"),
  ].join("\n");
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
