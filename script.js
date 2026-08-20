/* =========================================================
   MANUCHEKHR SMM — PREMIUM JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("done");
            }
        }, 700);
    });


    /* =====================================================
       02. HEADER — SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {
            mobileNav.classList.toggle("open");

            const spans = menuToggle.querySelectorAll("span");

            if (mobileNav.classList.contains("open")) {

                spans[0].style.transform =
                    "translateY(6px) rotate(45deg)";

                spans[1].style.opacity = "0";

                spans[2].style.transform =
                    "translateY(-6px) rotate(-45deg)";

            } else {

                spans[0].style.transform = "";
                spans[1].style.opacity = "";
                spans[2].style.transform = "";
            }
        });


        /* Close menu after clicking link */

        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                const spans =
                    menuToggle.querySelectorAll("span");

                spans[0].style.transform = "";
                spans[1].style.opacity = "";
                spans[2].style.transform = "";
            });

        });
    }


    /* =====================================================
       04. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            e.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight +
                5;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* =====================================================
       05. REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       06. COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-count]");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.count
                        );

                    let current = 0;

                    const duration = 1500;

                    const startTime =
                        performance.now();

                    function animateCounter(
                        currentTime
                    ) {

                        const progress =
                            Math.min(
                                (currentTime -
                                    startTime) /
                                duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        current =
                            Math.floor(
                                eased * target
                            );

                        counter.textContent =
                            current;

                        if (progress < 1) {

                            requestAnimationFrame(
                                animateCounter
                            );

                        } else {

                            counter.textContent =
                                target + "+";
                        }
                    }

                    requestAnimationFrame(
                        animateCounter
                    );

                    observer.unobserve(counter);
                });

            },
            {
                threshold: 0.7
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       07. FAQ
    ===================================================== */

    const faqArticles =
        document.querySelectorAll(".faq article");

    faqArticles.forEach(article => {

        const button =
            article.querySelector("button");

        if (!button) return;

        button.addEventListener("click", () => {

            const isOpen =
                article.classList.contains("open");


            /* Close all */

            faqArticles.forEach(item => {
                item.classList.remove("open");
            });


            /* Open selected */

            if (!isOpen) {
                article.classList.add("open");
            }

        });

    });


    /* =====================================================
       08. PORTFOLIO FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filters button"
        );

    const portfolioItems =
        document.querySelectorAll(
            ".portfolio-grid article"
        );

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /* Active button */

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* Filter cards */

            portfolioItems.forEach(item => {

                const category =
                    item.dataset.cat;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.style.display = "";

                    requestAnimationFrame(() => {
                        item.style.opacity = "1";
                        item.style.transform =
                            "translateY(0)";
                    });

                } else {

                    item.style.opacity = "0";

                    item.style.transform =
                        "translateY(15px)";

                    setTimeout(() => {
                        item.style.display = "none";
                    }, 250);
                }

            });

        });

    });


    /* =====================================================
       09. PRICING → CONTACT FORM
    ===================================================== */

    const planButtons =
        document.querySelectorAll(
            ".choose-plan"
        );

    const planSelect =
        document.getElementById("plan");

    planButtons.forEach(button => {

        button.addEventListener("click", () => {

            const plan =
                button.dataset.plan;

            if (planSelect && plan) {

                const options =
                    Array.from(
                        planSelect.options
                    );

                const matchingOption =
                    options.find(
                        option =>
                            option.textContent.trim()
                            === plan.trim()
                    );

                if (matchingOption) {

                    planSelect.value =
                        matchingOption.value;

                } else {

                    /* Search partial */

                    const partial =
                        options.find(
                            option =>
                                option.textContent
                                    .includes(
                                        plan.split(" — ")[0]
                                    )
                        );

                    if (partial) {
                        planSelect.value =
                            partial.value;
                    }
                }
            }

        });

    });


    /* =====================================================
       10. CONTACT FORM
    ===================================================== */

    const form =
        document.getElementById("briefForm");

    const formResult =
        document.getElementById("formResult");

    const successModal =
        document.getElementById("successModal");

    const closeSuccess =
        document.getElementById("closeSuccess");


    if (form) {

        form.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();

                const business =
                    document.getElementById(
                        "businessName"
                    )?.value.trim();

                const phone =
                    document.getElementById(
                        "phone"
                    )?.value.trim();

                const plan =
                    document.getElementById(
                        "plan"
                    )?.value;

                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();


                /* Validation */

                if (!name || !phone || !message) {

                    if (formResult) {

                        formResult.textContent =
                            "Лутфан майдонҳои заруриро пур кунед.";

                        formResult.style.color =
                            "#f87171";

                        formResult.style.fontSize =
                            "10px";

                        formResult.style.marginTop =
                            "8px";
                    }

                    return;
                }


                /* WhatsApp message */

                const whatsappNumber =
                    "992504440101";

                const text =
                    `Салом, Манучеҳр!

` +
                    `Ном: ${name}
` +
                    `Бизнес: ${
                        business || "Нависонда нашудааст"
                    }
` +
                    `Телефон: ${phone}
` +
                    `Тариф: ${
                        plan || "Интихоб нашудааст"
                    }

` +
                    `Мақсад:
${message}`;


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(text);


                /* Show success */

                if (successModal) {
                    successModal.classList.add(
                        "show"
                    );
                }


                /* Open WhatsApp */

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                }, 700);


                /* Reset */

                form.reset();

            }
        );
    }


    /* =====================================================
       11. SUCCESS MODAL CLOSE
    ===================================================== */

    if (closeSuccess && successModal) {

        closeSuccess.addEventListener(
            "click",
            () => {

                successModal.classList.remove(
                    "show"
                );

            }
        );


        /* Click outside */

        successModal.addEventListener(
            "click",
            e => {

                if (
                    e.target ===
                    successModal
                ) {

                    successModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       12. ESCAPE — CLOSE MODAL / MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        e => {

            if (e.key !== "Escape") {
                return;
            }

            if (successModal) {
                successModal.classList.remove(
                    "show"
                );
            }

            if (
                mobileNav &&
                mobileNav.classList.contains("open")
            ) {

                mobileNav.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    const spans =
                        menuToggle.querySelectorAll(
                            "span"
                        );

                    spans[0].style.transform = "";
                    spans[1].style.opacity = "";
                    spans[2].style.transform = "";
                }
            }

        }
    );


    /* =====================================================
       13. 3D HERO EFFECT
    ===================================================== */

    const visualCard =
        document.querySelector(
            ".visual-card"
        );

    if (
        visualCard &&
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        visualCard.addEventListener(
            "mousemove",
            e => {

                const rect =
                    visualCard.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) *
                    10;

                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -10;

                visualCard.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;
            }
        );


        visualCard.addEventListener(
            "mouseleave",
            () => {

                visualCard.style.transform =
                    "perspective(1200px) rotateY(-7deg) rotateX(2deg)";
            }
        );

    }


    /* =====================================================
       14. MAGNETIC BUTTON EFFECT
    ===================================================== */

    const mainButtons =
        document.querySelectorAll(
            ".btn-main"
        );

    if (
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        mainButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                e => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        e.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.08}px,
                                   ${y * 0.08}px)`;
                }
            );

            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";
                }
            );

        });

    }


    /* =====================================================
       15. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-year]"
        );

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       16. PHONE INPUT
    ===================================================== */

    const phoneInput =
        document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                let value =
                    phoneInput.value;

                value =
                    value.replace(
                        /[^0-9+ ]/g,
                        ""
                    );

                phoneInput.value =
                    value;
            }
        );

    }


    /* =====================================================
       17. TILT CARDS
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".service-grid article, " +
            ".business-card, " +
            ".advantages article, " +
            ".contact-card"
        );

    if (
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                e => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left;

                    const y =
                        e.clientY -
                        rect.top;

                    const rotateY =
                        ((x / rect.width) - 0.5) *
                        4;

                    const rotateX =
                        ((y / rect.height) - 0.5) *
                        -4;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-7px)`;
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";
                }
            );

        });

    }


    /* =====================================================
       18. CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    cursorGlow.style.cssText = `
        position: fixed;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        background: radial-gradient(
            circle,
            rgba(168,85,247,0.07),
            transparent 65%
        );
        transform: translate(-50%, -50%);
        transition: opacity .3s ease;
        opacity: 0;
    `;

    document.body.appendChild(
        cursorGlow
    );


    if (
        window.matchMedia(
            "(min-width: 900px)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            e => {

                cursorGlow.style.left =
                    e.clientX + "px";

                cursorGlow.style.top =
                    e.clientY + "px";

                cursorGlow.style.opacity =
                    "1";
            }
        );

    }


    /* =====================================================
       19. PREVENT BROKEN EMPTY LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                e => e.preventDefault()
            );

        });


    /* =====================================================
       20. READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );

    console.log(
        "MANUCHEKHR SMM — Website loaded successfully."
    );

});
