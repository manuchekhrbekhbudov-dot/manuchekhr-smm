/* =========================================
   MANUCHEKHR SMM
   PREMIUM JAVASCRIPT
========================================= */


/* =========================================
   01. PRELOADER
========================================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 900);

    }

});


/* =========================================
   02. HEADER SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

function headerScroll(){

    if (!header) return;

    if (window.scrollY > 40){

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", headerScroll);

headerScroll();


/* =========================================
   03. MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav){

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("open");

        menuButton.classList.toggle("active");

    });


    /* Close menu after clicking a link */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuButton.classList.remove("active");

        });

    });

}


/* =========================================
   04. ESCAPE CLOSE MENU
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape"){

        if (nav){

            nav.classList.remove("open");

        }

        if (menuButton){

            menuButton.classList.remove("active");

        }

    }

});


/* =========================================
   05. SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event){

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ){

            return;

        }

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header ?
            header.offsetHeight :
            0;

        const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    });

});


/* =========================================
   06. FAQ
========================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button =
        item.querySelector("button");

    if (!button) return;

    button.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        /* Close all */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

        });


        /* Open selected */

        if (!isActive){

            item.classList.add("active");

        }

    });

});


/* =========================================
   07. SERVICE MODAL
========================================= */

const serviceModal =
    document.getElementById("serviceModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalClose =
    document.getElementById("modalClose");


const serviceDescriptions = {

    "SMM":
        "Идоракунии пурраи саҳифа, нақшаи контент, стратегия, таҳлил ва рушди бренди шумо.",

    "Таҳияи контент":
        "Таҳияи идея, матн, визуал ва контенти мувофиқ ба аудитория ва ҳадафи бизнес.",

    "Reels":
        "Таҳияи видеоҳои кӯтоҳи ҷолиб барои зиёд кардани дастрасӣ, тамошо ва ҷалби аудитория.",

    "Монтажи видео":
        "Монтажи касбӣ, субтитр, мусиқӣ, эффектҳо ва омодасозии видео барои Instagram ва дигар платформаҳо.",

    "Маркетинг":
        "Таҳлили аудитория, рақибон, маҳсулот ва таҳияи роҳҳои самараноки ҷалби мизоҷ.",

    "Рекламаи мақсаднок":
        "Танзими реклама барои аудиторияи мувофиқ бо ҳадафи равшан ва назорати натиҷаҳо.",

    "Брендинг":
        "Таҳияи услуби ягонаи визуалӣ ва пешниҳоди бренд барои шинохта шудани бизнес."

};


document
    .querySelectorAll(".service-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const title =
                button.dataset.title;

            if (modalTitle){

                modalTitle.textContent =
                    title;

            }


            if (modalText){

                modalText.textContent =
                    serviceDescriptions[title] ||
                    "Маълумоти муфассал дар бораи ин хизматро ҳангоми машварат мегиред.";

            }


            if (serviceModal){

                serviceModal.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            }

        });

    });


function closeServiceModal(){

    if (!serviceModal) return;

    serviceModal.classList.remove("show");

    document.body.style.overflow =
        "";

}


if (modalClose){

    modalClose.addEventListener(
        "click",
        closeServiceModal
    );

}


if (serviceModal){

    serviceModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                serviceModal
            ){

                closeServiceModal();

            }

        }
    );

}


/* =========================================
   08. PORTFOLIO FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(
        ".portfolio-filter button"
    );

const portfolioItems =
    document.querySelectorAll(
        ".portfolio-item"
    );


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });

        button.classList.add("active");


        /* Filter items */

        portfolioItems.forEach(item => {

            const category =
                item.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ){

                item.style.display =
                    "block";

                setTimeout(() => {

                    item.style.opacity = "1";

                    item.style.transform =
                        "translateY(0)";

                }, 20);

            } else {

                item.style.opacity = "0";

                item.style.transform =
                    "translateY(15px)";

                setTimeout(() => {

                    item.style.display =
                        "none";

                }, 250);

            }

        });

    });

});


/* =========================================
   09. PLAN BUTTONS
========================================= */

const planButtons =
    document.querySelectorAll(
        ".plan-button"
    );


planButtons.forEach(button => {

    button.addEventListener("click", () => {

        const plan =
            button.dataset.plan;

        const messageBox =
            document.querySelector(
                'textarea[name="message"]'
            );


        if (
            messageBox &&
            plan
        ){

            messageBox.value =
                `Ман мехоҳам тарифи "${plan}"-ро интихоб кунам.`;

        }

    });

});


