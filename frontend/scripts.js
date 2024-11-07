// Function to show login modal
function showLogin() {
    document.getElementById("auth-modal").style.display = "block";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// Function to show signup modal
function showSignup() {
    document.getElementById("auth-modal").style.display = "block";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Register new users
function registerUser() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User registered:", userCredential.user);
        })
        .catch((error) => {
            console.error("Error during registration:", error.message);
        });
}

// Login existing users
function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
        })
        .catch((error) => {
            console.error("Login failed:", error.message);
        });
}

// Fetch products from Firestore
function loadProducts() {
    db.collection("products").get().then((querySnapshot) => {
        const productsDiv = document.getElementById("products");
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productDiv = document.createElement("div");
            productDiv.textContent = `${product.name} - $${product.price}`;
            productsDiv.appendChild(productDiv);
        });
    }).catch((error) => {
        console.error("Error fetching products:", error.message);
    });
}

// Load products when the page loads
window.onload = loadProducts;

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initial call to show the first slide
showSlide(currentSlide);

// Slide interval (change every 3 seconds)
setInterval(nextSlide, 3000);
