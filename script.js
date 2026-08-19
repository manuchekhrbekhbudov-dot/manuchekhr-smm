/* =========================================
   MANUCHEKHR — PORTFOLIO JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ADMIN PASSWORD
       ========================= */

    const password = "5044";


    /* =========================
       DEFAULT PROJECTS
       ========================= */

    const defaultProjects = [
        {
            name: "TAJ SPA",
            type: "SMM • Контент • Монтаж",
            image: ""
        },
        {
            name: "ILMSPACE",
            type: "SMM • Контент • Монтаж",
            image: ""
        },
        {
            name: "COMPSTORE.TJ",
            type: "SMM • Реклама • Контент",
            image: ""
        },
        {
            name: "SMM PROJECT",
            type: "Маркетинг • Reels • Дизайн",
            image: ""
        }
    ];


    /* =========================
       GET PROJECTS
       ========================= */

    function getProjects() {

        const saved = localStorage.getItem("manuchekhrProjects");

        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return defaultProjects;
            }
        }

        return defaultProjects;
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
       PROJECT LIST
       ========================= */

    const projectList = document.getElementById("adminProjectList");


    function renderProjects() {

        if (!projectList) return;

        const projects = getProjects();

        projectList.innerHTML = "";

        if (projects.length === 0) {

            projectList.innerHTML = `
                <div class="empty-projects">
                    Ҳоло ягон проект нест.
                </div>
            `;

            return;
        }


        projects.forEach((project, index) => {

            const item = document.createElement("div");

            item.className = "admin-project-item";

            item.innerHTML = `
                <div>
                    <strong>${escapeHTML(project.name)}</strong>
                    <p>${escapeHTML(project.type)}</p>
                </div>

                <button
                    class="delete-project"
                    data-index="${index}">
                    Нест кардан
                </button>
            `;

            projectList.appendChild(item);
        });


        /* DELETE PROJECT */

        document
            .querySelectorAll(".delete-project")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index = Number(
                        button.dataset.index
                    );

                    const projects = getProjects();

                    projects.splice(index, 1);

                    saveProjects(projects);

                    renderProjects();

                    showMessage(
                        "Проект нест карда шуд"
                    );
                });

            });
    }


    /* =========================
       ADD PROJECT
       ========================= */

    const addProjectButton =
        document.getElementById("addProject");


    if (addProjectButton) {

        addProjectButton.addEventListener(
            "click",
            () => {

                const name =
                    document.getElementById(
                        "projectName"
                    )?.value.trim();

                const type =
                    document.getElementById(
                        "projectType"
                    )?.value.trim();

                const imageInput =
                    document.getElementById(
                        "projectImage"
                    );


                if (!name || !type) {

                    showMessage(
                        "Номи проект ва хизматро навис!"
                    );

                    return;
                }


                let image = "";

                if (
                    imageInput &&
                    imageInput.files &&
                    imageInput.files[0]
                ) {

                    image =
                        URL.createObjectURL(
                            imageInput.files[0]
                        );
                }


                const projects = getProjects();


                projects.push({
                    name: name,
                    type: type,
                    image: image
                });


                saveProjects(projects);


                /* CLEAR INPUTS */

                if (
                    document.getElementById(
                        "projectName"
                    )
                ) {
                    document.getElementById(
                        "projectName"
                    ).value = "";
                }


                if (
                    document.getElementById(
                        "projectType"
                    )
                ) {
                    document.getElementById(
                        "projectType"
                    ).value = "";
                }


                if (imageInput) {
                    imageInput.value = "";
                }


                renderProjects();


                showMessage(
                    "Проект бомуваффақият илова шуд ✓"
                );

            }
        );
    }


    /* =========================
       ADMIN LOGIN
       ========================= */

    const adminButton =
        document.getElementById("adminLogin");


    if (adminButton) {

        adminButton.addEventListener(
            "click",
            () => {

                const userPassword =
                    prompt(
                        "Пароли Admin-ро ворид кунед:"
                    );


                if (userPassword === password) {

                    document.body.classList.add(
                        "admin-open"
                    );

                    const adminPanel =
                        document.getElementById(
                            "adminPanel"
                        );

                    if (adminPanel) {
                        adminPanel.style.display =
                            "block";
                    }

                    showMessage(
                        "Хуш омадед ба Admin ✓"
                    );

                    renderProjects();

                } else {

                    showMessage(
                        "Парол нодуруст аст!"
                    );

                }

            }
        );
    }


    /* =========================
       LOGOUT
       ========================= */

    const logout =
        document.getElementById("logout");


    if (logout) {

        logout.addEventListener(
            "click",
            () => {

                const adminPanel =
                    document.getElementById(
                        "adminPanel"
                    );

                if (adminPanel) {
                    adminPanel.style.display =
                        "none";
                }

                document.body.classList.remove(
                    "admin-open"
                );

                showMessage(
                    "Аз Admin баромадед"
                );

            }
        );
    }


    /* =========================
       SMOOTH NAVIGATION
       ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function(event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        targetId === "#" ||
                        !targetId
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


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
       SCROLL HEADER
       ========================= */

    const header =
        document.querySelector("header");


    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;

            if (window.scrollY > 50) {

                header.style.background =
                    "rgba(8,8,12,.92)";

                header.style.boxShadow =
                    "0 15px 50px rgba(0,0,0,.45)";

            } else {

                header.style.background =
                    "rgba(15,15,23,.72)";

                header.style.boxShadow =
                    "0 20px 70px rgba(0,0,0,.35)";
            }

        }
    );


    /* =========================
       MESSAGE
       ========================= */

    function showMessage(text) {

        const old =
            document.querySelector(
                ".js-message"
            );

        if (old) old.remove();


        const message =
            document.createElement("div");

        message.className =
            "js-message";

        message.textContent = text;


        Object.assign(
            message.style,
            {
                position: "fixed",
                top: "25px",
                left: "50%",
                transform:
                    "translateX(-50%)",
                zIndex: "9999",
                padding:
                    "14px 22px",
                borderRadius:
                    "14px",
                background:
                    "linear-gradient(135deg,#8b5cf6,#ec4899)",
                color: "#fff",
                fontWeight: "700",
                boxShadow:
                    "0 15px 40px rgba(0,0,0,.4)",
                fontSize: "14px"
            }
        );


        document.body.appendChild(
            message
        );


        setTimeout(() => {

            message.style.opacity = "0";
            message.style.transition =
                ".4s";

            setTimeout(() => {
                message.remove();
            }, 400);

        }, 2500);

    }


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
       INITIALIZE
       ========================= */

    renderProjects();

});
