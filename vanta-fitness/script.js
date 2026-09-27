/* =========================================================
   VANTA FITNESS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const navbar = document.querySelector(".navbar");

const mobileToggle = document.querySelector(".mobile-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

const progressBar = document.querySelector(".scroll-progress");


/* =========================================================
   CUSTOM CURSOR
========================================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;

    if (cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();


document.querySelectorAll("a, button, input, select").forEach((element) => {

    element.addEventListener("mouseenter", () => {
        cursorRing?.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
        cursorRing?.classList.remove("active");
    });

});


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    mobileMenu?.classList.remove("open");
    mobileToggle?.classList.remove("active");

    mobileToggle?.setAttribute("aria-expanded", "false");

    body.classList.remove("menu-open");
}


mobileToggle?.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.toggle("open");

    mobileToggle.classList.toggle("active", isOpen);

    mobileToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    body.classList.toggle("menu-open", isOpen);

});


document.querySelectorAll(".mobile-menu a").forEach((link) => {

    link.addEventListener("click", closeMobileMenu);

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMobileMenu();
        closeModal();
    }

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounter(element) {

    const target =
        Number(element.dataset.target);

    const duration = 1100;

    const startTime = performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            Math.floor(target * eased);

        element.textContent =
            String(value).padStart(2, "0");


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                String(target).padStart(2, "0");

        }

    }

    requestAnimationFrame(update);

}


const heroStats =
    document.querySelector(".hero-stats");


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            if (
                entries[0].isIntersecting &&
                !countersStarted
            ) {

                countersStarted = true;

                counters.forEach((counter) => {
                    animateCounter(counter);
                });

                observer.disconnect();
            }

        },
        {
            threshold: .5
        }
    );


if (heroStats) {
    counterObserver.observe(heroStats);
}


/* =========================================================
   SCROLL PROGRESS + NAVBAR
========================================================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (progressBar) {
        progressBar.style.width =
            `${percentage}%`;
    }


    if (navbar) {

        navbar.classList.toggle(
            "scrolled",
            scrollTop > 40
        );

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);

handleScroll();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );

                });

            });

        },
        {
            threshold: .25,
            rootMargin: "-20% 0px -60% 0px"
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   EXPERIENCE CARD MOUSE GLOW
========================================================= */

document
    .querySelectorAll(".experience-card")
    .forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

    });


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroBg =
    document.querySelector(".hero-bg");


