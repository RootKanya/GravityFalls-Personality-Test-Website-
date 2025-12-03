// DOM Elements
const nameSection = document.getElementById('nameSection');
const messageSection = document.getElementById('messageSection');
const typeElem = document.getElementById('typewrite');
const startBtn = document.getElementById('startQuizBtn');
const nameInput = document.getElementById('usernameInput');


window.addEventListener('load', () => {
    const savedName = sessionStorage.getItem('username');
    
    if (savedName) {
        nameSection.style.display = 'none';
        messageSection.style.display = 'block';
        
        const welcomeBackMsg = `Welcome back, ${savedName}. The mystery awaits...`;
        startTyping(welcomeBackMsg);
    } else {
        nameSection.style.display = 'block';
        messageSection.style.display = 'none';
    }
});

function submitName(e) {
    e.preventDefault(); 
    const name = nameInput.value.trim();
    
    if (!name) {
        alert("You must have a name, mortal!");
        return;
    }

    sessionStorage.setItem('username', name);

    nameSection.style.display = 'none';
    messageSection.style.display = 'block';

    const firstTimeMsg = `It's time to Define who’s your persona ${name} Chiper’s...`;
    startTyping(firstTimeMsg);
}

function startTyping(textToType) {
    typeElem.innerHTML = ""; 
    let idx = 0;
    const speed = 50; 

    function typeLoop() {
        if (idx < textToType.length) {
            typeElem.innerHTML += textToType.charAt(idx);
            idx++;
            setTimeout(typeLoop, speed);
        } else {
            if(startBtn) startBtn.style.display = 'inline-block';
        }
    }
    
    typeLoop();
}

function startQuiz() {
    sessionStorage.removeItem('quizAnswers'); 
    window.location.href = 'question.html';
}

function resetUser() {
    sessionStorage.removeItem('username');
    window.location.reload();
}

function logout() {
    if(confirm("Are you sure you want to leave?")) {
        sessionStorage.clear(); // Wipes name and answers
        window.location.href = 'login.html'; // Go back to login
    }
}