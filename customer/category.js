// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, get, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyAAsgr49JaSWJhEueo9qCY5f_ildRZoDmU",
    authDomain: "product-web-f8838.firebaseapp.com",
    databaseURL: "https://product-web-f8838-default-rtdb.firebaseio.com",
    projectId: "product-web-f8838",
    storageBucket: "product-web-f8838.firebasestorage.app",
    messagingSenderId: "905180418275",
    appId: "1:905180418275:web:10c75eab93d1b7b99435d6",
    measurementId: "G-NNTPYYQWWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function loadCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    if (categoryId) {
        const categoryRef = ref(db, 'photos/' + categoryId);
        get(categoryRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                document.getElementById('categoryTitle').textContent = data.description;
                document.getElementById('categoryImage').src = data.url;
            } else {
                alert("Category not found");
            }
        }).catch((error) => {
            console.error("Error fetching category data:", error);
        });

        // Load products under this category
        const productsRef = ref(db, 'products/' + categoryId);
        onValue(productsRef, (snapshot) => {
            const productGallery = document.getElementById('productGallery');
            productGallery.innerHTML = '';
            snapshot.forEach((product) => {
                const productData = product.val();

                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${productData.imageUrl}" alt="Product Image">
                    <h3>${productData.name}</h3>
                    <p>${productData.description}</p>
                    <p>Price: ${productData.price}</p>
                    <p>Status: ${productData.status}</p>
                `;
                productGallery.appendChild(productCard);
            });
        });
    } else {
        alert("Invalid category ID");
    }
}

// Load the category data when the page loads
window.onload = loadCategory;
