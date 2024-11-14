// Firebase Configuration
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
  
  // Firebase Modular SDK imports
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
  import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  // Display photos function
  function displayPhotos() {
      const photoGallery = document.getElementById('photoGallery');
      photoGallery.innerHTML = '';  // Clear previous content
  
      const photosRef = ref(db, 'photos');
      onValue(photosRef, (snapshot) => {
          snapshot.forEach((photo) => {
              const photoData = photo.val();
              const photoId = photo.key;
  
              const photoCard = document.createElement('div');
              photoCard.className = 'photo-card';
              photoCard.innerHTML = `
                  <a href="category.html?id=${photoId}">
                      <img src="${photoData.url}" alt="Photo">
                      <p>${photoData.description}</p>
                  </a>
              `;
  
              photoGallery.appendChild(photoCard);
          });
      });
  }
  
  window.displayPhotos = displayPhotos;
  window.onload = displayPhotos;
  