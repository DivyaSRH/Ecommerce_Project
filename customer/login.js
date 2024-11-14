import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAsgr49JaSWJhEueo9qCY5f_ildRZoDmU",
    authDomain: "product-web-f8838.firebaseapp.com",
    projectId: "product-web-f8838",
    storageBucket: "product-web-f8838.appspot.com",
    messagingSenderId: "905180418275",
    appId: "1:905180418275:web:10c75eab93d1b7b99435d6",
    measurementId: "G-NNTPYYQWWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Firebase sign in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Store user ID in localStorage
            localStorage.setItem("loggedInUserId", userCredential.user.uid);
            window.location.href = 'homepage.html'; // Redirect to homepage
        })
        .catch((error) => {
            alert("Error: " + error.message); // Display error message
        });
});
