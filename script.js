/* =========================================================
   MANUCHEKHR SMM
   FIREBASE + CLIENT REQUESTS
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


/* =========================================================
   01. FIREBASE CONFIG
   ========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyAteF9GeUK8RyKohaiBy_K7dsLix4Z0Sho",
  authDomain: "manuchekhr-smm.firebaseapp.com",
  projectId: "manuchekhr-smm",
  storageBucket: "manuchekhr-smm.firebasestorage.app",
  messagingSenderId: "226231175635",
  appId: "1:226231175635:web:3ef2c939fe16bb7ab44726",
  measurementId: "G-39DX3S5VS4"
};


/* =========================================================
   02. INITIALIZE FIREBASE
   ========================================================= */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* =========================================================
   03. FIND CONTACT FORM
   ========================================================= */

const form =
  document.querySelector("#contactForm") ||
  document.querySelector("form");

if (form) {

  form.addEventListener("submit", async function (event) {

    event.preventDefault();


    /* -----------------------------------------------------
       GET INPUTS
       ----------------------------------------------------- */

    const nameInput =
      form.querySelector('[name="name"]') ||
      form.querySelector("#name");

    const phoneInput =
      form.querySelector('[name="phone"]') ||
      form.querySelector("#phone");

    const messageInput =
      form.querySelector('[name="message"]') ||
      form.querySelector("#message");


    const name = nameInput?.value.trim() || "";
    const phone = phoneInput?.value.trim() || "";
    const message = messageInput?.value.trim() || "";


    /* -----------------------------------------------------
       VALIDATION
       ----------------------------------------------------- */

    if (!name || !phone || !message) {

      alert("Лутфан ҳамаи майдонҳоро пур кунед.");

      return;
    }


    /* -----------------------------------------------------
       BUTTON
       ----------------------------------------------------- */

    const button = form.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    const oldButtonText = button
      ? button.textContent
      : "";


    if (button) {

      button.disabled = true;
      button.textContent = "Фиристода мешавад...";
    }


    /* -----------------------------------------------------
       SAVE TO FIRESTORE
       ----------------------------------------------------- */

    try {

      await addDoc(collection(db, "complaints"), {

        name: name,

        phone: phone,

        message: message,

        status: "new",

        createdAt: serverTimestamp(),

        source: "MANUCHEKHR SMM",

        page: window.location.href

      });


      /* ---------------------------------------------------
         SUCCESS
         --------------------------------------------------- */

      alert(
        "Дархости шумо қабул шуд!\nМо ба шумо тамос мегирем."
      );


      form.reset();


    } catch (error) {

      console.error(
        "Firebase error:",
        error
      );


      alert(
        "Хато шуд. Интернет ё танзимоти Firebase-ро санҷед."
      );


    } finally {

      if (button) {

        button.disabled = false;
        button.textContent = oldButtonText || "Фиристодан";

      }

    }

  });

}


/* =========================================================
   04. READY
   ========================================================= */

console.log(
  "MANUCHEKHR SMM — Firebase connected successfully."
);
