const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navLinkEls = document.querySelectorAll(".nav-link");

// Mobile nav toggle
function setNavOpen(open) {
  navLinks.classList.toggle("active", open);
  document.body.classList.toggle("nav-open", open);
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  menuBtn.textContent = open ? "✕" : "☰";
}

menuBtn.addEventListener("click", () => {
  setNavOpen(!navLinks.classList.contains("active"));
});

navLinkEls.forEach(link => {
  link.addEventListener("click", () => {
    setNavOpen(false);
  });
});

// Active section highlighting using IntersectionObserver
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.target.id) return;
    const id = entry.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting && link) {
      navLinkEls.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
      link.setAttribute("aria-current", "true");
    } else if (link) {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}, { threshold: 0.55 });

sections.forEach(s => observer.observe(s));

// Reveal sections on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('main .section').forEach(s => revealObserver.observe(s));

// Simple contact form validation (keeps original behavior)
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const success = document.getElementById("successMessage");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    success.textContent = "";

    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.value.trim().length < 2) {
      nameError.textContent = "Please enter your name.";
      valid = false;
    }

    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (message.value.trim().length < 10) {
      messageError.textContent = "Message must contain at least 10 characters.";
      valid = false;
    }

    if (valid) {
      success.textContent = "Message validated successfully! Connect this form to a backend/email service for real submissions.";
      form.reset();
    }
  });
}
