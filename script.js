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
    
    const poem = { text, author: username };
    savePoem(poem);
    displayPoem(poem);
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
    let poems = JSON.parse(localStorage.getItem("poems")) || [];
    poems.unshift(poem);
    localStorage.setItem("poems", JSON.stringify(poems));
}

function loadPoems() {
    let poems = JSON.parse(localStorage.getItem("poems")) || [];
    poems.forEach(displayPoem);
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}


