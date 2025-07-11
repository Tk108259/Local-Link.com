// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./FireBase.js";

const auth = getAuth(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD2dub25SYHUnIjBcRWovAZ6Ir4o27SSc",
  authDomain: "local-serve-813d3.firebaseapp.com",
  projectId: "local-serve-813d3",
  storageBucket: "local-serve-813d3.firebasestorage.app",
  messagingSenderId: "859022321804",
  appId: "1:859022321804:web:ae6b1bca9902725219b3a9",
  measurementId: "G-EX364R87V7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.showAuthTab = function(tab) {
  document.getElementById('signupPane').style.display = tab === 'signup' ? '' : 'none';
  document.getElementById('loginPane').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('tabSignUp').classList.toggle('active', tab === 'signup');
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('authMessage').textContent = '';
};

window.signUp = function() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const btn = document.getElementById('signupBtn');
  btn.disabled = true;
  document.getElementById('authMessage').textContent = "Signing up...";
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.sendEmailVerification();
      document.getElementById('authMessage').textContent = `Welcome, ${name || "user"}! Please check your email for verification.`;
      document.getElementById('logoutBtn').style.display = '';
      btn.disabled = false;
    })
    .catch((error) => {
      document.getElementById('authMessage').textContent = error.message;
      btn.disabled = false;
    });
};

window.signIn = function() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  document.getElementById('authMessage').textContent = "Logging in...";
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        document.getElementById('authMessage').textContent = `Welcome back, ${user.email}!`;
        document.getElementById('logoutBtn').style.display = '';
      } else {
        document.getElementById('authMessage').textContent = "Please verify your email before logging in.";
      }
      btn.disabled = false;
    })
    .catch((error) => {
      document.getElementById('authMessage').textContent = error.message;
      btn.disabled = false;
    });
};

window.logOut = function() {
  signOut(auth).then(() => {
    document.getElementById('authMessage').textContent = "Signed out!";
    document.getElementById('logoutBtn').style.display = 'none';
  });
};