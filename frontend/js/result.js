const answers = JSON.parse(sessionStorage.getItem('quizAnswers') || '[]');
const userName = sessionStorage.getItem('username') || "Unknown Traveler";

if (answers.length === 0) {
    window.location.href = '../pages/persona.html';
}

let scores = {
    Dipper: 0,
    Mabel: 0,
    Ford: 0,
    Stan: 0
};

//Scoring Logic
if (answers[0] === 0) { scores.Dipper += 2; scores.Ford += 1; } 
else { scores.Mabel += 2; scores.Stan += 1; }

if (answers[1] === 0) { scores.Ford += 2; scores.Dipper += 1; } 
else { scores.Mabel += 2; scores.Stan += 2; }

if (answers[2] === 0) { scores.Ford += 3; scores.Dipper += 1; } 
else { scores.Stan += 3; }

if (answers[3] === 0) { scores.Dipper += 2; } 
else { scores.Mabel += 1; scores.Stan += 1; }

if (answers[4] === 0) { scores.Dipper += 3; scores.Ford += 1; } 
else { scores.Mabel += 3; }

if (answers[5] === 0) { scores.Ford += 1; scores.Dipper += 1; } 
else { scores.Mabel += 2; }

let maxScore = -1;
let winner = "Dipper"; 

for (const [char, score] of Object.entries(scores)) {
    if (score > maxScore) {
        maxScore = score;
        winner = char;
    }
}

const personas = {
    "Dipper": {
        title: "The Curious Investigator",
        desc: "You are logical, determined, and maybe a little paranoid. You seek the truth above all else.",
        img: "../images/dipperHoldingJournal.png"
    },
    "Mabel": {
        title: "The Unstoppable Optimist",
        desc: "You are the heart of the group! You value fun, creativity, and your friends over silly old books.",
        img: "../images/MableDoingCraft.png"
    },
    "Ford": {
        title: "The Genius Loner",
        desc: "Your intellect is unmatched, but be careful not to push people away. The mysteries of the universe await you.",
        img: "../images/stanford.png"
    },
    "Stan": {
        title: "The Master Hustler",
        desc: "You play by your own rules. You might seem tough, but you'd do anything for your family (and money).",
        img: "../images/stanly.png"
    }
};

const result = personas[winner];

//  Update the HTML
document.getElementById('userDisplay').textContent = `${userName}'s Persona`;
document.getElementById('resultTitle').textContent = result.title;
document.getElementById('resultDesc').textContent = result.desc;
document.getElementById('resultImg').src = result.img;
document.getElementById('resultImg').alt = winner;

document.getElementById('logoutBtn').addEventListener('click', () => {
    if(confirm("Are you sure you want to leave the Mystery Shack?")) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
});


//SAVE TO BACKEND 
async function saveToDatabase(personaName, scoreObj) {
    const email = sessionStorage.getItem('username'); // Using username as identifier for now
    
    if(!email) return; 

    console.log("Attempting to save result for:", email);

    try {
        const response = await fetch("http://localhost:5000/api/quiz/save", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                persona: personaName,
                scores: scoreObj
            })
        });

        const data = await response.json();
        if(response.ok) {
            console.log("Saved to database successfully!");
        } else {
            console.error("Backend Error:", data.error);
        }
    } catch (err) {
        console.error("Network Error:", err);
    }
}

saveToDatabase(winner, scores);