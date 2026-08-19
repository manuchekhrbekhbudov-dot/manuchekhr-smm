document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ADMIN SETTINGS
    ========================= */

    const PASSWORD = "5044";

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
    const adminProjectList =
        document.getElementById("adminProjectList");

    const portfolioList =
        document.getElementById("portfolioList");

    const logout =
        document.getElementById("logout");


    /* =========================
       DEFAULT PROJECTS
    ========================= */

    const defaultProjects = [
        {
            name: "TAJ SPA",
            type: "SMM • Контент • Монтаж"
        },
        {
            name: "ILMSPACE",
            type: "SMM • Контент • Монтаж"
        },
        {
            name: "COMPSTORE.TJ",
            type: "SMM • Реклама • Контент"
        },
        {
            name: "SMM PROJECT",
            type: "Маркетинг • Reels • Дизайн"
        }
    ];


    /* =========================
       PROJECT STORAGE
    ========================= */

    function getProjects() {

        const saved =
            localStorage.getItem("manuchekhrProjects");

        if (!saved) {
            return defaultProjects;
        }

        try {
            return JSON.parse(saved);
        } catch {
            return defaultProjects;
        }
    }


    function saveProjects(projects) {

        localStorage.setItem(
            "manuchekhrProjects",
            JSON.stringify(projects)
        );
    }


    /* =========================
       MESSAGE
    ========================= */

    function showMessage(text) {

        const oldMessage =
            document.querySelector(".js-message");

        if (oldMessage) {
            oldMessage.remove();
        }

        const message =
            document.createElement("div");

        message.className = "js-message";
        message.textContent = text;

        Object.assign(message.style, {
            position: "fixed",
            top: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "99999",
            padding: "14px 22px",
            borderRadius: "14px",
            background:
                "linear-gradient(135deg,#8b5cf6,#ec4899)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "14px",
            boxShadow:
                "0 15px 40px rgba(0,0,0,.4)",
            opacity: "1",
            transition: ".3s"
        });

        document.body.appendChild(message);

        setTimeout(() => {

            message.style.opacity = "0";

            setTimeout(() => {
                message.remove();
            }, 300);

        }, 2200);
    }


    /* =========================
       PORTFOLIO
    ========================= */

    function renderPortfolio() {

        if (!portfolioList) return;

        const projects = getProjects();

        portfolioList.innerHTML = "";

        if (projects.length === 0) {

            portfolioList.innerHTML = `
                <div class="service">
                    <h3>Ҳоло проект нест</h3>
                    <p>
                        Аз Admin Panel проект илова кунед.
                    </p>
                </div>
            `;

            return;
        }


        projects.forEach((project, index) => {

            const card =
                document.createElement("div");

            card.className = "service wow-card";

            card.innerHTML = `
                <span>PROJECT ${String(index + 1).padStart(2, "0")}</span>

                <h3>
                    ${escapeHTML(project.name)}
                </h3>

                <p>
                    ${escapeHTML(project.type)}
                </p>
            `;

            portfolioList.appendChild(card);
        });

        activateAnimations();
    }


    /* =========================
       ADMIN PROJECTS
    ========================= */

    function renderAdminProjects() {

        if (!adminProjectList) return;

        const projects = getProjects();

        adminProjectList.innerHTML = "";

        if (projects.length === 0) {

            adminProjectList.innerHTML = `
                <p>Ҳоло ягон проект нест.</p>
            `;

            return;
        }


        projects.forEach((project, index) => {

            const item =
                document.createElement("div");

            item.className = "admin-project";

            item.innerHTML = `
                <h4>
                    ${escapeHTML(project.name)}
                </h4>

                <p>
                    ${escapeHTML(project.type)}
                </p>

                <button
                    class="delete-project"
                    data-index="${index}">
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


    /* =========================
       OPEN ADMIN
    ========================= */

    if (openAdmin) {

        openAdmin.addEventListener(
            "click",
            () => {

                loginModal.classList.add("active");

                if (adminPassword) {
                    adminPassword.focus();
                }

            }
        );
    }


    /* =========================
       CLOSE LOGIN
    ========================= */

    if (closeLogin) {

        closeLogin.addEventListener(
            "click",
            () => {

                loginModal.classList.remove("active");

                if (adminPassword) {
                    adminPassword.value = "";
                }

            }
        );
    }


    /* =========================
       LOGIN
    ========================= */

    if (loginBtn) {

        loginBtn.addEventListener(
            "click",
            () => {

                const enteredPassword =
                    adminPassword.value.trim();

                if (
                    enteredPassword === PASSWORD
                ) {

                    loginModal.classList.remove(
                        "active"
                    );

                    adminModal.classList.add(
                        "active"
                    );

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
        );
    }


    /* ENTER LOGIN */

    if (adminPassword) {

        adminPassword.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    loginBtn.click();
                }

            }
        );
    }


    /* =========================
       CLOSE ADMIN
    ========================= */

    if (closeAdmin) {

        closeAdmin.addEventListener(
            "click",
            () => {

                adminModal.classList.remove(
                    "active"
                );

            }
        );
    }


    /* =========================
       ADD PROJECT
    ========================= */

    if (addProject) {

        addProject.addEventListener(
            "click",
            () => {

                const name =
                    projectName.value.trim();

                const type =
                    projectType.value.trim();

                if (!name || !type) {

                    showMessage(
                        "Номи проект ва хизматро пур кун!"
                    );

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
                    "Проект бомуваффақият илова шуд ✓"
                );
            }
        );
    }


    /* =========================
       LOGOUT
    ========================= */

    if (logout) {

        logout.addEventListener(
            "click",
            () => {

                adminModal.classList.remove(
                    "active"
                );

                showMessage(
                    "Аз Admin баромадед"
                );

            }
        );
    }


    /* =========================
       CLOSE MODAL BACKGROUND
    ========================= */

    [loginModal, adminModal]
        .forEach(modal => {

            if (!modal) return;

            modal.addEventListener(
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
       ESCAPE
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (loginModal) {
                    loginModal.classList.remove(
                        "active"
                    );
                }

                if (adminModal) {
                    adminModal.classList.remove(
                        "active"
                    );
                }

            }
        }
    );


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute("href");

                    const target =
                        document.querySelector(id);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );
        });


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    const header =
        document.querySelector("header");

    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;

            if (window.scrollY > 40) {

                header.style.background =
                    "rgba(8,6,15,.92)";

                header.style.boxShadow =
                    "0 15px 50px rgba(0,0,0,.45)";

                header.style.transform =
                    "translateY(-2px)";

            } else {

                header.style.background =
                    "rgba(18,14,29,.78)";

                header.style.boxShadow =
                    "none";

                header.style.transform =
                    "translateY(0)";
            }

        }
    );


    /* =================================================
       🚀 WOW ANIMATION SYSTEM
    ================================================= */


    /* -------------------------
       SCROLL REVEAL
    ------------------------- */

    function activateAnimations() {

        const elements =
            document.querySelectorAll(
                ".section, .stats, .service, .stat, .about-card, .contact-section, .wow-card"
            );

        elements.forEach((element, index) => {

            if (element.dataset.animationReady) {
                return;
            }

            element.dataset.animationReady = "true";

            element.style.opacity = "0";
            element.style.transform =
                "translateY(45px) scale(.98)";
            element.style.filter = "blur(5px)";
            element.style.transition =
                `opacity .8s ease ${index * .04}s,
                 transform .8s cubic-bezier(.16,1,.3,1) ${index * .04}s,
                 filter .8s ease ${index * .04}s`;
        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0) scale(1)";

                            entry.target.style.filter =
                                "blur(0)";

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: .12
                }
            );


        elements.forEach(element => {
            observer.observe(element);
        });
    }


    /* -------------------------
       MOUSE GLOW
    ------------------------- */

    const glow =
        document.createElement("div");

    glow.className = "mouse-glow";

    Object.assign(glow.style, {
        position: "fixed",
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "0",
        transform: "translate(-50%, -50%)",
        background:
            "radial-gradient(circle, rgba(168,85,247,.16), rgba(255,60,170,.06), transparent 70%)",
        filter: "blur(15px)",
        opacity: "0",
        transition: "opacity .4s ease"
    });

    document.body.appendChild(glow);


    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                event.clientX + "px";

            glow.style.top =
                event.clientY + "px";

            glow.style.opacity = "1";
        }
    );


    document.addEventListener(
        "mouseleave",
        () => {
            glow.style.opacity = "0";
        }
    );


    /* -------------------------
       CARD 3D HOVER
    ------------------------- */

    document
        .querySelectorAll(
            ".service, .stat, .about-card"
        )
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateX =
                        ((y / rect.height) - .5) * -5;

                    const rotateY =
                        ((x / rect.width) - .5) * 5;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
                }
            );
        });


    /* -------------------------
       BUTTON RIPPLE
    ------------------------- */

    document
        .querySelectorAll(
            ".btn-primary, .btn-secondary, .header-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const ripple =
                        document.createElement("span");

                    Object.assign(ripple.style, {
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background:
                            "rgba(255,255,255,.5)",
                        left:
                            event.offsetX + "px",
                        top:
                            event.offsetY + "px",
                        transform:
                            "translate(-50%,-50%) scale(1)",
                        pointerEvents: "none",
                        animation:
                            "wowRipple .6s ease-out forwards"
                    });

                    button.appendChild(ripple);

                    setTimeout(() => {
                        ripple.remove();
                    }, 700);
                }
            );
        });


    /* -------------------------
       DYNAMIC RIPPLE CSS
    ------------------------- */

    const style =
        document.createElement("style");

    style.textContent = `
        @keyframes wowRipple {
            from {
                opacity: .8;
                transform:
                    translate(-50%,-50%)
                    scale(1);
            }

            to {
                opacity: 0;
                transform:
                    translate(-50%,-50%)
                    scale(25);
            }
        }

        .btn-primary,
        .btn-secondary,
        .header-btn {
            position: relative;
            overflow: hidden;
        }

        .mouse-glow {
            mix-blend-mode: screen;
        }
    `;

    document.head.appendChild(style);


    /* -------------------------
       HERO PARALLAX
    ------------------------- */

    const hero =
        document.querySelector(".hero");

    if (hero) {

        document.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 768) {
                    return;
                }

                const x =
                    (event.clientX /
                        window.innerWidth - .5);

                const y =
                    (event.clientY /
                        window.innerHeight - .5);

                hero.style.transform =
                    `translate(
                        ${x * 5}px,
                        ${y * 5}px
                    )`;
            }
        );
    }


    /* -------------------------
       NUMBER GLOW
    ------------------------- */

    document
        .querySelectorAll(".stat strong")
        .forEach(number => {

            number.style.transition =
                "text-shadow .4s ease";

            number.addEventListener(
                "mouseenter",
                () => {

                    number.style.textShadow =
                        "0 0 15px #a855f7, 0 0 35px #ff3cac";
                }
            );

            number.addEventListener(
                "mouseleave",
                () => {

                    number.style.textShadow =
                        "none";
                }
            );
        });


    /* =========================
       SECURITY
    ========================= */

    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =========================
       START
    ========================= */

    renderPortfolio();
    renderAdminProjects();

    setTimeout(() => {
        activateAnimations();
    }, 150);

});
