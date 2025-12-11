document.addEventListener("DOMContentLoaded", () => {

  // --------------------- QUIZ DATA ---------------------
  const quizData = [
    {
      question: "You wake up in a forest, what is the first thing you do?",
      image: "images/q1.png",
      options: [
        { text: "Explore the glowing mushrooms nearby", types: ["Cinna", "Glimmer"] },
        { text: "Sit quietly and observe your surroundings", types: ["Droop", "Noxie"] },
        { text: "Call out to see if someone responds", types: ["Puff", "Gremie"] },
        { text: "Find a cozy moss patch to rest on", types: ["Myca & Pip", "Lintle"] }
      ]
    },
    {
      question: "You find a sparkling stream, what do you do?",
      image: "images/q2.png",
      options: [
        { text: "Follow it to see where it leads", types: ["Puff", "Glimmer"] },
        { text: "Sit and listen to the water's song", types: ["Droop", "Cinna"] },
        { text: "Try to catch the shimmering fish", types: ["Gremie", "Lintle"] },
        { text: "Dip your hands and feel the coolness", types: ["Myca & Pip", "Noxie"] }
      ]
    },
    {
      question: "A mysterious glowing mushroom appears, what do you do?",
      image: "images/q3.png",
      options: [
        { text: "Examine it carefully", types: ["Noxie", "Glimmer"] },
        { text: "Touch it gently", types: ["Cinna", "Droop"] },
        { text: "Jump back and giggle", types: ["Gremie", "Lintle"] },
        { text: "Take a small piece to study later", types: ["Myca & Pip", "Puff"] }
      ]
    },
    {
      question: "You hear rustling in the bushes, you:",
      image: "images/q4.png",
      options: [
        { text: "Approach slowly and curiously", types: ["Glimmer", "Gremie"] },
        { text: "Hide and watch carefully", types: ["Noxie", "Droop"] },
        { text: "Call out and greet", types: ["Puff", "Cinna"] },
        { text: "Ignore it and continue exploring", types: ["Myca & Pip", "Lintle"] }
      ]
    },
    {
      question: "You find a mossy clearing with sunlight pouring in, you:",
      image: "images/q5.png",
      options: [
        { text: "Lie down and soak up the warmth", types: ["Cinna", "Myca & Pip"] },
        { text: "Dance around joyfully", types: ["Gremie", "Lintle"] },
        { text: "Look for creatures hiding in the light", types: ["Glimmer", "Puff"] },
        { text: "Meditate quietly", types: ["Droop", "Noxie"] }
      ]
    },
    {
      question: "A gentle rain starts, you:",
      image: "images/q6.png",
      options: [
        { text: "Splash in the puddles", types: ["Gremie", "Puff"] },
        { text: "Sit under a mushroom umbrella", types: ["Droop", "Cinna"] },
        { text: "Listen to the rhythm of the rain", types: ["Myca & Pip", "Glimmer"] },
        { text: "Dance barefoot in the drops", types: ["Lintle", "Noxie"] }
      ]
    },
    {
      question: "You discover an ancient tree with glowing runes, you:",
      image: "images/q7.png",
      options: [
        { text: "Study the runes closely", types: ["Noxie", "Glimmer"] },
        { text: "Sit beneath it in wonder", types: ["Cinna", "Droop"] },
        { text: "Climb it to see the forest", types: ["Puff", "Lintle"] },
        { text: "Talk to the tree softly", types: ["Myca & Pip", "Gremie"] }
      ]
    },
    {
      question: "You feel a tiny presence nearby, you:",
      image: "images/q8.png",
      options: [
        { text: "Reach out gently", types: ["Cinna", "Gremie"] },
        { text: "Wait and see who it is", types: ["Droop", "Noxie"] },
        { text: "Laugh and call out playfully", types: ["Lintle", "Puff"] },
        { text: "Whisper softly in greeting", types: ["Glimmer", "Myca & Pip"] }
      ]
    }
  ];

  const resultsData = {
    "Cinna": { title: "You got Cinna!", image: "images/cinna.png" },
    "Droop": { title: "You got Droop!", image: "images/droop.png" },
    "Glimmer": { title: "You got Glimmer!", image: "images/glimmer.png" },
    "Noxie": { title: "You got Noxie!", image: "images/noxie.png" },
    "Myca & Pip": { title: "You got Myca & Pip!", image: "images/myca_pip.png" },
    "Puff": { title: "You got Puff!", image: "images/puff.png" },
    "Lintle": { title: "You got Lintle!", image: "images/lintle.png" },
    "Gremie": { title: "You got Gremie!", image: "images/gremie.png" }
  };

  // --------------------- STATE ---------------------
  let currentIndex = 0;
  let scores = { "Cinna":0, "Droop":0, "Glimmer":0, "Noxie":0, "Myca & Pip":0, "Puff":0, "Lintle":0, "Gremie":0 };

  // --------------------- ELEMENTS ---------------------
  const introScreen = document.getElementById("intro-screen");
  const startBtn = document.getElementById("start-btn");

  const quizScreen = document.getElementById("quiz-screen");
  const questionImage = document.getElementById("question-image");
  const questionText = document.getElementById("question-text");
  const optionsDiv = document.getElementById("options");

  const preresultScreen = document.getElementById("preresult-screen");
  const continueBtn = document.getElementById("continue-btn");

  const resultScreen = document.getElementById("result-screen");
  const resultTitle = document.getElementById("result-title");
  const resultImage = document.getElementById("result-image");
  const restartBtn = document.getElementById("restart-btn");

  // --------------------- START QUIZ ---------------------
  startBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
  });

  // --------------------- SHOW QUESTION ---------------------
  function showQuestion() {
    if (currentIndex >= quizData.length) {
      quizScreen.classList.add("hidden");
      preresultScreen.classList.remove("hidden");
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
        opt.types.forEach(type => scores[type]++);
        currentIndex++;
        showQuestion();
      });
      optionsDiv.appendChild(btn);
    });
  }

  // --------------------- CONTINUE TO RESULT ---------------------
  continueBtn.addEventListener("click", () => {
    preresultScreen.classList.add("hidden");
    showResult();
  });

  // --------------------- SHOW RESULT ---------------------
  function showResult() {
    resultScreen.classList.remove("hidden");
    const topType = Object.keys(scores).reduce((a,b) => scores[a] > scores[b] ? a : b);
    resultTitle.textContent = resultsData[topType].title;
    resultImage.src = resultsData[topType].image;
  }

  // --------------------- RESTART ---------------------
  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    for (let key in scores) scores[key] = 0;
    resultScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
  });

});