/* =========================================
   10. CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm){

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(
                    contactForm
                );


            const name =
                formData.get("name");

            const business =
                formData.get("business");

            const phone =
                formData.get("phone");

            const message =
                formData.get("message");


            const whatsappMessage =

                `Салом Манучеҳр!%0A%0A` +

                `Ном: ${name}%0A` +

                `Бизнес: ${business}%0A` +

                `Телефон: ${phone}%0A%0A` +

                `Дар бораи проект:%0A${message}`;


            const whatsappURL =
                `https://wa.me/992504440101?text=${whatsappMessage}`;


            if (formMessage){

                formMessage.textContent =
                    "Маълумот омода шуд. Ҳоло WhatsApp кушода мешавад...";

            }


            setTimeout(() => {

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }, 700);

        }
    );

}


/* =========================================
   11. SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-title, " +
        ".info-card, " +
        ".service-card, " +
        ".business-grid div, " +
        ".check-grid div, " +
        ".timeline > div, " +
        ".process-grid > div, " +
        ".result-grid > div, " +
        ".portfolio-item, " +
        ".review-grid article, " +
        ".price-card, " +
        ".advantages article, " +
        ".contact-button, " +
        ".about-photo, " +
        ".skills span"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity .8s ease, transform .8s ease";

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                (entry, index) => {

                    if (
                        entry.isIntersecting
                    ){

                        setTimeout(() => {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }, index * 40);


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold:.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(
        element
    );

});


/* =========================================
   12. NUMBER COUNTER
========================================= */

const counters =
    document.querySelectorAll(
        ".stat strong"
    );


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ){

                    return;

                }


                const element =
                    entry.target;

                const original =
                    element.textContent.trim();


                const number =
                    parseInt(
                        original.replace(
                            /\D/g,
                            ""
                        )
                    );


                if (
                    isNaN(number)
                ){

                    return;

                }


                const suffix =
                    original.includes("+")
                    ? "+"
                    : "";


                let current = 0;

                const duration = 1200;

                const start =
                    performance.now();


                function updateCounter(
                    timestamp
                ){

                    const progress =
                        Math.min(
                            (timestamp - start) /
                            duration,
                            1
                        );


                    const ease =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    current =
                        Math.floor(
                            number * ease
                        );


                    element.textContent =
                        current + suffix;


                    if (
                        progress < 1
                    ){

                        requestAnimationFrame(
                            updateCounter
                        );

                    }

                }


                requestAnimationFrame(
                    updateCounter
                );


                counterObserver.unobserve(
                    element
                );

            });

        },
        {
            threshold:.7
        }
    );


counters.forEach(counter => {

    counterObserver.observe(
        counter
    );

});


/* =========================================
   13. CURSOR GLOW
========================================= */

const cursorGlow =
    document.createElement("div");


cursorGlow.style.position =
    "fixed";

cursorGlow.style.width =
    "250px";

cursorGlow.style.height =
    "250px";

cursorGlow.style.borderRadius =
    "50%";

cursorGlow.style.pointerEvents =
    "none";

cursorGlow.style.zIndex =
    "-1";

cursorGlow.style.background =
    "radial-gradient(circle, rgba(168,85,247,.08), transparent 70%)";

cursorGlow.style.transform =
    "translate(-50%,-50%)";

cursorGlow.style.transition =
    "left .15s ease, top .15s ease";

document.body.appendChild(
    cursorGlow
);


document.addEventListener(
    "mousemove",
    event => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* =========================================
   14. 3D CARD EFFECT
========================================= */

const cards =
    document.querySelectorAll(
        ".service-card, " +
        ".price-card, " +
        ".review-grid article, " +
        ".info-card"
    );


cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                centerY) *
                -3;


            const rotateY =
                ((x - centerX) /
                centerX) *
                3;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

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


/* =========================================
   15. ESC CLOSE MODAL
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ){

            closeServiceModal();

        }

    }
);


/* =========================================
   16. ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


const activeObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ){

                    return;

                }


                const id =
                    entry.target.id;


                navLinks.forEach(link => {

                    link.classList.remove(
                        "current"
                    );


                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${id}`
                    ){

                        link.classList.add(
                            "current"
                        );

                    }

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    activeObserver.observe(
        section
    );

});


/* =========================================
   17. TILT HERO VISUAL
========================================= */

const visualCard =
    document.querySelector(
        ".visual-card"
    );


if (visualCard){

    visualCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                visualCard.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - .5) *
                12;


            const rotateX =
                ((y / rect.height) - .5) *
                -12;


            visualCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    visualCard.addEventListener(
        "mouseleave",
        () => {

            visualCard.style.transform =
                "";

        }
    );

}


/* =========================================
   18. DYNAMIC YEAR
========================================= */

document
    .querySelectorAll(
        ".footer-bottom span"
    )
    .forEach(element => {

        const year =
            new Date().getFullYear();

        element.textContent =
            `© ${year} MANUCHEKHR. Ҳамаи ҳуқуқҳо ҳифз шудаанд.`;

    });


/* =========================================
   19. IMAGE ERROR PROTECTION
========================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.display =
                    "none";

            }
        );

    });


/* =========================================
   20. PAGE READY
========================================= */

document.body.classList.add(
    "js-ready"
);

console.log(
    "MANUCHEKHR SMM — Website Ready 🚀"
);
