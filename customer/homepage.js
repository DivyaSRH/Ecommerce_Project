import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAsgr49JaSWJhEueo9qCY5f_ildRZoDmU",
    authDomain: "product-web-f8838.firebaseapp.com",
    projectId: "product-web-f8838",
    storageBucket: "product-web-f8838.appspot.com",
    messagingSenderId: "905180418275",
    appId: "1:905180418275:web:10c75eab93d1b7b99435d6",
    measurementId: "G-NNTPYYQWWJ"};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById("loggedUserFName").innerText = userData.firstName;
                document.getElementById("loggedUserLName").innerText = userData.lastName;
                document.getElementById("loggedUserEmail").innerText = userData.email;
            }
        });
    }
});

document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        localStorage.removeItem("loggedInUserId");
        window.location.href = 'index.html';
    });
});
