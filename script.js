const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});

const quizData = [
  {
    question: "What kind of forest atmosphere comforts you the most?",
    options: [
      { text: "Soft glowing mushrooms", type: "dreamer" },
      { text: "Warm mossy patches", type: "nurturer" },
      { text: "Hidden old ruins", type: "thinker" },
      { text: "Busy critter communities", type: "social" },
      { text: "Open windy clearings", type: "wanderer" }
    ]
  },
  {
    question: "A creature approaches you. How do you respond?",
    options: [
      { text: "Offer a story", type: "dreamer" },
      { text: "Make sure it's safe", type: "nurturer" },
      { text: "Study its markings", type: "thinker" },
      { text: "Greet it cheerfully", type: "social" },
      { text: "Walk alongside silently", type: "wanderer" }
    ]
  },
  {
    question: "You find a glowing object. What is it?",
    options: [
      { text: "A floating seed", type: "dreamer" },
      { text: "A healing herb cluster", type: "nurturer" },
      { text: "A mysterious stone tablet", type: "thinker" },
      { text: "A charm woven by creatures", type: "social" },
      { text: "A compass-like feather", type: "wanderer" }
    ]
  },
  {
    question: "Which path calls to you?",
    options: [
      { text: "A dreamy foggy trail", type: "dreamer" },
      { text: "A warm dappled sunlight path", type: "nurturer" },
      { text: "A narrow twisting ancient tunnel", type: "thinker" },
      { text: "A lively woodland village road", type: "social" },
      { text: "A roadless open field", type: "wanderer" }
    ]
  },
  {
    question: "Your forest gift is:",
    options: [
      { text: "Imagination", type: "dreamer" },
      { text: "Kindness", type: "nurturer" },
      { text: "Insight", type: "thinker" },
      { text: "Community", type: "social" },
      { text: "Freedom", type: "wanderer" }
    ]
  },
  {
    question: "Choose your companion:",
    options: [
      { text: "A tiny moon moth", type: "dreamer" },
      { text: "A protective mossbeast", type: "nurturer" },
      { text: "A puzzle-loving sprite", type: "thinker" },
      { text: "A friendly sporeling", type: "social" },
      { text: "A wandering crow", type: "wanderer" }
    ]
  }
];

let currentQuestion = 0;
let scores = { Myca & Pip: 0, practical: 0, thinker: 0, social: 0 };

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizEl.innerHTML = `
    <h2>${q.question}</h2>
    ${q.options
      .map(
        (opt, index) => `
        <div class="option" data-type="${opt.type}">
          ${opt.text}
        </div>
      `
      )
      .join("")}
  `;

  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      const type = opt.getAttribute("data-type");
      scores[type]++;
      nextBtn.style.display = "block";
    });
  });
}

function showResult() {
  const highestType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

const messages = {
  dreamer: "You are a Forest Dreamer — imaginative, gentle, and deeply magical.",
  nurturer: "You are a Moss Nurturer — warm, grounding, and protective.",
  thinker: "You are a Rune Thinker — curious, analytical, and quietly wise.",
  social: "You are a Grove Gatherer — lively, friendly, and community-minded.",
  wanderer: "You are a Wind Wanderer — free-spirited, calm, and always exploring."
};

  quizEl.innerHTML = "";
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `<h2>${messages[highestType]}</h2>`;

  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.style.display = "none";

 
