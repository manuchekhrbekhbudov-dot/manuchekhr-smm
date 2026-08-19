document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const mobileMenu = document.getElementById("mobileMenu");
    const nav = document.getElementById("nav");

    if (mobileMenu && nav) {
        mobileMenu.addEventListener("click", () => {
            nav.classList.toggle("mobile-active");
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("mobile-active");
            });
        });
    }


    /* =========================
       SCROLL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
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


    /* =========================
       ADMIN
    ========================= */

    const openAdmin = document.getElementById("openAdmin");

    const loginModal = document.getElementById("loginModal");
    const adminModal = document.getElementById("adminModal");

    const closeLogin = document.getElementById("closeLogin");
    const closeAdmin = document.getElementById("closeAdmin");

    const loginBtn = document.getElementById("loginBtn");
    const logout = document.getElementById("logout");

    const adminPassword =
        document.getElementById("adminPassword");


    /*
       Пароли худро ҳамин ҷо иваз карда метавонӣ.
       Масалан:
       const ADMIN_PASSWORD = "12345";
    */

    const ADMIN_PASSWORD = "12345";


    /* OPEN LOGIN */

    if (openAdmin) {
        openAdmin.addEventListener("click", () => {

            loginModal.classList.add("active");

            setTimeout(() => {
                adminPassword.focus();
            }, 200);
        });
    }


    /* CLOSE LOGIN */

    if (closeLogin) {
        closeLogin.addEventListener("click", () => {
            loginModal.classList.remove("active");
        });
    }


    /* LOGIN */

    if (loginBtn) {

        loginBtn.addEventListener("click", login);

        adminPassword.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                login();
            }

        });
    }


    function login() {

        const password = adminPassword.value;

        if (password === ADMIN_PASSWORD) {

            loginModal.classList.remove("active");

            adminModal.classList.add("active");

            adminPassword.value = "";

            loadProjects();

        } else {

            alert("❌ Парол нодуруст аст!");

            adminPassword.value = "";

            adminPassword.focus();
        }
    }


    /* CLOSE ADMIN */

    if (closeAdmin) {

        closeAdmin.addEventListener("click", () => {
            adminModal.classList.remove("active");
        });

    }


    /* LOGOUT */

    if (logout) {

        logout.addEventListener("click", () => {

            adminModal.classList.remove("active");

        });

    }


    /* =========================
       CLOSE MODAL OUTSIDE
    ========================= */

    [loginModal, adminModal].forEach(modal => {

        if (!modal) return;

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                modal.classList.remove("active");
            }

        });

    });


    /* =========================
       PROJECT SYSTEM
    ========================= */

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


    let projects =
        JSON.parse(localStorage.getItem("manuchekhrProjects")) || [];


    /* ADD PROJECT */

    if (addProject) {

        addProject.addEventListener("click", () => {

            const name = projectName.value.trim();
            const type = projectType.value.trim();

            if (!name) {

                alert("Номи проектро навис!");

                projectName.focus();

                return;
            }

            if (!type) {

                alert("Хизматро навис!");

                projectType.focus();

                return;
            }


            const file = projectImage.files[0];


            if (file) {

                const reader = new FileReader();

                reader.onload = function (event) {

                    createProject(
                        name,
                        type,
                        event.target.result
                    );

                };

                reader.readAsDataURL(file);

            } else {

                createProject(
                    name,
                    type,
                    ""
                );

            }

        });

    }


    function createProject(name, type, image) {

        const project = {

            id: Date.now(),

            name: name,

            type: type,

            image: image

        };


        projects.push(project);


        saveProjects();

        renderProjects();


        projectName.value = "";

        projectType.value = "";

        projectImage.value = "";


        alert("✅ Проект илова шуд!");

    }


    /* =========================
       SAVE
    ========================= */

    function saveProjects() {

        localStorage.setItem(
            "manuchekhrProjects",
            JSON.stringify(projects)
        );

    }


    /* =========================
       LOAD
    ========================= */

    function loadProjects() {

        projects =
            JSON.parse(
                localStorage.getItem("manuchekhrProjects")
            ) || [];


        renderProjects();

    }


    /* =========================
       RENDER
    ========================= */

    function renderProjects() {

        renderAdminProjects();

        renderPortfolio();

    }


    /* =========================
       ADMIN PROJECTS
    ========================= */

    function renderAdminProjects() {

        if (!adminProjectList) return;


        adminProjectList.innerHTML = "";


        if (projects.length === 0) {

            adminProjectList.innerHTML = `
                <div class="admin-project">
                    <p>Ҳоло проект нест.</p>
                </div>
            `;

            return;
        }


        projects.forEach(project => {

            const div =
                document.createElement("div");


            div.className = "admin-project";


            div.innerHTML = `

                <h4>
                    ${escapeHTML(project.name)}
                </h4>

                <p>
                    ${escapeHTML(project.type)}
                </p>

                <button
                    class="delete-project"
                    data-id="${project.id}"
                >
                    Нест кардан
                </button>

            `;


            adminProjectList.appendChild(div);

        });


        document
            .querySelectorAll(".delete-project")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id =
                        Number(button.dataset.id);


                    projects =
                        projects.filter(
                            project => project.id !== id
                        );


                    saveProjects();

                    renderProjects();

                });

            });

    }


    /* =========================
       PORTFOLIO
    ========================= */

    function renderPortfolio() {

        if (!portfolioList) return;


        portfolioList.innerHTML = "";


        /*
           Агар проект надошта бошӣ,
           3 проектҳои намунавӣ нишон медиҳем.
        */

        if (projects.length === 0) {

            const defaultProjects = [

                {
                    name: "TAJ SPA",
                    type: "SMM • Контент • Монтаж"
                },

                {
                    name: "ILMSPACE",
                    type: "SMM • Контент • Маркетинг"
                },

                {
                    name: "COMPSTORE.TJ",
                    type: "SMM • Реклама • Контент"
                }

            ];


            defaultProjects.forEach(project => {

                createPortfolioCard(project);

            });


            return;
        }


        projects.forEach(project => {

            createPortfolioCard(project);

        });

    }


    function createPortfolioCard(project) {

        const card =
            document.createElement("div");


        card.className = "portfolio-card";


        if (project.image) {

            card.innerHTML = `

                <img
                    src="${project.image}"
                    alt="${escapeHTML(project.name)}"
                >

                <h3>
                    ${escapeHTML(project.name)}
                </h3>

                <p>
                    ${escapeHTML(project.type)}
                </p>

            `;

        } else {

            card.innerHTML = `

                <div class="portfolio-placeholder">
                    MB
                </div>

                <h3>
                    ${escapeHTML(project.name)}
                </h3>

                <p>
                    ${escapeHTML(project.type)}
                </p>

            `;

        }


        portfolioList.appendChild(card);

    }


    /* =========================
       SECURITY
    ========================= */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    renderPortfolio();

});
