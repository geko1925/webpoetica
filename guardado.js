// Configuración de Firebase

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCTOK7K51UL50UkE4NOmL17RPsnV687yHc",
    authDomain: "sample-firebase-ai-app-d320f.firebaseapp.com",
    databaseURL: "https://geko1925.github.io/webpoetica/",
    projectId: "sample-firebase-ai-app-d320f",
    storageBucket: "sample-firebase-ai-app-d320f.firebasestorage.app",
    messagingSenderId: "1029369319252",
    appId: "1:1029369319252:web:acc07e16199b20f1c682c1"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
        
const db = firebase.database();

let username = "Anónimo";
const forbiddenWords = ["groseria1", "groseria2", "groseria3"];

document.addEventListener("DOMContentLoaded", () => {
    loadPoems();
});

function login() {
    const userInput = document.getElementById('username').value.trim();
    if (userInput) {
        username = userInput;
        alert("Has iniciado sesión como " + username);
    }
}

function addPoem() {
    let text = document.getElementById('poemText').value;
    if (text.trim() === '') return;
    
    if (containsForbiddenWords(text)) {
        alert("Tu poesía contiene palabras inapropiadas. Por favor, revisa tu contenido.");
        return;
    }
    
    const poem = { text, author: username, timestamp: Date.now() };
    savePoem(poem);
    document.getElementById('poemText').value = '';
}

function containsForbiddenWords(text) {
    return forbiddenWords.some(word => text.toLowerCase().includes(word));
}

function displayPoem(poem) {
    const poemContainer = document.getElementById('poemsContainer');
    const poemDiv = document.createElement('div');
    poemDiv.classList.add('poem');
    poemDiv.innerHTML = `<p>${poem.text}</p><p class='author'>-${poem.author}</p>`;
    poemContainer.prepend(poemDiv);
}

function savePoem(poem) {
    db.ref("poems").push(poem);
}

function loadPoems() {
    db.ref("poems").on("child_added", snapshot => {
        displayPoem(snapshot.val());
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
