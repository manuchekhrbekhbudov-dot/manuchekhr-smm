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


/* =========================
   FIREBASE
========================= */

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


/* =========================
   ADMIN PASSWORD
========================= */

const ADMIN_PASSWORD = "123456";


/* =========================
   ELEMENTS
========================= */

const openAdmin = document.getElementById("openAdmin");
const loginModal = document.getElementById("loginModal");
const adminModal = document.getElementById("adminModal");

const closeLogin = document.getElementById("closeLogin");
const closeAdmin = document.getElementById("closeAdmin");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logout");

const adminPassword = document.getElementById("adminPassword");

const mobileMenu = document.getElementById("mobileMenu");
const nav = document.getElementById("nav");

const complaintForm = document.getElementById("complaintForm");
const complaintList = document.getElementById("complaintList");
const complaintCount = document.getElementById("complaintCount");

const addProjectBtn = document.getElementById("addProject");
const projectName = document.getElementById("projectName");
const projectType = document.getElementById("projectType");
const projectImage = document.getElementById("projectImage");

const portfolioList = document.getElementById("portfolioList");
const adminProjectList = document.getElementById("adminProjectList");


/* =========================
   MOBILE MENU
========================= */

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


/* =========================
   MODAL
========================= */

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


/* =========================
   ADMIN LOGIN
========================= */

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

            loadAdminProjects();

            loadComplaints();

        } else {

            alert("Парол нодуруст аст ❌");

            adminPassword.value = "";

        }

    });

}


if (adminPassword) {

    adminPassword.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            loginBtn.click();
        }

    });

}


/* =========================
   CLOSE ADMIN
========================= */

if (closeAdmin) {

    closeAdmin.addEventListener("click", () => {
        closeModal(adminModal);
    });

}


/* =========================
   LOGOUT
========================= */

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem(
            "manuchekhr_admin"
        );

        closeModal(adminModal);

    });

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

[loginModal, adminModal].forEach(modal => {

    if (!modal) return;

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal(modal);
        }

    });

});


/* =========================
   COMPLAINT FORM
========================= */

if (complaintForm) {

    complaintForm.addEventListener("submit", async event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !phone || !message) {

            alert("Лутфан ҳамаи майдонҳоро пур кунед.");

            return;
        }


        const button =
            complaintForm.querySelector("button");


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
                    createdAt: serverTimestamp()
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
                "Хато шуд. Firebase Rules-ро санҷед."
            );

        } finally {

            button.disabled = false;

            button.textContent =
                "Фиристодан →";

        }

    });

}


/* =========================
   LOAD COMPLAINTS
========================= */

async function loadComplaints() {

    if (!complaintList) return;


    try {

        const complaintsQuery = query(
            collection(db, "complaints"),
            orderBy("createdAt", "desc")
        );


        onSnapshot(
            complaintsQuery,
            snapshot => {

                complaintList.innerHTML = "";

                if (complaintCount) {
                    complaintCount.textContent =
                        snapshot.size;
                }


                if (snapshot.empty) {

                    complaintList.innerHTML = `
                        <p class="empty-message">
                            Ҳоло шикоят нест.
                        </p>
                    `;

                    return;
                }


                snapshot.forEach(item => {

                    const data = item.data();

                    const element =
                        document.createElement("div");

                    element.className =
                        "complaint-item";


                    let date = "";

                    if (
                        data.createdAt &&
                        data.createdAt.toDate
                    ) {

                        date =
                            data.createdAt
                                .toDate()
                                .toLocaleString("tg-TJ");

                    }


                    element.innerHTML = `

                        <strong>
                            ${escapeHTML(
                                data.name || "Номаълум"
                            )}
                        </strong>

                        <div class="complaint-phone">
                            ${escapeHTML(
                                data.phone || ""
                            )}
                        </div>

                        <div class="complaint-message">
                            ${escapeHTML(
                                data.message || ""
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
                            type="button"
                            data-id="${item.id}"
                        >
                            Нест кардан
                        </button>

                    `;


                    complaintList.appendChild(element);

                });


                document
                    .querySelectorAll(".delete-complaint")
                    .forEach(button => {

                        button.addEventListener(
                            "click",
                            () => {

                                deleteComplaint(
                                    button.dataset.id
                                );

                            }
                        );

                    });

            },
            error => {

                console.error(
                    "Complaint listener error:",
                    error
                );

            }
        );


    } catch (error) {

        console.error(
            "Load complaints error:",
            error
        );

    }

}


/* =========================
   DELETE COMPLAINT
========================= */

async function deleteComplaint(id) {

    if (
        !confirm(
            "Ин шикоятро нест кардан мехоҳед?"
        )
    ) {
        return;
    }


    try {

        await deleteDoc(
            doc(db, "complaints", id)
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


/* =========================
   ADD PROJECT
========================= */

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
                        createdAt: serverTimestamp()
                    }
                );


                projectName.value = "";
                projectType.value = "";
                projectImage.value = "";


                alert(
                    "Проект илова шуд ✅"
                );


                await loadProjects();
                await loadAdminProjects();


            } catch (error) {

                console.error(
                    "Project error:",
                    error
                );

                alert(
                    "Проект илова нашуд."
                );

            } finally {

                addProjectBtn.disabled = false;

                addProjectBtn.textContent =
                    "+ Илова кардани проект";

            }

        }
    );

}


/* =========================
   LOAD PROJECTS
========================= */

async function loadProjects() {

    if (!portfolioList) return;


    try {

        const snapshot =
            await getDocs(
                collection(db, "projects")
            );


        portfolioList.innerHTML = "";


        if (snapshot.empty) {

            portfolioList.innerHTML = `
                <div class="empty-portfolio">
                    <p>
                        Портфолио ҳоло холӣ аст.
                    </p>
                </div>
            `;

            return;
        }


        snapshot.forEach(item => {

            const project =
                item.data();


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
                            alt="${escapeHTML(
                                project.name || "Project"
                            )}"
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
                                color:#a855f7;
                                font-size:50px;
                                font-weight:900;
                            "
                        >
                            MB
                        </div>
                    `
                }

                <div class="portfolio-info">

                    <small>
                        ${escapeHTML(
                            project.type || "PROJECT"
                        )}
                    </small>

                    <h3>
                        ${escapeHTML(
                            project.name || "Без ном"
                        )}
                    </h3>

                </div>
            `;


            portfolioList.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Load projects error:",
            error
        );

    }

}


/* =========================
   ADMIN PROJECTS
========================= */

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
                        ${escapeHTML(
                            project.name || "Без ном"
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            project.type || ""
                        )}
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


/* =========================
   DELETE PROJECT
========================= */

async function deleteProject(id) {

    if (
        !confirm(
            "Ин проектро нест кардан мехоҳед?"
        )
    ) {
        return;
    }


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


/* =========================
   FILE TO BASE64
========================= */

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = () => {
                resolve(reader.result);
            };


            reader.onerror = reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================
   START
========================= */

loadProjects();