document.addEventListener("mousemove", (event) => {

    if (!heroBg) {
        return;
    }

    if (window.innerWidth < 800) {
        return;
    }

    const x =
        (event.clientX / window.innerWidth - .5) * 10;

    const y =
        (event.clientY / window.innerHeight - .5) * 10;

    heroBg.style.transform =
        `scale(1.05) translate(${x}px, ${y}px)`;

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticButtons =
    document.querySelectorAll(".magnetic");


magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) {
            return;
        }

        const rect =
            button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        button.style.transform =
            `translate(${x * .12}px, ${y * .12}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach((item) => {

    const question =
        item.querySelector(".faq-question");


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        faqItems.forEach((otherItem) => {

            otherItem.classList.remove("active");

        });


        if (!isActive) {

            item.classList.add("active");

        }

    });

});


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonials = [

    {
        text:
            "VANTA completely changed the way I approach training. It finally feels like something I can maintain instead of something I have to force.",

        name:
            "AMELIA R.",

        role:
            "MEMBER · 2 YEARS"
    },

    {
        text:
            "The atmosphere is what keeps me coming back. Everyone is focused, but it never feels intimidating.",

        name:
            "MICHAEL T.",

        role:
            "MEMBER · 1 YEAR"
    },

    {
        text:
            "I wanted a place where I could train seriously without feeling like I had to live in the gym. VANTA gives me exactly that.",

        name:
            "SOFIA M.",

        role:
            "MEMBER · 8 MONTHS"
    }

];


let testimonialIndex = 0;


const testimonialText =
    document.querySelector("#testimonial-text");

const testimonialName =
    document.querySelector("#testimonial-name");

const testimonialRole =
    document.querySelector("#testimonial-role");

const testimonialPrev =
    document.querySelector("#testimonial-prev");

const testimonialNext =
    document.querySelector("#testimonial-next");


function updateTestimonial() {

    const testimonial =
        testimonials[testimonialIndex];

    if (!testimonial) {
        return;
    }

    testimonialText.style.opacity = "0";
    testimonialName.style.opacity = "0";
    testimonialRole.style.opacity = "0";


    setTimeout(() => {

        testimonialText.textContent =
            testimonial.text;

        testimonialName.textContent =
            testimonial.name;

        testimonialRole.textContent =
            testimonial.role;

        testimonialText.style.opacity = "1";
        testimonialName.style.opacity = "1";
        testimonialRole.style.opacity = "1";

    }, 180);

}


testimonialNext?.addEventListener(
    "click",
    () => {

        testimonialIndex =
            (testimonialIndex + 1) %
            testimonials.length;

        updateTestimonial();

    }
);


testimonialPrev?.addEventListener(
    "click",
    () => {

        testimonialIndex =
            (testimonialIndex - 1 + testimonials.length) %
            testimonials.length;

        updateTestimonial();

    }
);


/* =========================================================
   PLAN MODAL
========================================================= */

const modal =
    document.querySelector("#plan-modal");

const modalBackdrop =
    document.querySelector(".modal-backdrop");

const modalClose =
    document.querySelector(".modal-close");

const selectedPlan =
    document.querySelector("#selected-plan");

const planButtons =
    document.querySelectorAll(".plan-button");


function openModal(plan) {

    if (selectedPlan) {
        selectedPlan.textContent = plan;
    }

    modal?.classList.add("open");

    body.classList.add("menu-open");

}


function closeModal() {

    modal?.classList.remove("open");

    if (!mobileMenu?.classList.contains("open")) {
        body.classList.remove("menu-open");
    }

}


planButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const plan =
            button.dataset.plan || "VANTA PLUS";

        openModal(plan);

    });

});


modalClose?.addEventListener(
    "click",
    closeModal
);

modalBackdrop?.addEventListener(
    "click",
    closeModal
);


/* =========================================================
   MODAL → TRIAL
========================================================= */

document
    .querySelector(".modal-cta")
    ?.addEventListener("click", () => {

        closeModal();

    });


/* =========================================================
   TRIAL FORM
========================================================= */

const trialForm =
    document.querySelector("#trial-form");

const formMessage =
    document.querySelector("#form-message");

const submitButton =
    document.querySelector(".form-submit");


trialForm?.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (!trialForm.checkValidity()) {

            trialForm.reportValidity();

            return;

        }


        submitButton.disabled = true;

        submitButton.innerHTML =
            `PROCESSING... <i class="ri-loader-4-line ri-spin"></i>`;


        setTimeout(() => {

            formMessage.textContent =
                "Request received. A VANTA team member will contact you shortly.";

            submitButton.innerHTML =
                `REQUEST RECEIVED <i class="ri-check-line"></i>`;

            trialForm.reset();

            setTimeout(() => {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    `REQUEST FREE TRIAL <i class="ri-arrow-right-up-line"></i>`;

            }, 3500);

        }, 1000);

    }
);


/* =========================================================
   SMOOTH ANCHOR OFFSET
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const offset = 80;

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top,
                behavior: "smooth"
            });

        });

    });


/* =========================================================
   IMAGE LOAD EFFECT
========================================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener(
            "load",
            () => {
                image.classList.add("loaded");
            }
        );

    });


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cVANTA FITNESS",
    "font-size: 24px; font-weight: bold; color: #d4af37;"
);

console.log(
    "%cTRAIN HARD. LIVE STRONG.",
    "font-size: 12px; color: #999;"
);