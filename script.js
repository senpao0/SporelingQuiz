document.addEventListener("DOMContentLoaded", () => {

// ---------------------
// QUIZ DATA
// ---------------------
const quizData = [
  {
    question: "What kind of forest atmosphere comforts you the most?",
    image: "images/q1.png",
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
    image: "images/q2.png",
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
    image: "images/q3.png",
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
    image: "images/q4.png",
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
    image: "images/q5.png",
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
    image: "images/q6.png",
    options: [
      { text: "A tiny moon moth", type: "dreamer" },
      { text: "A protective mossbeast", type: "nurturer" },
      { text: "A puzzle-loving sprite", type: "thinker" },
      { text: "A friendly sporeling", type: "social" },
      { text: "A wandering crow", type: "wanderer" }
    ]
  }
];

const resultsData = {
  dreamer: {
    title: "You got Forest Dreamer!",
    image: "images/dreamer.png",
    desc: "A gentle, imaginative soul with a magical connection to the forest."
  },
  nurturer: {
    title: "You got Moss Nurturer!",
    image: "images/nurturer.png",
    desc: "Warm, grounding, and protective — you care for all living things."
  },
  thinker: {
    title: "You got Rune Thinker!",
    image: "images/thinker.png",
    desc: "Curious, analytical, quietly wise — a seeker of hidden knowledge."
  },
  social: {
    title: "You got Grove Gatherer!",
    image: "images/social.png",
    desc: "Friendly, lively, community-minded — a true forest companion."
  },
  wanderer: {
    title: "You got Wind Wanderer!",
    image: "images/wanderer.png",
    desc: "Free-spirited, calm, and always exploring new paths."
  }
};

// ---------------------
  // STATE
  // ---------------------
 let currentIndex = 0;
  let scores = { dreamer:0, nurturer:0, thinker:0, social:0, wanderer:0 };

  const introScreen = document.getElementById("intro-screen");
  const startBtn = document.getElementById("start-btn");

  const quizScreen = document.getElementById("quiz-screen");
  const questionImage = document.getElementById("question-image");
  const questionText = document.getElementById("question-text");
  const optionsDiv = document.getElementById("options");

  const resultScreen = document.getElementById("result-screen");
  const resultTitle = document.getElementById("result-title");
  const resultImage = document.getElementById("result-image");
  const restartBtn = document.getElementById("restart-btn");

  startBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
  });

  function showQuestion() {
    if (currentIndex >= quizData.length) {
      showResult();
      return;
    }

    const q = quizData[currentIndex];
    questionImage.src = q.image;
    questionText.textContent = q.question;

    optionsDiv.innerHTML = "";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt.text;

      btn.addEventListener("click", () => {
        scores[opt.type]++;
        currentIndex++;
        showQuestion(); // automatically go to next question
      });

      optionsDiv.appendChild(btn);
    });
  }

  function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const topType = Object.keys(scores).reduce((a,b) => scores[a] > scores[b] ? a : b);

    resultTitle.textContent = resultsData[topType].title;
    resultImage.src = resultsData[topType].image;
  }

  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    for(let key in scores) scores[key] = 0;
    resultScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
  });

});
