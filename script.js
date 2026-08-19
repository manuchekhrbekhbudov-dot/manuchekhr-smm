document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const mobileMenu = document.getElementById("mobileMenu");

    const openAdmin = document.getElementById("openAdmin");

    const loginModal = document.getElementById("loginModal");
    const adminModal = document.getElementById("adminModal");

    const closeLogin = document.getElementById("closeLogin");
    const closeAdmin = document.getElementById("closeAdmin");

    const adminPassword =
        document.getElementById("adminPassword");

    const loginBtn =
        document.getElementById("loginBtn");

    const projectName =
        document.getElementById("projectName");

    const projectType =
        document.getElementById("projectType");

    const projectImage =
        document.getElementById("projectImage");

    const addProject =
        document.getElementById("addProject");

    const adminProjectList =
        document.getElementById("adminProjectList");

    const portfolioList =
        document.getElementById("portfolioList");

    const logout =
        document.getElementById("logout");


    /* =========================
       ADMIN PASSWORD
    ========================= */

    const ADMIN_PASSWORD = "5044";


    /* =========================
       DEFAULT PROJECTS
       TAJ SPA = AFTER COMPSTORE
    ========================= */

    const defaultProjects = [

        {
            name: "ILMSPACE",
            type: "SMM • Marketing • Content"
        },

        {
            name: "COMPSTORE.TJ",
            type: "SMM • Реклама • Контент"
        },

        {
            name: "TAJ SPA",
            type: "SMM • Контент • Монтаж"
        },

        {
            name: "SMM PROJECT",
            type: "Branding • Reels • Marketing"
        }

    ];


    /* =========================
       GET PROJECTS
    ========================= */

    function getProjects() {

        const saved =
            localStorage.getItem(
                "manuchekhrProjects"
            );

        if (!saved) {
            return [...defaultProjects];
        }

        try {

            return JSON.parse(saved);

        } catch {

            return [...defaultProjects];

        }

    }


    /* =========================
       SAVE PROJECTS
    ========================= */

    function saveProjects(projects) {

        localStorage.setItem(
            "manuchekhrProjects",
            JSON.stringify(projects)
        );

    }


    /* =========================
       SAFE TEXT
    ========================= */

    function safeText(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================
       MESSAGE
    ========================= */

    function message(text) {

        const old =
            document.querySelector(".luxury-message");

        if (old) {
            old.remove();
        }


        const box =
            document.createElement("div");

        box.className =
            "luxury-message";

        box.textContent = text;


        Object.assign(box.style, {

            position: "fixed",

            top: "25px",

            left: "50%",

            transform:
                "translate(-50%, -20px)",

            zIndex: "99999",

            padding: "13px 22px",

            borderRadius: "13px",

            color: "#fff",

            background:
                "linear-gradient(135deg,#9147ff,#ff3f9f)",

            border:
                "1px solid rgba(255,255,255,.2)",

            boxShadow:
                "0 20px 60px rgba(0,0,0,.5)",

            fontSize: "13px",

            fontWeight: "600",

            opacity: "0",

            transition:
                "all .4s ease"

        });


        document.body.appendChild(box);


        requestAnimationFrame(() => {

            box.style.opacity = "1";

            box.style.transform =
                "translate(-50%, 0)";

        });


        setTimeout(() => {

            box.style.opacity = "0";

            box.style.transform =
                "translate(-50%, -20px)";

            setTimeout(() => {
                box.remove();
            }, 400);

        }, 2000);

    }


    /* =========================
       PORTFOLIO
    ========================= */

    function renderPortfolio() {

        if (!portfolioList) return;


        const projects =
            getProjects();


        portfolioList.innerHTML = "";


        if (projects.length === 0) {

            portfolioList.innerHTML = `
                <div class="portfolio-empty">
                    Ҳоло проект нест.
                </div>
            `;

            return;

        }


        projects.forEach(
            (project, index) => {

                const card =
                    document.createElement("article");

                card.className =
                    "portfolio-card reveal";


                const number =
                    String(index + 1)
                    .padStart(2, "0");


                card.innerHTML = `

                    <span>
                        PROJECT ${number}
                    </span>

                    <h3>
                        ${safeText(project.name)}
                    </h3>

                    <p>
                        ${safeText(project.type)}
                    </p>

                `;


                portfolioList.appendChild(card);

            }
        );


        observeReveal();

        addTilt();

    }


    /* =========================
       ADMIN PROJECTS
    ========================= */

    function renderAdminProjects() {

        if (!adminProjectList) return;


        const projects =
            getProjects();


        adminProjectList.innerHTML = "";


        projects.forEach(
            (project, index) => {

                const item =
                    document.createElement("div");

                item.className =
                    "admin-project";


                item.innerHTML = `

                    <h4>
                        ${safeText(project.name)}
                    </h4>

                    <p>
                        ${safeText(project.type)}
                    </p>

                    <button
                        class="delete-project"
                        data-index="${index}"
                        type="button"
                    >
                        Нест кардан
                    </button>

                `;


                adminProjectList.appendChild(item);

            }
        );


        document
            .querySelectorAll(".delete-project")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        const projects =
                            getProjects();


                        projects.splice(index, 1);


                        saveProjects(projects);


                        renderPortfolio();

                        renderAdminProjects();


                        message(
                            "Проект нест карда шуд ✓"
                        );

                    }
                );

            });

    }


    /* =========================
       OPEN ADMIN
    ========================= */

    openAdmin?.addEventListener(
        "click",
        () => {

            loginModal.classList.add(
                "active"
            );

            setTimeout(() => {

                adminPassword.focus();

            }, 200);

        }
    );


    /* =========================
       CLOSE LOGIN
    ========================= */

    closeLogin?.addEventListener(
        "click",
        () => {

            loginModal.classList.remove(
                "active"
            );

            adminPassword.value = "";

        }
    );


    /* =========================
       LOGIN
    ========================= */

    function login() {

        const password =
            adminPassword.value.trim();


        if (
            password === ADMIN_PASSWORD
        ) {

            loginModal.classList.remove(
                "active"
            );

            adminModal.classList.add(
                "active"
            );

            renderAdminProjects();


            message(
                "Хуш омадед ба Admin ✓"
            );

        } else {

            message(
                "Парол нодуруст аст!"
            );

            adminPassword.value = "";

            adminPassword.focus();

        }

    }


    loginBtn?.addEventListener(
        "click",
        login
    );


    adminPassword?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                login();
            }

        }
    );


    /* =========================
       CLOSE ADMIN
    ========================= */

    closeAdmin?.addEventListener(
        "click",
        () => {

            adminModal.classList.remove(
                "active"
            );

        }
    );


    /* =========================
       ADD PROJECT
    ========================= */

    addProject?.addEventListener(
        "click",
        () => {

            const name =
                projectName.value.trim();

            const type =
                projectType.value.trim();


            if (!name) {

                message(
                    "Номи проектро навис!"
                );

                projectName.focus();

                return;

            }


            if (!type) {

                message(
                    "Хизматро навис!"
                );

                projectType.focus();

                return;

            }


            const projects =
                getProjects();


            projects.push({

                name: name,

                type: type

            });


            saveProjects(projects);


            projectName.value = "";

            projectType.value = "";

            if (projectImage) {
                projectImage.value = "";
            }


            renderPortfolio();

            renderAdminProjects();


            message(
                "Проект илова шуд ✓"
            );

        }
    );


    /* =========================
       LOGOUT
    ========================= */

    logout?.addEventListener(
        "click",
        () => {

            adminModal.classList.remove(
                "active"
            );

            message(
                "Аз Admin баромадед"
            );

        }
    );


    /* =========================
       MODAL BACKDROP
    ========================= */

    [loginModal, adminModal]
        .forEach(modal => {

            modal?.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "active"
                        );

                    }

                }
            );

        });


    /* =========================
       ESC CLOSE
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                loginModal?.classList.remove(
                    "active"
                );

                adminModal?.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================
       HEADER SCROLL
    ========================= */

    function headerScroll() {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        headerScroll,
        {
            passive: true
        }
    );


    headerScroll();


    /* =========================
       SCROLL REVEAL
    ========================= */

    let observer;


    function observeReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal:not(.visible)"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

            return;

        }


        if (!observer) {

            observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12,

                        rootMargin:
                            "0px 0px -50px 0px"
                    }
                );

        }


        elements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =========================
       3D TILT
    ========================= */

    function addTilt() {

        const cards =
            document.querySelectorAll(
                ".service-card, .portfolio-card, .stat-card"
            );


        cards.forEach(card => {

            if (
                card.dataset.tiltReady
            ) return;


            card.dataset.tiltReady =
                "true";


            card.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.innerWidth < 800
                    ) return;


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
                        centerY) * -3;


                    const rotateY =
                        ((x - centerX) /
                        centerX) * 3;


                    card.style.transform =
                        `perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)`;

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


    /* =========================
       MOUSE GLOW
    ========================= */

    const mouseGlow =
        document.createElement("div");


    mouseGlow.className =
        "mouse-glow";


    Object.assign(
        mouseGlow.style,
        {

            position: "fixed",

            width: "280px",

            height: "280px",

            borderRadius: "50%",

            pointerEvents: "none",

            zIndex: "-2",

            background:
                "radial-gradient(circle, rgba(168,85,247,.10), transparent 70%)",

            filter: "blur(12px)",

            transform:
                "translate(-50%, -50%)",

            opacity: "0",

            transition:
                "opacity .4s ease"

        }
    );


    document.body.appendChild(
        mouseGlow
    );


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            mouseGlow.style.opacity =
                "1";

        }
    );


    function animateGlow() {

        glowX +=
            (mouseX - glowX) * 0.08;

        glowY +=
            (mouseY - glowY) * 0.08;


        mouseGlow.style.left =
            `${glowX}px`;

        mouseGlow.style.top =
            `${glowY}px`;


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();


    /* =========================
       MOBILE MENU
    ========================= */

    mobileMenu?.addEventListener(
        "click",
        () => {

            const opened =
                nav.classList.contains(
                    "mobile-open"
                );


            if (opened) {

                nav.classList.remove(
                    "mobile-open"
                );

                nav.style.display = "";


            } else {

                nav.classList.add(
                    "mobile-open"
                );

                nav.style.display = "flex";

                nav.style.position =
                    "absolute";

                nav.style.top =
                    "65px";

                nav.style.left =
                    "0";

                nav.style.right =
                    "0";

                nav.style.padding =
                    "20px";

                nav.style.flexDirection =
                    "column";

                nav.style.gap =
                    "20px";

                nav.style.background =
                    "rgba(8,5,14,.96)";

                nav.style.border =
                    "1px solid rgba(255,255,255,.1)";

                nav.style.borderRadius =
                    "16px";

                nav.style.backdropFilter =
                    "blur(20px)";

            }

        }
    );


    /* =========================
       CLOSE MOBILE NAV
    ========================= */

    nav?.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "mobile-open"
                    );

                    if (
                        window.innerWidth <= 700
                    ) {
                        nav.style.display = "";
                    }

                }
            );

        });


    /* =========================
       ACTIVE NAV
    ========================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    function activeNav() {

        let current = "";


        sections.forEach(
            section => {

                const top =
                    section.offsetTop - 180;


                if (
                    window.scrollY >= top
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        activeNav,
        {
            passive: true
        }
    );


    /* =========================
       HERO PARALLAX
    ========================= */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    document.addEventListener(
        "mousemove",
        event => {

            if (
                !heroVisual ||
                window.innerWidth < 900
            ) return;


            const x =
                event.clientX /
                window.innerWidth - 0.5;


            const y =
                event.clientY /
                window.innerHeight - 0.5;


            heroVisual.style.transform =
                `translate(
                    ${x * 10}px,
                    ${y * 10}px
                )`;

        }
    );


    /* =========================
       IMAGE CHECK
    ========================= */

    projectImage?.addEventListener(
        "change",
        () => {

            const file =
                projectImage.files[0];


            if (!file) return;


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                message(
                    "Фақат сурат интихоб кун!"
                );

                projectImage.value = "";

                return;

            }


            if (
                file.size > 5 * 1024 * 1024
            ) {

                message(
                    "Сурат бояд аз 5MB кам бошад!"
                );

                projectImage.value = "";

                return;

            }


            message(
                "Сурат интихоб шуд ✓"
            );

        }
    );


    /* =========================
       START
    ========================= */

    renderPortfolio();

    renderAdminProjects();

    observeReveal();

    addTilt();

    activeNav();

});
