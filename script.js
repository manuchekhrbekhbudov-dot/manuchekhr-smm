const firebaseConfig = {
  apiKey: "AIzaSyAteF9GeUK8RyKohaiBy_K7dsLix4Z0Sho",
  authDomain: "manuchekhr-smm.firebaseapp.com",
  projectId: "manuchekhr-smm",
  storageBucket: "manuchekhr-smm.firebasestorage.app",
  messagingSenderId: "226231175635",
  appId: "1:226231175635:web:3ef2c939fe16bb7ab44726",
  measurementId: "G-39DX3S5VS4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CLIENT FORM
  ========================= */

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {

    if (form.id === "loginForm") return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name =
        form.querySelector('[name="name"]')?.value.trim() ||
        form.querySelector('input[type="text"]')?.value.trim() ||
        "";

      const phone =
        form.querySelector('[name="phone"]')?.value.trim() ||
        form.querySelector('input[type="tel"]')?.value.trim() ||
        "";

      const message =
        form.querySelector('[name="message"]')?.value.trim() ||
        form.querySelector("textarea")?.value.trim() ||
        "";

      if (!name || !phone || !message) {
        alert("Лутфан ҳамаи майдонҳоро пур кунед.");
        return;
      }

      const button = form.querySelector('button[type="submit"]');

      if (button) {
        button.disabled = true;
        button.textContent = "Фиристода мешавад...";
      }

      try {

        await db.collection("complaints").add({
          name: name,
          phone: phone,
          message: message,
          status: "new",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        form.reset();

        alert("Дархост бо муваффақият фиристода шуд!");

      } catch (error) {

        console.error("Firebase error:", error);

        alert("Хато шуд. Firebase ё Firestore-ро санҷед.");

      } finally {

        if (button) {
          button.disabled = false;
          button.textContent = "Фиристодан";
        }

      }
    });
  });


  /* =========================
     ADMIN LOGIN
  ========================= */

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

      event.preventDefault();

      const email =
        document.getElementById("email").value.trim();

      const password =
        document.getElementById("password").value;

      const loginError =
        document.getElementById("loginError");

      loginError.textContent = "";

      try {

        await auth.signInWithEmailAndPassword(
          email,
          password
        );

        window.location.href = "admin.html";

      } catch (error) {

        console.error("Login error:", error);

        loginError.textContent =
          "Email ё password нодуруст аст.";

      }

    });

  }

});
