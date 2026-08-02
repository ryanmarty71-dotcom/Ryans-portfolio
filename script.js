/* ===============================
   EmailJS Contact Form + Typing Motion
================================ */

(function () {
    emailjs.init({
        publicKey: "OZXHYoLbbJaHaFDN",
    });
})();

const contactForm = document.getElementById("contact-form");
const typingElement = document.querySelector(".typing");
const typingStrings = [
    "Web Developer",
    "UI Enthusiast",
    "Problem Solver",
    "Tech Explorer",
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    if (!typingElement) return;
    const currentText = typingStrings[typingIndex];
    const displayedText = isDeleting
        ? currentText.substring(0, charIndex - 1)
        : currentText.substring(0, charIndex + 1);

    typingElement.textContent = displayedText;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1400);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingStrings.length;
    }

    charIndex += isDeleting ? -1 : 1;
    const delay = isDeleting ? 70 : 110;
    setTimeout(typeLoop, delay);
}

/* Set progress bar widths from inline style attributes (supports animation) */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.progress-bar').forEach(function (bar) {
        // if width is provided as inline style (e.g., style="width:95%") keep it
        const inline = bar.getAttribute('style');
        if (inline && /width\s*:\s*([0-9]+%)/i.test(inline)) {
            const m = inline.match(/width\s*:\s*([0-9]+%)/i);
            bar.style.width = m[1];
        } else if (bar.dataset.value) {
            bar.style.width = bar.dataset.value;
        }
    });
});

if (typingElement) {
    typeLoop();
}

const revealElements = document.querySelectorAll(
    'section:not(.hero), .project-card, .skill-card, .about-content, .about-image, #contact form'
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.35 }
);

revealElements.forEach((element) => {
    element.classList.add('reveal-hidden');
    revealObserver.observe(element);
});

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("service_fwi9rg9", "template_b09ydgt", this)
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                alert("Failed to send message. Please try again.");
            });
    });
}
