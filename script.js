document.addEventListener("DOMContentLoaded", () => {

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
       GET PROJECTS
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
                "0 15px 40px rgba(0,0,0,.4)"
        });

        document.body.appendChild(message);

        setTimeout(() => {

            message.style.opacity = "0";
            message.style.transition = ".3s";

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


        projects.forEach(project => {

            const card =
                document.createElement("div");

            card.className = "service";

            card.innerHTML = `
                <span>PROJECT</span>

                <h3>
                    ${escapeHTML(project.name)}
                </h3>

                <p>
                    ${escapeHTML(project.type)}
                </p>
            `;

            portfolioList.appendChild(card);
        });
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


    /* =========================
       ENTER = LOGIN
    ========================= */

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
       CLOSE BY BACKGROUND
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
       HEADER SCROLL
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

            } else {

                header.style.background =
                    "rgba(18,14,29,.78)";

                header.style.boxShadow =
                    "none";
            }

        }
    );


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

});
