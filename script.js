const quizData = [
  {
    question: "What kind of forest atmosphere comforts you the most?",
    image: "images/question1.jpg",
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
    image: "images/question2.jpg",
    options: [
      { text: "Offer a story", type: "dreamer" },
      { text: "Make sure it's safe", type: "nurturer" },
      { text: "Study its markings", type: "thinker" },
      { text: "Greet it cheerfully", type: "social" },
      { text: "Walk alongside silently", type: "wanderer" }
    ]
  },
  {
    question: "What kind of forest atmosphere comforts you the most?",
    image: "images/question1.jpg",
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
    image: "images/question2.jpg",
    options: [
      { text: "Offer a story", type: "dreamer" },
      { text: "Make sure it's safe", type: "nurturer" },
      { text: "Study its markings", type: "thinker" },
      { text: "Greet it cheerfully", type: "social" },
      { text: "Walk alongside silently", type: "wanderer" }
    ]
  },  {
    question: "What kind of forest atmosphere comforts you the most?",
    image: "images/question1.jpg",
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
    image: "images/question2.jpg",
    options: [
      { text: "Offer a story", type: "dreamer" },
      { text: "Make sure it's safe", type: "nurturer" },
      { text: "Study its markings", type: "thinker" },
      { text: "Greet it cheerfully", type: "social" },
      { text: "Walk alongside silently", type: "wanderer" }
    ]
  },
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
