import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAsgr49JaSWJhEueo9qCY5f_ildRZoDmU",
    authDomain: "product-web-f8838.firebaseapp.com",
    projectId: "product-web-f8838",
    storageBucket: "product-web-f8838.appspot.com",
    messagingSenderId: "905180418275",
    appId: "1:905180418275:web:10c75eab93d1b7b99435d6",
    measurementId: "G-NNTPYYQWWJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.getElementById("submitSignUp").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = { email, firstName, lastName };

            return setDoc(doc(db, "users", user.uid), userData).then(() => {
                alert("Account Created Successfully. Redirecting to login...");
                window.location.href = 'login.html';
            });
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
