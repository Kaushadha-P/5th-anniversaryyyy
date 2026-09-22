/**
 * Jodhaa & Us — 5-Month Love Trivia Quiz
 * 5 adorable questions celebrating the past 5 months
 */

(function() {
  const quizData = [
    {
      question: "Where did our story begin and give us those unforgettable butterflies?",
      options: [
        "A cozy café with coffee & warm smiles ☕",
        "A fun first date where we couldn't stop talking ✨",
        "A scenic walk where hours felt like seconds 🌙",
        "Anywhere, because being with you made everywhere magical ❤️"
      ],
      correctIndex: 3, // Affectionate trick: option 4 is sweetest, but all give love!
      sweetNote: "Every moment with you from day one has been pure magic!"
    },
    {
      question: "What is Jodhaa's ultimate superpower?",
      options: [
        "Making me smile instantly with just a single text or look 😊",
        "Looking breathtakingly gorgeous effortlessly 🌸",
        "Giving the most comforting, warmest hugs in the universe 🫂",
        "All of the above — and a million more! 👑"
      ],
      correctIndex: 3,
      sweetNote: "You really are a wonder in every single way, Jodhaa!"
    },
    {
      question: "What has been our favorite ritual over the past 5 months?",
      options: [
        "Late-night talks that turn into 2 AM laughs 📱",
        "Sharing food and trying yummy new treats together 🍕",
        "Inside jokes that only the two of us understand 🤫",
        "Every single second where I get to hear your laugh ❤️"
      ],
      correctIndex: 3,
      sweetNote: "Your laugh is honestly my favorite sound in the world."
    },
    {
      question: "When someone asks me about these past 5 months, what's my honest answer?",
      options: [
        "\"The happiest, sweetest 5 months of my entire life.\"",
        "\"I found my favorite person in the entire universe.\"",
        "\"I smile like a fool every time I hear her name.\"",
        "\"All of the above, with all my heart!\""
      ],
      correctIndex: 3,
      sweetNote: "True story! You made the last 5 months unforgettable."
    },
    {
      question: "After 5 whole months of loving you, how much do I love you today?",
      options: [
        "More than yesterday, but less than tomorrow ✨",
        "To the moon, past all the stars, and back 🚀",
        "More than all the words in every language could say 📖",
        "To infinity and beyond, forever and always! 💖"
      ],
      correctIndex: 3,
      sweetNote: "5 months down, a lifetime of loving you to go!"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizScreen = document.getElementById('quiz-screen');
  const quizResultScreen = document.getElementById('quiz-result-screen');
  const progressBar = document.getElementById('quiz-progress');
  const stepText = document.getElementById('quiz-step-text');
  const questionText = document.getElementById('quiz-question-text');
  const optionsGrid = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const scoreSummary = document.getElementById('quiz-score-summary');
  const restartBtn = document.getElementById('restart-quiz-btn');

  function renderQuestion() {
    if (!quizScreen) return;

    const currentQ = quizData[currentQuestionIndex];
    if (progressBar) {
      progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    }
    if (stepText) {
      stepText.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    }
    if (questionText) {
      questionText.innerText = currentQ.question;
    }
    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback';
      feedbackEl.innerText = '';
    }

    if (optionsGrid) {
      optionsGrid.innerHTML = '';
      currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;
        btn.addEventListener('click', () => handleAnswer(idx, btn));
        optionsGrid.appendChild(btn);
      });
    }
  }

  function handleAnswer(selectedIndex, clickedBtn) {
    const currentQ = quizData[currentQuestionIndex];
    const buttons = optionsGrid.querySelectorAll('.quiz-option-btn');
    
    // Disable all buttons to prevent spam
    buttons.forEach(btn => btn.disabled = true);

    // In this love quiz, every answer is lovely, but picking the ultimate option earns maximum praise!
    score++;
    clickedBtn.classList.add('correct');

    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback show';
      feedbackEl.style.background = 'rgba(230, 57, 111, 0.15)';
      feedbackEl.style.color = '#ff9ebb';
      feedbackEl.style.border = '1px solid rgba(230, 57, 111, 0.4)';
      feedbackEl.innerHTML = `❤️ <strong>Sweet truth:</strong> ${currentQ.sweetNote}`;
    }

    // Trigger celebration hearts
    if (window.createHeartBurst) {
      const rect = clickedBtn.getBoundingClientRect();
      window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    }

    // Advance to next question after 1.8s
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        renderQuestion();
      } else {
        showResults();
      }
    }, 1800);
  }

  function showResults() {
    if (quizScreen) quizScreen.style.display = 'none';
    if (quizResultScreen) {
      quizResultScreen.style.display = 'block';
      if (scoreSummary) {
        scoreSummary.innerHTML = `You scored <strong>5 / 5</strong> on our 5-Month Journey! 🏆<br>Verdict: <em>100% Certified Soulmates for Life</em>.`;
      }
    }

    // Big heart explosion
    if (window.createHeartBurst) {
      window.createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (quizResultScreen) quizResultScreen.style.display = 'none';
    if (quizScreen) quizScreen.style.display = 'block';
    renderQuestion();
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', restartQuiz);
  }

  // Initialize on load
  renderQuestion();

})();
