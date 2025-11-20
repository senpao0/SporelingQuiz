const quizData = [
  {
    question: "You wake up in a quiet forest. What do you do first?",
    options: [
      { text: "Look for glowing mushrooms", type: "dreamer" },
      { text: "Check for food or supplies", type: "practical" },
      { text: "Climb a tree to understand the terrain", type: "thinker" },
      { text: "Say hi to nearby creatures", type: "social" }
    ]
  },
  {
    question: "A small creature hands you a gift. What is it?",
    options: [
      { text: "A shimmering leaf", type: "dreamer" },
      { text: "A sturdy pebble", type: "practical" },
      { text: "A puzzle-shaped rune", type: "thinker" },
      { text: "A handmade bracelet", type: "social" }
    ]
  },
  {
    question: "What role would you play in a forest community?",
    options: [
      { text: "The gentle watcher", type: "dreamer" },
      { text: "The reliable helper", type: "practical" },
      { text: "The curious explorer", type: "thinker" },
      { text: "The friendly gatherer", type: "social" }
    ]
  }
];

let currentQuestion = 0;
let scores = { dreamer: 0, practical: 0, thinker: 0, social: 0 };

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
    dreamer: "You are a Moss Dreamer — gentle, magical, and imaginative.",
    practical: "You are a Pebble Guardian — steady, grounded, dependable.",
    thinker: "You are a Rune Scholar — curious and analytical.",
    social: "You are a Grove Gatherer — warm, lively, and community-focused."
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

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  scores = { dreamer: 0, practical: 0, thinker: 0, social: 0 };
  resultEl.classList.add("hidden");
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();
