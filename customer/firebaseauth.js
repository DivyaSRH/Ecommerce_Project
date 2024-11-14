// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
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

// Toggle display between sign up and sign in
document.getElementById("signInButton").addEventListener("click", () => {
    document.getElementById("signIn").style.display = "block";
    document.getElementById("signup").style.display = "none";
});

document.getElementById("signUpButton").addEventListener("click", () => {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signup").style.display = "block";
});

// Sign up functionality
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

            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData).then(() => {
                showMessage("Account Created Successfully. Redirecting to login...", "signUpMessage");
                setTimeout(() => {
                    document.getElementById("signup").style.display = "none";
                    document.getElementById("signIn").style.display = "block";
                }, 3000); // Redirect to login page after 3 seconds
            });
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                showMessage("Email Address Already Exists!", "signUpMessage");
            } else {
                showMessage("Unable to create user", "signUpMessage");
            }
        });
});

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
