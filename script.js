/* =========================================================
   MANUCHEKHR — SCRIPT.JS
   Firebase + Portfolio + Admin + Complaints
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAteF9GeUK8RyKohaiBy_K7dsLix4Z0Sho",
    authDomain: "manuchekhr-smm.firebaseapp.com",
    projectId: "manuchekhr-smm",
    storageBucket: "manuchekhr-smm.firebasestorage.app",
    messagingSenderId: "226231175635",
    appId: "1:226231175635:web:d9c1b6803e6cb129b44726",
    measurementId: "G-5M5SP1PPTY"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
};


/* =========================================================
   FIREBASE START
   ========================================================= */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


/* =========================================================
   ADMIN PASSWORD
   ========================================================= */

const ADMIN_PASSWORD = "123456";

const openAdmin = document.getElementById("openAdmin");
const loginModal = document.getElementById("loginModal");
const adminModal = document.getElementById("adminModal");

const closeLogin = document.getElementById("closeLogin");
const closeAdmin = document.getElementById("closeAdmin");

const loginBtn = document.getElementById("loginBtn");
const adminPassword = document.getElementById("adminPassword");


openAdmin.addEventListener("click", () => {
    loginModal.classList.add("active");
});


closeLogin.addEventListener("click", () => {
    loginModal.classList.remove("active");
});


loginBtn.addEventListener("click", () => {

    const password = adminPassword.value.trim();

    if (password === ADMIN_PASSWORD) {

        loginModal.classList.remove("active");
        adminModal.classList.add("active");

        adminPassword.value = "";

    } else {

        alert("Парол нодуруст аст ❌");

    }

});


closeAdmin.addEventListener("click", () => {
    adminModal.classList.remove("active");
});

/* =========================================================
   ELEMENTS
   ========================================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const nav =
    document.getElementById("nav");

const openAdmin =
    document.getElementById("openAdmin");

const loginModal =
    document.getElementById("loginModal");

const adminModal =
    document.getElementById("adminModal");

const closeLogin =
    document.getElementById("closeLogin");

const closeAdmin =
    document.getElementById("closeAdmin");

const loginBtn =
    document.getElementById("loginBtn");

const logoutBtn =
    document.getElementById("logout");

const adminPassword =
    document.getElementById("adminPassword");

const addProjectBtn =
    document.getElementById("addProject");

const projectName =
    document.getElementById("projectName");

const projectType =
    document.getElementById("projectType");

const projectImage =
    document.getElementById("projectImage");

const portfolioList =
    document.getElementById("portfolioList");

const adminProjectList =
    document.getElementById("adminProjectList");

const complaintForm =
    document.getElementById("complaintForm");

const complaintList =
    document.getElementById("complaintList");

const complaintCount =
    document.getElementById("complaintCount");


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (mobileMenu && nav) {

    mobileMenu.addEventListener("click", () => {

        nav.classList.toggle("active");

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });

}


/* =========================================================
   MODAL FUNCTIONS
   ========================================================= */

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

if (openAdmin) {

    openAdmin.addEventListener("click", () => {

        openModal(loginModal);

        if (adminPassword) {
            adminPassword.focus();
        }

    });

}


if (closeLogin) {

    closeLogin.addEventListener("click", () => {

        closeModal(loginModal);

    });

}


if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const password =
            adminPassword.value.trim();


        if (password === ADMIN_PASSWORD) {

            sessionStorage.setItem(
                "manuchekhr_admin",
                "true"
            );

            adminPassword.value = "";

            closeModal(loginModal);

            openModal(adminModal);

            loadProjects();

        } else {

            alert("Парол нодуруст аст ❌");

            adminPassword.value = "";

            adminPassword.focus();

        }

    });

}


/* ENTER FOR LOGIN */

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


/* =========================================================
   CLOSE ADMIN
   ========================================================= */

if (closeAdmin) {

    closeAdmin.addEventListener("click", () => {

        closeModal(adminModal);

    });

}


/* =========================================================
   LOGOUT
   ========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem(
            "manuchekhr_admin"
        );

        closeModal(adminModal);

    });

}


/* =========================================================
   CLOSE MODAL BY BACKGROUND
   ========================================================= */

[loginModal, adminModal].forEach(modal => {

    if (!modal) return;

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeModal(modal);

        }

    });

});


/* =========================================================
   PORTFOLIO — LOAD
   ========================================================= */

