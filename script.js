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


// =====================================
// FIREBASE
// =====================================

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


// =====================================
// ADMIN PASSWORD
// =====================================

const ADMIN_PASSWORD = "123456";


// =====================================
// ELEMENTS
// =====================================

const openAdmin = document.getElementById("openAdmin");

const loginModal = document.getElementById("loginModal");
const adminModal = document.getElementById("adminModal");

const closeLogin = document.getElementById("closeLogin");
const closeAdmin = document.getElementById("closeAdmin");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logout");

const adminPassword = document.getElementById("adminPassword");

const complaintForm =
    document.getElementById("complaintForm");

const complaintList =
    document.getElementById("complaintList");

const complaintCount =
    document.getElementById("complaintCount");

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

const mobileMenu =
    document.getElementById("mobileMenu");

const nav =
    document.getElementById("nav");


// =====================================
// MODAL
// =====================================

function openModal(modal) {

    if (!modal) {
        console.error("Modal ёфт нашуд!");
        return;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


// =====================================
// OPEN ADMIN
// =====================================

if (openAdmin) {

    openAdmin.addEventListener("click", () => {

        openModal(loginModal);

        if (adminPassword) {
            adminPassword.focus();
        }

    });

}


// =====================================
// CLOSE LOGIN
// =====================================

if (closeLogin) {

    closeLogin.addEventListener("click", () => {

        closeModal(loginModal);

    });

}


// =====================================
// CLOSE ADMIN
// =====================================

if (closeAdmin) {

    closeAdmin.addEventListener("click", () => {

        closeModal(adminModal);

    });

}


// =====================================
// LOGIN
// =====================================

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const password =
            adminPassword.value.trim();


        if (password !== ADMIN_PASSWORD) {

            alert("Парол нодуруст аст ❌");

            adminPassword.value = "";

            adminPassword.focus();

            return;
        }


        sessionStorage.setItem(
            "adminLogin",
            "true"
        );


        closeModal(loginModal);

        openModal(adminModal);


        await loadAdminProjects();

        loadComplaints();

    });

}


// ENTER FOR PASSWORD

if (adminPassword) {

    adminPassword.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                loginBtn.click();

            }

        }
    );

}


// =====================================
// LOGOUT
// =====================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem(
            "adminLogin"
        );

        closeModal(adminModal);

    });

}


// =====================================
// CLOSE WHEN CLICK OUTSIDE
// =====================================

[loginModal, adminModal].forEach(modal => {

    if (!modal) return;


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeModal(modal);

        }

    });

});


// =====================================
// MOBILE MENU
// =====================================

if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}


if (nav) {

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });

}


// =====================================
// ESCAPE HTML
// =====================================

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// =====================================
// IMAGE TO BASE64
// =====================================

function imageToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();


        reader.onload = () => {

            resolve(reader.result);

        };


        reader.onerror = reject;


        reader.readAsDataURL(file);

    });

}


// =====================================
// LOAD PORTFOLIO
// =====================================

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
                    Портфолио ҳоло холӣ аст.
                </div>
            `;

            return;
        }


        snapshot.forEach(item => {

            const data = item.data();


            const card =
                document.createElement("article");


            card.className =
                "portfolio-card";


            card.innerHTML = `

                ${
                    data.image
                    ?
                    `
                    <img
                        src="${data.image}"
                        alt="${escapeHTML(data.name)}"
                    >
                    `
                    :
                    `
                    <div
                        style="
                        height:245px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:#111;
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
                        ${escapeHTML(data.type)}
                    </small>

                    <h3>
                        ${escapeHTML(data.name)}
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
                Портфолиоро бор карда нашуд.
            </div>
        `;

    }

}


// =====================================
// LOAD ADMIN PROJECTS
// =====================================

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
                <div class="empty-message">
                    Ҳоло проект нест.
                </div>
            `;

            return;
        }


        snapshot.forEach(item => {

            const data =
                item.data();


            const div =
                document.createElement("div");


            div.className =
                "admin-item";


            div.innerHTML = `

                <div class="admin-item-info">

                    <strong>
                        ${escapeHTML(data.name)}
                    </strong>

                    <span>
                        ${escapeHTML(data.type)}
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


            adminProjectList.appendChild(div);

        });


        document
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


        adminProjectList.innerHTML = `
            <div class="empty-message">
                Firebase Rules-ро санҷед.
            </div>
        `;

    }

}


// =====================================
// ADD PROJECT
// =====================================

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
                        await imageToBase64(file);

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
                    "Проект илова шуд ✅"
                );


                await loadProjects();

                await loadAdminProjects();


            } catch (error) {

                console.error(
                    "Add project error:",
                    error
                );


                alert(
                    "Проект илова нашуд. Firebase Rules-ро санҷед."
                );

            } finally {

                addProjectBtn.disabled = false;

                addProjectBtn.textContent =
                    "+ Илова кардани проект";

            }

        }
    );

}


// =====================================
// DELETE PROJECT
// =====================================

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


// =====================================
// COMPLAINT FORM
// =====================================

if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        async (event) => {

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


            const button =
                complaintForm.querySelector(
                    "button"
                );


            if (
                !name ||
                !phone ||
                !message
            ) {

                alert(
                    "Лутфан ҳамаи майдонҳоро пур кунед."
                );

                return;
            }


            button.disabled = true;

            button.textContent =
                "Фиристода истодааст...";


            try {

                await addDoc(
                    collection(
                        db,
                        "complaints"
                    ),
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
                    "Шикояти шумо фиристода шуд ✅"
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

        }
    );

}


// =====================================
// LOAD COMPLAINTS
// =====================================

function loadComplaints() {

    if (!complaintList) return;


    const complaintsQuery =
        query(
            collection(
                db,
                "complaints"
            ),
            orderBy(
                "createdAt",
                "desc"
            )
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
                    <div class="empty-message">
                        Ҳоло шикоят нест.
                    </div>
                `;

                return;
            }


            snapshot.forEach(item => {

                const data =
                    item.data();


                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "complaint-item";


                let date = "";


                if (
                    data.createdAt &&
                    data.createdAt.toDate
                ) {

                    date =
                        data.createdAt
                            .toDate()
                            .toLocaleString(
                                "tg-TJ"
                            );

                }


                div.innerHTML = `

                    <strong>
                        ${escapeHTML(data.name)}
                    </strong>

                    <div class="complaint-phone">
                        ${escapeHTML(data.phone)}
                    </div>

                    <div class="complaint-message">
                        ${escapeHTML(data.message)}
                    </div>

                    ${
                        date
                        ?
                        `
                        <span class="complaint-date">
                            ${date}
                        </span>
                        `
                        :
                        ""
                    }

                    <br>

                    <button
                        class="delete-complaint"
                        data-id="${item.id}"
                        type="button"
                    >
                        Нест кардан
                    </button>

                `;


                complaintList.appendChild(div);

            });


            document
                .querySelectorAll(
                    ".delete-complaint"
                )
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


            complaintList.innerHTML = `
                <div class="empty-message">
                    Firebase Rules иҷозаи хондани
                    шикоятҳоро намедиҳад.
                </div>
            `;

        }
    );

}


// =====================================
// DELETE COMPLAINT
// =====================================

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


// =====================================
// START
// =====================================

loadProjects();

console.log(
    "MANUCHEKHR WEBSITE READY ✅"
);
