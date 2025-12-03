const quizData = [
  {
    question: "Solve the mystery or enjoy the vibes?",
    options: [
      { text: "Solve the mystery", img: "../images/dipperHoldingJournal.png" },
      { text: "Enjoy the vibes", img: "../images/MableDoingCraft.png" }
    ]
  },
  {
    question: "Brains or Chaos?",
    options: [
      { text: "Logic & Planning", img: "../images/ford.webp" },
      { text: "Fun & Spontaneity", img: "../images/Mabelglitterexplosion.png" }
    ]
  },
  {
    question: "Are you more of: A researcher or a hustler?",
    options: [
      { text: "Research Nerd", img: "../images/Journal.png" },
      { text: "Street-Smart Survivor", img: "../images/stanMoney.png" }
    ]
  },
  {
    question: "Pick your partner for an adventure.",
    options: [
      { text: "Smart & Serious", img: "../images/Dipperseriouspose.png" },
      { text: "Fun & Chaotic", img: "../images/Soossmiling.png" }
    ]
  },
  {
    question: "Choose your weapon.",
    options: [
      { text: "Book of Secrets", img: "../images/Journal.png" },
      { text: "Grappling Hook", img: "../images/Mabelholdinggrapplinghook.png" } 
    ]
  },
  {
    question: "Pick a vibe.",
    options: [
      { text: "Dark Forest", img: "../images/MysteryShackwoods.png" },
      { text: "Neon World", img: "../images/Mabelsweaterpatterns.png" }
    ]
  }
];

const MAX_Q = quizData.length;
let cur = 0;
let stored = JSON.parse(sessionStorage.getItem('quizAnswers') || '[]');

// DOM Elements
const qnum = document.getElementById('qnum');
const qtext = document.getElementById('qtext');
const optionsDiv = document.getElementById('options-container'); 
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveBtn = document.getElementById('saveBtn');

function render() {
  qnum.textContent = `${cur + 1} / ${MAX_Q}`;
  qtext.textContent = quizData[cur].question;
  optionsDiv.innerHTML = '';
  quizData[cur].options.forEach((opt, index) => {
    // Create Card Element
    const card = document.createElement('div');
    card.className = 'quiz-card';
    
    // Check 
    if (stored[cur] === index) {
      card.classList.add('selected');
    }

    const img = document.createElement('img');
    img.src = opt.img;
    img.alt = opt.text;

    const label = document.createElement('h3');
    label.textContent = opt.text;

    card.appendChild(img);
    card.appendChild(label);

    // Click Event
    card.addEventListener('click', () => {
      Array.from(optionsDiv.children).forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      stored[cur] = index; 
      sessionStorage.setItem('quizAnswers', JSON.stringify(stored));
    });

    optionsDiv.appendChild(card);
  });

  prevBtn.disabled = cur === 0;
  nextBtn.textContent = cur === (MAX_Q - 1) ? 'Reveal Persona' : 'Next';
}

prevBtn.addEventListener('click', () => {
  if (cur > 0) {
    cur--;
    render();
  }
});

nextBtn.addEventListener('click', () => {

  if (stored[cur] === undefined || stored[cur] === null) {
    alert('The spirits demand an answer! Please select a card.');
    return;
  }

  if (cur < MAX_Q - 1) {
    cur++;
    render();
  } else {
    sessionStorage.setItem('quizAnswers', JSON.stringify(stored));
    window.location.href = 'result.html';
  }
});

saveBtn.addEventListener('click', () => {
  sessionStorage.setItem('quizAnswers', JSON.stringify(stored));
  alert('Progress saved... for now.');
});

render();