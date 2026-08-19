import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyAteF9GeUK8RyKohaiBy_K7dsLix4Z0Sho",
    authDomain: "manuchekhr-smm.firebaseapp.com",
    projectId: "manuchekhr-smm",
    storageBucket: "manuchekhr-smm.firebasestorage.app",
    messagingSenderId: "226231175635",
    appId: "1:226231175635:web:d9c1b6803e6cb129b44726",
    measurementId: "G-5M5SP1PPTY"
};


// ===============================
// START FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ===============================
// COMPLAINT FORM
// ===============================

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !phone || !message) {
            alert("Лутфан ҳамаи майдонҳоро пур кунед.");
            return;
        }

        const button = complaintForm.querySelector("button");

        button.disabled = true;
        button.textContent = "Фиристода истодааст...";

        try {

            await addDoc(collection(db, "complaints"), {

                name: name,

                phone: phone,

                message: message,

                status: "new",

                createdAt: serverTimestamp()

            });

            alert("Шикояти шумо фиристода шуд ✅");

            complaintForm.reset();

        } catch (error) {

            console.error("Firebase error:", error);

            alert("Хато шуд. Лутфан баъдтар кӯшиш кунед.");

        } finally {

            button.disabled = false;
            button.textContent = "Фиристодан →";

        }

    });

}