async function loadProjects() {

    if (!portfolioList) return;

    try {

        const projectsRef =
            collection(db, "projects");

        const snapshot =
            await getDocs(projectsRef);

        const projects = [];

        snapshot.forEach(item => {

            projects.push({
                id: item.id,
                ...item.data()
            });

        });


        portfolioList.innerHTML = "";


        if (projects.length === 0) {

            portfolioList.innerHTML = `
                <div class="empty-portfolio">
                    <p>Портфолио ҳоло холӣ аст.</p>
                </div>
            `;

            return;

        }


        projects.forEach(project => {

            const card =
                document.createElement("article");

            card.className =
                "portfolio-card";


            card.innerHTML = `

                ${
                    project.image
                    ? `
                        <img
                            src="${escapeHTML(project.image)}"
                            alt="${escapeHTML(project.name || "Project")}"
                        >
                    `
                    : `
                        <div
                            style="
                                height:245px;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                background:
                                linear-gradient(
                                    135deg,
                                    #17121f,
                                    #09090c
                                );
                                font-size:50px;
                                font-weight:900;
                                color:#a855f7;
                            "
                        >
                            MB
                        </div>
                    `
                }

                <div class="portfolio-info">

                    <small>
                        ${escapeHTML(project.type || "PROJECT")}
                    </small>

                    <h3>
                        ${escapeHTML(project.name || "Без ном")}

                    </h3>

                </div>

            `;


            portfolioList.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Portfolio error:",
            error
        );

        portfolioList.innerHTML = `
            <div class="empty-portfolio">
                <p>
                    Портфолиоро бор кардан натавонистем.
                </p>
            </div>
        `;

    }

}


/* =========================================================
   ADMIN PROJECT LIST
   ========================================================= */

async function loadAdminProjects() {

    if (!adminProjectList) return;


    try {

        const snapshot =
            await getDocs(
                collection(db, "projects")
            );


        adminProjectList.innerHTML = "";


        if (snapshot.empty) {

            adminProjectList.innerHTML = `
                <p class="empty-message">
                    Ҳоло проект нест.
                </p>
            `;

            return;

        }


        snapshot.forEach(item => {

            const project =
                item.data();


            const element =
                document.createElement("div");

            element.className =
                "admin-item";


            element.innerHTML = `

                <div class="admin-item-info">

                    <strong>
                        ${escapeHTML(project.name || "Без ном")}
                    </strong>

                    <span>
                        ${escapeHTML(project.type || "")}
                    </span>

                </div>

                <button
                    class="delete-project"
                    data-id="${item.id}"
                    type="button"
                >
                    Нест кардан
                </button>

            `;


            adminProjectList.appendChild(element);

        });


        adminProjectList
            .querySelectorAll(".delete-project")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteProject(
                            button.dataset.id
                        );

                    }
                );

            });


    } catch (error) {

        console.error(
            "Admin projects error:",
            error
        );

    }

}


/* =========================================================
   DELETE PROJECT
   ========================================================= */

async function deleteProject(id) {

    const confirmed =
        confirm(
            "Ин проектро нест кардан мехоҳед?"
        );


    if (!confirmed) return;


    try {

        await deleteDoc(
            doc(db, "projects", id)
        );


        await loadProjects();

        await loadAdminProjects();


    } catch (error) {

        console.error(
            "Delete project error:",
            error
        );

        alert(
            "Проектро нест карда нашуд."
        );

    }

}


/* =========================================================
   ADD PROJECT
   ========================================================= */

if (addProjectBtn) {

    addProjectBtn.addEventListener(
        "click",
        async () => {

            const name =
                projectName.value.trim();

            const type =
                projectType.value.trim();

            const file =
                projectImage.files[0];


            if (!name || !type) {

                alert(
                    "Номи проект ва хизматро пур кунед."
                );

                return;

            }


            addProjectBtn.disabled = true;

            addProjectBtn.textContent =
                "Илова шуда истодааст...";


            try {

                let image = "";


                /*
                    Мо ҳоло файлро Firebase Storage
                    истифода накарда нигоҳ намедорем.

                    Барои ҳамин:
                    агар файл интихоб шавад,
                    онро Base64 мекунем.
                */

                if (file) {

                    image =
                        await fileToBase64(file);

                }


                await addDoc(
                    collection(db, "projects"),
                    {
                        name: name,
                        type: type,
                        image: image,
                        createdAt:
                            serverTimestamp()
                    }
                );


                projectName.value = "";

                projectType.value = "";

                projectImage.value = "";


                alert(
                    "Проект бомуваффақият илова шуд ✅"
                );


                await loadProjects();

                await loadAdminProjects();


            } catch (error) {

                console.error(
                    "Add project error:",
                    error
                );

                alert(
                    "Проект илова нашуд. Console-ро санҷед."
                );

            } finally {

                addProjectBtn.disabled = false;

                addProjectBtn.textContent =
                    "+ Илова кардани проект";

            }

        }
    );

}


