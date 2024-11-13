// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAsgr49JaSWJhEueo9qCY5f_ildRZoDmU",
    authDomain: "product-web-f8838.firebaseapp.com",
    projectId: "product-web-f8838",
    storageBucket: "product-web-f8838.firebasestorage.app",
    messagingSenderId: "905180418275",
    appId: "1:905180418275:web:10c75eab93d1b7b99435d6",
    measurementId: "G-NNTPYYQWWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to display a message
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 3000); // Display for 3 seconds
}

// Sign in functionality
document.getElementById("submitSignIn").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("Login successful", "signInMessage");
            localStorage.setItem("loggedInUserId", userCredential.user.uid);
            setTimeout(() => {
                window.location.href = 'homepage.html'; // Redirect to homepage
            }, 1000); // Short delay to display login message
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                showMessage("Incorrect Email or Password", "signInMessage");
            } else {
                showMessage("Account does not exist", "signInMessage");
            }
        });
});
