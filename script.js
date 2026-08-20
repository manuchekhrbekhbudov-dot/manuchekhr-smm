/* =========================================================
   MANUCHEKHR — SCRIPT.JS
   FIREBASE + CONTACT FORM + ADMIN PANEL
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {
    apiKey:
        "AIzaSyAteF9GeUK8RyKohaiBy_K7dsLix4Z0Sho",

    authDomain:
        "manuchekhr-smm.firebaseapp.com",

    projectId:
        "manuchekhr-smm",

    storageBucket:
        "manuchekhr-smm.firebasestorage.app",

    messagingSenderId:
        "226231175635",

    appId:
        "1:226231175635:web:d9c1b6803e6cb129b44726",

    measurementId:
        "G-5M5SP1PPTY"
};


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);

const auth =
    getAuth(app);


/* =========================================================
   HELPERS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function formatDate(timestamp) {

    if (
        !timestamp ||
        typeof timestamp.toDate !== "function"
    ) {
        return "Ҳоло";
    }

    return timestamp
        .toDate()
        .toLocaleString("tg-TJ", {
            dateStyle: "medium",
            timeStyle: "short"
        });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const headerNav =
    document.querySelector(".site-header nav");

const menuButton =
    document.querySelector(".menu-btn");


if (menuButton && headerNav) {

    menuButton.addEventListener(
        "click",
        () => {

            headerNav.classList.toggle("active");

        }
    );


    headerNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {
                    headerNav.classList.remove(
                        "active"
                    );
                }
            );

        });

}


/* =========================================================
   CONTACT FORM
   CLIENT → FIREBASE
   NO WHATSAPP
========================================================= */

const complaintForm =
    $("complaintForm");


if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                $("name")?.value.trim();

            const phone =
                $("phone")?.value.trim();

            const message =
                $("message")?.value.trim();

            const submitButton =
                $("submitBtn");


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


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "ФИРИСТОДА ИСТОДААСТ...";

            }


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
                    "Дархости шумо бомуваффақият қабул шуд ✅"
                );


            } catch (error) {

                console.error(
                    "Firebase error:",
                    error
                );


                alert(
                    "Хато ҳангоми фиристодани дархост."
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "ФИРИСТОДАН ↗";

                }

            }

        }
    );

}


/* =========================================================
   ADMIN ELEMENTS
========================================================= */

const openAdmin =
    $("openAdmin");

const loginModal =
    $("loginModal");

const closeLogin =
    $("closeLogin");

const adminModal =
    $("adminModal");

const adminEmail =
    $("adminEmail");

const adminPassword =
    $("adminPassword");

const loginBtn =
    $("loginBtn");

const logoutBtn =
    $("logout");

const refreshAdmin =
    $("refreshAdmin");

const complaintList =
    $("complaintList");

const totalRequests =
    $("totalRequests");

const unreadRequests =
    $("unreadRequests");

const totalProjects =
    $("totalProjects");

const adminProjectList =
    $("adminProjectList");


/* =========================================================
   OPEN ADMIN LOGIN
========================================================= */