/* =========================================================
   COMPLAINT FORM
   ========================================================= */

if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();

            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            if (!name || !phone || !message) {

                alert(
                    "Лутфан ҳамаи майдонҳоро пур кунед."
                );

                return;

            }


            const button =
                complaintForm.querySelector(
                    "button"
                );


            button.disabled = true;

            button.textContent =
                "Фиристода истодааст...";


            try {

                await addDoc(
                    collection(db, "complaints"),
                    {
                        name: name,
                        phone: phone,
                        message: message,
                        status: "new",
                        createdAt:
                            serverTimestamp()
                    }
                );


                complaintForm.reset();


                alert(
                    "Паёми шумо фиристода шуд ✅"
                );


            } catch (error) {

                console.error(
                    "Complaint error:",
                    error
                );

                alert(
                    "Хато шуд. Паём фиристода нашуд."
                );

            } finally {

                button.disabled = false;

                button.textContent =
                    "Фиристодан →";

            }

        }
    );

}


/* =========================================================
   REAL-TIME COMPLAINTS
   ========================================================= */

function listenComplaints() {

    if (!complaintList) return;


    const complaintsRef =
        collection(db, "complaints");


    const complaintsQuery =
        query(
            complaintsRef,
            orderBy(
                "createdAt",
                "desc"
            )
        );


    onSnapshot(
        complaintsQuery,
        snapshot => {

            if (
                !sessionStorage.getItem(
                    "manuchekhr_admin"
                )
            ) {

                return;

            }


            complaintList.innerHTML = "";


            complaintCount.textContent =
                snapshot.size;


            if (snapshot.empty) {

                complaintList.innerHTML = `
                    <p class="empty-message">
                        Ҳоло шикоят нест.
                    </p>
                `;

                return;

            }


            snapshot.forEach(item => {

                const complaint =
                    item.data();


                const element =
                    document.createElement("div");

                element.className =
                    "complaint-item";


                let date = "";

                if (
                    complaint.createdAt &&
                    complaint.createdAt.toDate
                ) {

                    date =
                        complaint
                            .createdAt
                            .toDate()
                            .toLocaleString(
                                "tg-TJ"
                            );

                }


                element.innerHTML = `

                    <strong>
                        ${escapeHTML(
                            complaint.name || "Номаълум"
                        )}
                    </strong>

                    <div class="complaint-phone">
                        ${escapeHTML(
                            complaint.phone || ""
                        )}
                    </div>

                    <div class="complaint-message">
                        ${escapeHTML(
                            complaint.message || ""
                        )}
                    </div>

                    ${
                        date
                        ? `
                            <span class="complaint-date">
                                ${date}
                            </span>
                        `
                        : ""
                    }

                    <button
                        class="delete-complaint"
                        data-id="${item.id}"
                        type="button"
                    >
                        Нест кардан
                    </button>

                `;


                complaintList.appendChild(
                    element
                );

            });


            complaintList
                .querySelectorAll(
                    ".delete-complaint"
                )
                .forEach(button => {

                    button.addEventListener(
                        "click",
                        async () => {

                            await deleteComplaint(
                                button.dataset.id
                            );

                        }
                    );

                });

        },
        error => {

            console.error(
                "Complaints listener error:",
                error
            );

        }
    );

}


/* =========================================================
   DELETE COMPLAINT
   ========================================================= */

async function deleteComplaint(id) {

    const confirmed =
        confirm(
            "Ин шикоятро нест кардан мехоҳед?"
        );


    if (!confirmed) return;


    try {

        await deleteDoc(
            doc(
                db,
                "complaints",
                id
            )
        );

    } catch (error) {

        console.error(
            "Delete complaint error:",
            error
        );

        alert(
            "Шикоятро нест карда нашуд."
        );

    }

}


/* =========================================================
   FILE → BASE64
   ========================================================= */

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = () => {

                resolve(
                    reader.result
                );

            };


            reader.onerror = reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   SECURITY — HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

loadProjects();

listenComplaints();


/*
   Агар Admin Panel кушода шавад,
   project-ҳоро аз Firebase мегирем.
*/

if (
    sessionStorage.getItem(
        "manuchekhr_admin"
    ) === "true"
) {

    loadAdminProjects();

}
