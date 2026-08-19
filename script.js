document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       ELEMENTS
    ================================= */

    const header = document.getElementById("header");
    const mobileMenu = document.getElementById("mobileMenu");
    const nav = document.getElementById("nav");

    const openAdmin = document.getElementById("openAdmin");

    const loginModal = document.getElementById("loginModal");
    const adminModal = document.getElementById("adminModal");

    const closeLogin = document.getElementById("closeLogin");
    const closeAdmin = document.getElementById("closeAdmin");

    const loginBtn = document.getElementById("loginBtn");
    const adminPassword = document.getElementById("adminPassword");

    const projectName = document.getElementById("projectName");
    const projectType = document.getElementById("projectType");
    const projectImage = document.getElementById("projectImage");

    const addProject = document.getElementById("addProject");
    const logout = document.getElementById("logout");

    const portfolioList =
        document.getElementById("portfolioList");

    const adminProjectList =
        document.getElementById("adminProjectList");


    /* ================================
       ADMIN PASSWORD
    ================================= */

    const ADMIN_PASSWORD = "5044";


    /* ================================
       DEFAULT PROJECTS
    ================================= */

    const defaultProjects = [
        {
            name: "TAJ SPA",
            type: "SMM • Контент • Монтаж"
        },
        {
            name: "ILMSPACE",
            type: "SMM • Marketing • Content"
        },
        {
            name: "COMPSTORE.TJ",
            type: "SMM • Реклама • Контент"
        },
        {
            name: "SMM PROJECT",
            type: "Branding • Reels • Marketing"
        }
    ];


    /* ================================
       LOCAL STORAGE
    ================================= */

    function getProjects() {

        const saved =
            localStorage.getItem("manuchekhrProjects");

        if (!saved) {
            return [...defaultProjects];
        }

        try {

            return JSON.parse(saved);

        } catch {

            return [...defaultProjects];

        }
    }


    function saveProjects(projects) {

        localStorage.setItem(
            "manuchekhrProjects",
            JSON.stringify(projects)
        );

    }


    /* ================================
       SAFE HTML
    ================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ================================
       LUXURY MESSAGE
    ================================= */

    function showMessage(text) {

        const oldMessage =
            document.querySelector(".luxury-message");

        if (oldMessage) {
            oldMessage.remove();
        }


        const message =
            document.createElement("div");

        message.className =
            "luxury-message";

        message.textContent = text;


        Object.assign(message.style, {

            position: "fixed",

            top: "25px",

            left: "50%",

            transform:
                "translateX(-50%) translateY(-20px)",

            zIndex: "99999",

            padding: "13px 22px",

            borderRadius: "14px",

            color: "#ffffff",

            background:
                "linear-gradient(135deg,#9147ff,#ff3f9f)",

            border:
                "1px solid rgba(255,255,255,.2)",

            boxShadow:
                "0 20px 60px rgba(0,0,0,.45)",

            fontSize: "13px",

            fontWeight: "600",

            opacity: "0",

            transition:
                "all .45s cubic-bezier(.16,1,.3,1)"

        });


        document.body.appendChild(message);


        requestAnimationFrame(() => {

            message.style.opacity = "1";

            message.style.transform =
                "translateX(-50%) translateY(0)";

        });


        setTimeout(() => {

            message.style.opacity = "0";

            message.style.transform =
                "translateX(-50%) translateY(-15px)";

            setTimeout(() => {
                message.remove();
            }, 450);

        }, 2200);

    }


    /* ================================
       PORTFOLIO RENDER
    ================================= */

    function renderPortfolio() {

        if (!portfolioList) return;


        const projects = getProjects();


        portfolioList.innerHTML = "";


        if (projects.length === 0) {

            portfolioList.innerHTML = `
                <div class="portfolio-empty">
                    Ҳоло проект нест.
                </div>
            `;

            return;
        }


        projects.forEach((project, index) => {

            const card =
                document.createElement("article");

            card.className =
                "portfolio-card reveal";


            const number =
                String(index + 1).padStart(2, "0");


            card.innerHTML = `

                <span>
                    PROJECT ${number}
                </span>

                <h3>
                    ${escapeHTML(project.name)}
                </h3>

                <p>
                    ${escapeHTML(project.type)}
                </p>

            `;


            portfolioList.appendChild(card);

        });


        observeReveal();

        addCardTilt();

    }


    /* ================================
       ADMIN PROJECT LIST
    ================================= */

    function renderAdminProjects() {

        if (!adminProjectList) return;


        const projects = getProjects();


        adminProjectList.innerHTML = "";


        if (projects.length === 0) {

            adminProjectList.innerHTML = `
                <p>Ҳоло проект нест.</p>
            `;

            return;
        }


        projects.forEach((project, index) => {

            const item =
                document.createElement("div");

            item.className =
                "admin-project";


            item.innerHTML = `

                <h4>
                    ${escapeHTML(project.name)}
                </h4>

                <p>
                    ${escapeHTML(project.type)}
                </p>

                <button
                    type="button"
                    class="delete-project"
                    data-index="${index}"
                >
                    Нест кардан
                </button>

            `;


            adminProjectList.appendChild(item);

        });


        document
            .querySelectorAll(".delete-project")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(button.dataset.index);


                        const projects =
                            getProjects();


                        projects.splice(index, 1);


                        saveProjects(projects);


                        renderAdminProjects();

                        renderPortfolio();


                        showMessage(
                            "Проект нест карда шуд ✓"
                        );

                    }
                );

            });

    }


    /* ================================
       OPEN ADMIN
    ================================= */

    openAdmin?.addEventListener(
        "click",
        () => {

            loginModal.classList.add("active");

            setTimeout(() => {

                adminPassword?.focus();

            }, 200);

        }
    );


    /* ================================
       CLOSE LOGIN
    ================================= */

    closeLogin?.addEventListener(
        "click",
        () => {

            loginModal.classList.remove("active");

            adminPassword.value = "";

        }
    );


    /* ================================
       LOGIN
    ================================= */

    function login() {

        const password =
            adminPassword.value.trim();


        if (password === ADMIN_PASSWORD) {

            loginModal.classList.remove("active");

            adminModal.classList.add("active");

            renderAdminProjects();


            showMessage(
                "Хуш омадед ба Admin ✓"
            );


        } else {

            showMessage(
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


    /* ================================
       CLOSE ADMIN
    ================================= */

    closeAdmin?.addEventListener(
        "click",
        () => {

            adminModal.classList.remove("active");

        }
    );


    /* ================================
       ADD PROJECT
    ================================= */

    addProject?.addEventListener(
        "click",
        () => {

            const name =
                projectName.value.trim();

            const type =
                projectType.value.trim();


            if (!name) {

                showMessage(
                    "Номи проектро навис!"
                );

                projectName.focus();

                return;
            }


            if (!type) {

                showMessage(
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


            renderAdminProjects();

            renderPortfolio();


            showMessage(
                "Проект бо муваффақият илова шуд ✓"
            );

        }
    );


    /* ================================
       LOGOUT
    ================================= */

    logout?.addEventListener(
        "click",
        () => {

            adminModal.classList.remove("active");

            showMessage(
                "Аз Admin баромадед"
            );

        }
    );


    /* ================================
       CLOSE MODAL ON BACKDROP
    ================================= */

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


    /* ================================
       ESCAPE KEY
    ================================= */

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


    /* ================================
       HEADER SCROLL EFFECT
    ================================= */

    function updateHeader() {

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
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* ================================
       SCROLL REVEAL
    ================================= */

    let revealObserver = null;


    function observeReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal:not(.visible)"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {

                element.classList.add(
                    "visible"
                );

            });

            return;
        }


        if (!revealObserver) {

            revealObserver =
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

                                    revealObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: .12,

                        rootMargin:
                            "0px 0px -50px 0px"
                    }
                );

        }


        elements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    }


    /* ================================
       3D CARD TILT
    ================================= */

    function addCardTilt() {

        const cards =
            document.querySelectorAll(
                ".service-card, .portfolio-card, .stat-card"
            );


        cards.forEach(card => {

            if (
                card.dataset.tiltReady
            ) return;


            card.dataset.tiltReady = "true";


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

                    card.style.transform = "";

                }
            );

        });

    }


    /* ================================
       MOUSE LIGHT
    ================================= */

    const mouseLight =
        document.createElement("div");


    mouseLight.className =
        "mouse-light";


    Object.assign(
        mouseLight.style,
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
                "translate(-50%,-50%)",

            opacity: "0",

            transition:
                "opacity .4s ease"

        }
    );


    document.body.appendChild(
        mouseLight
    );


    let mouseX = 0;
    let mouseY = 0;

    let lightX = 0;
    let lightY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;

            mouseY = event.clientY;

            mouseLight.style.opacity =
                "1";

        }
    );


    function animateMouseLight() {

        lightX +=
            (mouseX - lightX) * .08;

        lightY +=
            (mouseY - lightY) * .08;


        mouseLight.style.left =
            `${lightX}px`;

        mouseLight.style.top =
            `${lightY}px`;


        requestAnimationFrame(
            animateMouseLight
        );

    }


    animateMouseLight();


    /* ================================
       MOBILE MENU
    ================================= */

    mobileMenu?.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.contains(
                    "mobile-open"
                );


            if (isOpen) {

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
                    "68px";

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
                    "rgba(9,6,15,.96)";

                nav.style.border =
                    "1px solid rgba(255,255,255,.1)";

                nav.style.borderRadius =
                    "16px";

                nav.style.backdropFilter =
                    "blur(20px)";

            }

        }
    );


    /* ================================
       CLOSE MOBILE MENU
    ================================= */

    document
        .querySelectorAll(".nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth <= 700
                    ) {

                        nav.classList.remove(
                            "mobile-open"
                        );

                        nav.style.display = "";

                    }

                }
            );

        });


    /* ================================
       ACTIVE NAV
    ================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );


    function updateActiveNav() {

        let current = "";


        sections.forEach(section => {

            const top =
                section.offsetTop - 180;


            if (
                window.scrollY >= top
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* ================================
       PARALLAX PROFILE
    ================================= */

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
                (event.clientX /
                window.innerWidth - .5);


            const y =
                (event.clientY /
                window.innerHeight - .5);


            heroVisual.style.transform =
                `translate(${x * 12}px,
                 ${y * 12}px)`;

        }
    );


    /* ================================
       IMAGE PREVIEW
    ================================= */

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

                showMessage(
                    "Фақат сурат интихоб кун!"
                );

                projectImage.value = "";

                return;
            }


            if (
                file.size > 5 * 1024 * 1024
            ) {

                showMessage(
                    "Сурат бояд аз 5MB кам бошад!"
                );

                projectImage.value = "";

                return;
            }


            showMessage(
                "Сурат интихоб шуд ✓"
            );

        }
    );


    /* ================================
       INITIALIZE
    ================================= */

    renderPortfolio();

    renderAdminProjects();

    observeReveal();

    addCardTilt();

    updateActiveNav();


    /* ================================
       PAGE LOADED
    ================================= */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );

});
