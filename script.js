const typingText = document.getElementById("typing-text");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const reveals = document.querySelectorAll(".reveal");
const form = document.querySelector(".contact-form");

const phrases = [
  "Aspiring Cybersecurity Specialist",
  "Programmer",
  "Microsoft Student",
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  const nextText = deleting
    ? currentPhrase.slice(0, charIndex - 1)
    : currentPhrase.slice(0, charIndex + 1);

  typingText.textContent = nextText;
  charIndex = deleting ? charIndex - 1 : charIndex + 1;

  let delay = deleting ? 42 : 72;

  if (!deleting && charIndex === currentPhrase.length) {
    delay = 1400;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 350;
  }

  window.setTimeout(typeLoop, delay);
}

typeLoop();

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((section) => observer.observe(section));

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button[type='submit']");
  const originalLabel = submitButton.textContent;
  submitButton.textContent = "Message Ready";
  submitButton.disabled = true;
  window.setTimeout(() => {
    submitButton.textContent = originalLabel;
    submitButton.disabled = false;
    form.reset();
  }, 1600);
});

const particleLayer = document.querySelector(".bg-particles");
if (particleLayer) {
  const count = 18;
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "floating-particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.animationDuration = `${8 + Math.random() * 10}s`;
    particleLayer.appendChild(particle);
  }
}