if (openAdmin) {

    openAdmin.addEventListener(
        "click",
        () => {

            if (loginModal) {

                loginModal.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE LOGIN
========================================================= */

if (closeLogin) {

    closeLogin.addEventListener(
        "click",
        () => {

            loginModal?.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        async () => {

            const email =
                adminEmail?.value.trim();

            const password =
                adminPassword?.value;


            if (!email || !password) {

                alert(
                    "Email ва password-ро пур кунед."
                );

                return;

            }


            loginBtn.disabled = true;

            loginBtn.textContent =
                "ДАРОМАДА ИСТОДААСТ...";


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                loginModal?.classList.remove(
                    "active"
                );

                adminModal?.classList.add(
                    "active"
                );


                await loadProjects();


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                alert(
                    "Email ё password нодуруст аст."
                );


            } finally {

                loginBtn.disabled = false;

                loginBtn.textContent =
                    "ДАРОМАДАН";

            }

        }
    );

}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(
    auth,
    user => {

        if (user) {

            adminModal?.classList.add(
                "active"
            );

            loadProjects();

        } else {

            adminModal?.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                adminModal?.classList.remove(
                    "active"
                );

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   CLIENT REQUESTS — REAL TIME
========================================================= */

function listenComplaints() {

    if (!complaintList) {
        return;
    }


    const complaintsRef =
        collection(
            db,
            "complaints"
        );


    onSnapshot(

        complaintsRef,

        snapshot => {

            const requests = [];


            snapshot.forEach(
                item => {

                    requests.push({

                        id:
                            item.id,

                        ...item.data()

                    });

                }
            );


            /* NEWEST FIRST */

            requests.sort(
                (a, b) => {

                    const aTime =
                        a.createdAt?.toMillis
                            ? a.createdAt.toMillis()
                            : 0;

                    const bTime =
                        b.createdAt?.toMillis
                            ? b.createdAt.toMillis()
                            : 0;

                    return bTime - aTime;

                }
            );


            /* TOTAL */

            if (totalRequests) {

                totalRequests.textContent =
                    requests.length;

            }


            /* UNREAD */

            const unread =
                requests.filter(
                    item =>
                        item.status ===
                        "new"
                ).length;


            if (unreadRequests) {

                unreadRequests.textContent =
                    unread;

            }


            /* EMPTY */

            if (!requests.length) {

                complaintList.innerHTML = `

                    <div class="admin-empty">

                        Ҳоло ягон паёми клиент нест.

                    </div>

                `;

                return;

            }


            /* LIST */

            complaintList.innerHTML =
                requests
                    .map(
                        item => {

                            const isNew =
                                item.status ===
                                "new";


                            return `

                                <article
                                    class="complaint-item"
                                >

                                    <div
                                        class="request-top"
                                    >

                                        <div>

                                            <div
                                                class="complaint-name"
                                            >
                                                ${escapeHTML(
                                                    item.name ||
                                                    "Номаълум"
                                                )}
                                            </div>

                                            <div
                                                class="complaint-phone"
                                            >
                                                ${escapeHTML(
                                                    item.phone ||
                                                    "Телефон нест"
                                                )}
                                            </div>

                                        </div>


                                        ${
                                            isNew

                                            ?

                                            `
                                            <span
                                                class="new-label"
                                            >
                                                НАВ
                                            </span>
                                            `

                                            :

                                            `
                                            <span
                                                class="read-status"
                                            >
                                                ✓ ХОНДА ШУД
                                            </span>
                                            `
                                        }

                                    </div>


                                    <div
                                        class="complaint-text"
                                    >
                                        ${escapeHTML(
                                            item.message ||
                                            ""
                                        )}
                                    </div>


                                    <span
                                        class="complaint-date"
                                    >
                                        ${formatDate(
                                            item.createdAt
                                        )}
                                    </span>


                                    <div
                                        class="complaint-buttons"
                                    >

                                        ${
                                            isNew

                                            ?

                                            `
                                            <button
                                                class="read-btn"
                                                data-read="${item.id}"
                                            >
                                                ✓ ХОНДА ШУД
                                            </button>
                                            `

                                            :

                                            ""
                                        }


                                        <button
                                            class="delete-btn"
                                            data-delete="${item.id}"
                                        >
                                            🗑 НЕСТ КАРДАН
                                        </button>

                                    </div>

                                </article>

                            `;

                        }
                    )
                    .join("");


            bindReadButtons();

            bindDeleteButtons();

        },


        error => {

            console.error(
                "Firestore listener error:",
                error
            );


            complaintList.innerHTML = `

                <div class="admin-empty">

                    Хатои Firebase.
                    Rules-ро санҷед.

                </div>

            `;

        }

    );

}


/* =========================================================
   MARK AS READ
========================================================= */

function bindReadButtons() {

    document
        .querySelectorAll(
            "[data-read]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const id =
                            button.dataset.read;


                        button.disabled =
                            true;


                        try {

                            await updateDoc(

                                doc(
                                    db,
                                    "complaints",
                                    id
                                ),

                                {
                                    status:
                                        "read"
                                }

                            );


                        } catch (error) {

                            console.error(
                                "Read error:",
                                error
                            );


                            alert(
                                "Статус тағйир дода нашуд."
                            );


                            button.disabled =
                                false;

                        }

                    }
                );

            }
        );

}


/* =========================================================
   DELETE MESSAGE
========================================================= */

function bindDeleteButtons() {

    document
        .querySelectorAll(
            "[data-delete]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const id =
                            button.dataset.delete;


                        const answer =
                            confirm(
                                "Ин паёмро пурра нест мекунед?"
                            );


                        if (!answer) {
                            return;
                        }


                        button.disabled =
                            true;


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
                                "Delete error:",
                                error
                            );


                            alert(
                                "Паём нест карда нашуд."
                            );


                            button.disabled =
                                false;

                        }

                    }
                );

            }
        );

}


/* =========================================================
   PROJECTS
========================================================= */

async function loadProjects() {

    if (!adminProjectList) {
        return;
    }


    try {

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "projects"
                )
            );


        if (totalProjects) {

            totalProjects.textContent =
                snapshot.size;

        }


        if (snapshot.empty) {

            adminProjectList.innerHTML = `

                <div class="admin-empty">

                    Ҳоло project нест.

                </div>

            `;

            return;

        }


        adminProjectList.innerHTML = "";


        snapshot.forEach(
            item => {

                const data =
                    item.data();


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "admin-project";


                card.innerHTML = `

                    <h3>
                        ${escapeHTML(
                            data.name ||
                            "Project"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            data.type ||
                            "SMM"
                        )}
                    </p>

                `;


                adminProjectList.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Projects error:",
            error
        );


        if (totalProjects) {

            totalProjects.textContent =
                "0";

        }


        adminProjectList.innerHTML = `

            <div class="admin-empty">

                Project-ҳоро хонда нашуд.

            </div>

        `;

    }

}


/* =========================================================
   REFRESH
========================================================= */

if (refreshAdmin) {

    refreshAdmin.addEventListener(
        "click",
        () => {

            loadProjects();

        }
    );

}


/* =========================================================
   START
========================================================= */

listenComplaints();


console.log(
    "MANUCHEKHR Firebase system started."
);
