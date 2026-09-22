/**
 * Core Application Logic for Jodhaa's 5-Month Anniversary Portfolio
 * Features:
 * - Live Relationship Counter (with custom start date support)
 * - 50 Reasons Why I Love Jodhaa (filtered, randomized, animated)
 * - Polaroid Gallery with Lightbox & Local Photo Replacement
 * - Interactive 3D Sealed Love Letter
 * - Shared Bucket List with LocalStorage Persistence
 * - Micro-interactions & Heart Bursts
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. LIVE RELATIONSHIP COUNTER & SEPTEMBER 28 CELEBRATION COUNTDOWN
  // ==========================================================================
  const countMonthsEl = document.getElementById('count-months');
  const countWeeksEl = document.getElementById('count-weeks');
  const countDaysEl = document.getElementById('count-days');
  const countHoursEl = document.getElementById('count-hours');
  const countMinutesEl = document.getElementById('count-minutes');
  const countSecondsEl = document.getElementById('count-seconds');
  const celebrationTagEl = document.getElementById('celebration-countdown-tag');

  const editDateBtn = document.getElementById('edit-date-btn');
  const dateModal = document.getElementById('date-picker-modal');
  const dateInput = document.getElementById('anniversary-date-input');
  const saveDateBtn = document.getElementById('save-date-btn');
  const closeDateModalBtn = document.getElementById('close-date-modal');

  // Default start date: April 28, 2026 (5 months up to September 28, 2026)
  const DEFAULT_START_DATE = '2026-04-28';
  let startDateStr = localStorage.getItem('jodhaa_anniversary_date') || DEFAULT_START_DATE;
  if (dateInput) dateInput.value = startDateStr;

  // September 28th Celebration Date
  function updateCelebrationCountdown() {
    if (!celebrationTagEl) return;

    const now = new Date();
    // Target: September 28, 2026
    const celebrationTarget = new Date(now.getFullYear(), 8, 28, 0, 0, 0); // Month is 0-indexed: 8 = Sept
    const diffMs = celebrationTarget - now;

    if (diffMs > 0) {
      const diffSecs = Math.floor(diffMs / 1000) % 60;
      const diffMins = Math.floor(diffMs / (1000 * 60)) % 60;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      celebrationTagEl.innerHTML = `⏳ ${diffDays}d ${diffHours}h ${diffMins}m ${diffSecs}s to go! ✨`;
    } else if (now.getDate() === 28 && now.getMonth() === 8) {
      celebrationTagEl.innerHTML = `🎉 TODAY IS OUR 5-MONTH CELEBRATION! 💖`;
      celebrationTagEl.style.background = 'linear-gradient(135deg, #f5c786, #e6396f)';
    } else {
      celebrationTagEl.innerHTML = `💖 Celebrated on Sept 28 • Forever In Love!`;
    }
  }

  function updateCounter() {
    const start = new Date(startDateStr);
    const now = new Date();
    const diffMs = Math.max(0, now - start);

    // Total Days, Hours, Mins, Secs
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);

    // Approximate months calculation
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) {
      months--;
    }
    months = Math.max(0, months);

    const remHours = totalHours % 24;
    const remMinutes = totalMinutes % 60;
    const remSeconds = totalSeconds % 60;

    if (countMonthsEl) countMonthsEl.innerText = months || 5;
    if (countWeeksEl) countWeeksEl.innerText = totalWeeks;
    if (countDaysEl) countDaysEl.innerText = totalDays.toLocaleString();
    if (countHoursEl) countHoursEl.innerText = String(remHours).padStart(2, '0');
    if (countMinutesEl) countMinutesEl.innerText = String(remMinutes).padStart(2, '0');
    if (countSecondsEl) countSecondsEl.innerText = String(remSeconds).padStart(2, '0');

    updateCelebrationCountdown();
  }

  setInterval(updateCounter, 1000);
  updateCounter();

  // Date Modal Handlers
  if (editDateBtn && dateModal) {
    editDateBtn.addEventListener('click', () => {
      dateModal.classList.add('active');
    });
  }

  if (closeDateModalBtn && dateModal) {
    closeDateModalBtn.addEventListener('click', () => {
      dateModal.classList.remove('active');
    });
  }

  if (saveDateBtn && dateInput && dateModal) {
    saveDateBtn.addEventListener('click', () => {
      if (dateInput.value) {
        startDateStr = dateInput.value;
        localStorage.setItem('jodhaa_anniversary_date', startDateStr);
        updateCounter();
        dateModal.classList.remove('active');
        if (window.createHeartBurst) {
          window.createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
        }
      }
    });
  }


  // ==========================================================================
  // 2. 50 REASONS WHY I LOVE JODHAA
  // ==========================================================================
  const reasonsData = [
    { num: 1, category: 'smile', icon: '😊', text: "The way your entire face lights up whenever you laugh genuinely.", tag: "Your Smile" },
    { num: 2, category: 'together', icon: '✨', text: "How natural and effortless it felt talking to you from day one.", tag: "Our Story" },
    { num: 3, category: 'heart', icon: '🌸', text: "Your gentle empathy and how deeply you care for people around you.", tag: "Sweet Soul" },
    { num: 4, category: 'quirks', icon: '☕', text: "Your cute little habits and expressions that only I get to notice.", tag: "Cute Quirks" },
    { num: 5, category: 'together', icon: '🌙', text: "Our late-night calls where neither of us ever wants to hang up.", tag: "Our 5 Months" },
    { num: 6, category: 'smile', icon: '✨', text: "That sweet, shy smile you make right after we make eye contact.", tag: "Your Smile" },
    { num: 7, category: 'heart', icon: '🫂', text: "How your hugs have this superpower to wash away all my stress.", tag: "Sweet Soul" },
    { num: 8, category: 'together', icon: '🚗', text: "Singing along terribly in the car and having the time of our lives.", tag: "Our 5 Months" },
    { num: 9, category: 'quirks', icon: '🍕', text: "The happy little dance you do when good food arrives.", tag: "Cute Quirks" },
    { num: 10, category: 'together', icon: '❤️', text: "Knowing that no matter how long the day is, I get to talk to you.", tag: "Our 5 Months" },
    { num: 11, category: 'heart', icon: '🌟', text: "How supportive and encouraging you are of everything I do.", tag: "Sweet Soul" },
    { num: 12, category: 'smile', icon: '🥰', text: "The sparkle in your eyes when you talk about things you love.", tag: "Your Smile" },
    { num: 13, category: 'quirks', icon: '📱', text: "The adorable memes and reels you send that make me burst out laughing.", tag: "Cute Quirks" },
    { num: 14, category: 'together', icon: '☕', text: "Sharing quiet moments together where silence is completely comfortable.", tag: "Our 5 Months" },
    { num: 15, category: 'heart', icon: '💖', text: "Your pure heart that always looks for the good in everything.", tag: "Sweet Soul" },
    { num: 16, category: 'smile', icon: '👑', text: "Looking at you across a crowded room and thinking, 'She is all mine.'", tag: "Your Smile" },
    { num: 17, category: 'together', icon: '🤝', text: "How perfectly your hand fits into mine when we walk together.", tag: "Our 5 Months" },
    { num: 18, category: 'quirks', icon: '😴', text: "How sleepy and adorable your voice sounds early in the morning.", tag: "Cute Quirks" },
    { num: 19, category: 'heart', icon: '🕊️', text: "The patience and understanding you show in every situation.", tag: "Sweet Soul" },
    { num: 20, category: 'together', icon: '⏳', text: "How 5 months have felt like both a heartbeat and a sweet eternity.", tag: "Our 5 Months" },
    { num: 21, category: 'smile', icon: '🌺', text: "Your spontaneous giggles that are completely contagious.", tag: "Your Smile" },
    { num: 22, category: 'quirks', icon: '🧣', text: "Stealing my oversized hoodies and looking 100x better in them than I do.", tag: "Cute Quirks" },
    { num: 23, category: 'heart', icon: '🛡️', text: "How you make me feel safe, cherished, and truly understood.", tag: "Sweet Soul" },
    { num: 24, category: 'together', icon: '🤫', text: "Our secret glances and inside jokes that no one else in the room gets.", tag: "Our 5 Months" },
    { num: 25, category: 'smile', icon: '💫', text: "The proud smile you wear when you accomplish something you worked hard for.", tag: "Your Smile" },
    { num: 26, category: 'quirks', icon: '🍪', text: "Your specific snack cravings and how you must have just one more bite.", tag: "Cute Quirks" },
    { num: 27, category: 'heart', icon: '💌', text: "The sweet, thoughtful messages you send out of the blue.", tag: "Sweet Soul" },
    { num: 28, category: 'together', icon: '🌅', text: "Watching sunsets with you and realizing you are prettier than the view.", tag: "Our 5 Months" },
    { num: 29, category: 'smile', icon: '✨', text: "How you laugh with your whole heart without holding back.", tag: "Your Smile" },
    { num: 30, category: 'heart', icon: '🌷', text: "Your loyalty, honesty, and the genuine way you treat everyone.", tag: "Sweet Soul" },
    { num: 31, category: 'quirks', icon: '🎧', text: "Your music taste and how you passionately introduce me to new tracks.", tag: "Cute Quirks" },
    { num: 32, category: 'together', icon: '🌧️', text: "How even gloomy, rainy days turn romantic and cozy whenever I'm with you.", tag: "Our 5 Months" },
    { num: 33, category: 'smile', icon: '🦋', text: "The fact that you still give me butterflies every single time you say my name.", tag: "Your Smile" },
    { num: 34, category: 'heart', icon: '💎', text: "Your strength and poise, even when things get overwhelming.", tag: "Sweet Soul" },
    { num: 35, category: 'quirks', icon: '👀', text: "The way you roll your eyes at my terrible dad jokes before smiling.", tag: "Cute Quirks" },
    { num: 36, category: 'together', icon: '🧩', text: "How we complement each other like matching puzzle pieces.", tag: "Our 5 Months" },
    { num: 37, category: 'smile', icon: '☀️', text: "How you can turn my worst day into my best day with just one sentence.", tag: "Your Smile" },
    { num: 38, category: 'heart', icon: '🕯️', text: "Your gentle way of reassuring me whenever I doubt myself.", tag: "Sweet Soul" },
    { num: 39, category: 'quirks', icon: '🧸', text: "How cozy you look all bundled up in blankets.", tag: "Cute Quirks" },
    { num: 40, category: 'together', icon: '🎯', text: "Every plan we make together, big or small, feels exciting.", tag: "Our 5 Months" },
    { num: 41, category: 'smile', icon: '💐', text: "The way you smile into the phone screen when we're texting.", tag: "Your Smile" },
    { num: 42, category: 'heart', icon: '🌿', text: "Your humility and the effortless grace you carry yourself with.", tag: "Sweet Soul" },
    { num: 43, category: 'quirks', icon: '🍫', text: "How you can never say no to sweet treats and chocolate.", tag: "Cute Quirks" },
    { num: 44, category: 'together', icon: '🏠', text: "That feeling of 'I am home' the moment you are near.", tag: "Our 5 Months" },
    { num: 45, category: 'smile', icon: '🎆', text: "Your smile when you wake up, completely unbothered and gorgeous.", tag: "Your Smile" },
    { num: 46, category: 'heart', icon: '🤍', text: "The way you remember tiny details I mentioned weeks ago.", tag: "Sweet Soul" },
    { num: 47, category: 'together', icon: '🌟', text: "Being able to be 100% my true self with you without hesitation.", tag: "Our 5 Months" },
    { num: 48, category: 'quirks', icon: '💭', text: "The cute, funny theories you come up with about random things.", tag: "Cute Quirks" },
    { num: 49, category: 'smile', icon: '🔥', text: "How radiant and captivating you look when you're feeling confident.", tag: "Your Smile" },
    { num: 50, category: 'together', icon: '💖', text: "Simply because you are Jodhaa, and loving you is the easiest thing I've ever done.", tag: "My Everything" }
  ];

  const reasonsContainer = document.getElementById('reasons-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const randomReasonBtn = document.getElementById('random-reason-btn');

  function renderReasons(filter = 'all') {
    if (!reasonsContainer) return;
    reasonsContainer.innerHTML = '';

    const filtered = filter === 'all' 
      ? reasonsData 
      : reasonsData.filter(r => r.category === filter);

    filtered.forEach(r => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.id = `reason-${r.num}`;
      card.innerHTML = `
        <div>
          <div class="reason-card-header">
            <span class="reason-number">#${r.num}</span>
            <span class="reason-icon">${r.icon}</span>
          </div>
          <p class="reason-text">"${r.text}"</p>
        </div>
        <span class="reason-tag">${r.tag}</span>
      `;
      reasonsContainer.appendChild(card);
    });
  }

  // Filter button handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderReasons(btn.getAttribute('data-filter'));
    });
  });

  // Random Reason Pop-up
  if (randomReasonBtn) {
    randomReasonBtn.addEventListener('click', () => {
      // Pick a random reason
      const randomIdx = Math.floor(Math.random() * reasonsData.length);
      const picked = reasonsData[randomIdx];

      // Switch to 'all' filter if not already
      filterBtns.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
      renderReasons('all');

      // Scroll to the card and highlight
      const targetCard = document.getElementById(`reason-${picked.num}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.borderColor = 'var(--gold-accent)';
        targetCard.style.boxShadow = '0 0 35px var(--gold-glow)';
        targetCard.style.transform = 'scale(1.05)';

        setTimeout(() => {
          targetCard.style.borderColor = '';
          targetCard.style.boxShadow = '';
          targetCard.style.transform = '';
        }, 3000);

        if (window.createHeartBurst) {
          const rect = targetCard.getBoundingClientRect();
          window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
        }
      }
    });
  }

  renderReasons('all');


  // ==========================================================================
  // 3. POLAROID WALL & LIGHTBOX
  // ==========================================================================
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox');
  const photoUploaders = document.querySelectorAll('.photo-uploader');

  // Load saved custom photos from localStorage if available
  photoUploaders.forEach((uploader, idx) => {
    const savedImg = localStorage.getItem(`jodhaa_polaroid_${idx}`);
    if (savedImg) {
      const imgEl = document.getElementById(`polaroid-img-${idx}`);
      if (imgEl) imgEl.src = savedImg;
    }

    // Handle user upload
    uploader.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        const imgEl = document.getElementById(`polaroid-img-${idx}`);
        if (imgEl) imgEl.src = base64;

        try {
          localStorage.setItem(`jodhaa_polaroid_${idx}`, base64);
        } catch (err) {
          console.warn('Image too large for localStorage, keeping in session memory.', err);
        }

        if (window.createHeartBurst) {
          const rect = uploader.getBoundingClientRect();
          window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
        }
      };
      reader.readAsDataURL(file);
    });
  });

  // Open Lightbox on card click
  polaroids.forEach(card => {
    card.addEventListener('click', (e) => {
      // Ignore if user clicked the "Replace" upload input
      if (e.target.closest('.replace-photo-label') || e.target.closest('.photo-uploader')) {
        return;
      }

      const img = card.querySelector('.polaroid-img');
      const text = card.querySelector('.polaroid-text');

      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption && text) {
          lightboxCaption.innerText = text.innerText;
        }
        lightbox.classList.add('active');
      }
    });
  });

  // Close Lightbox
  if (closeLightboxBtn && lightbox) {
    closeLightboxBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }


  // ==========================================================================
  // 4. INTERACTIVE 3D LOVE LETTER ENVELOPE
  // ==========================================================================
  const waxSeal = document.getElementById('wax-seal');
  const envelopeBox = document.getElementById('envelope-box');
  const envelopePrompt = document.getElementById('envelope-prompt');
  const letterActions = document.getElementById('letter-actions');
  const closeLetterBtn = document.getElementById('close-letter-btn');

  function openEnvelope() {
    if (!envelopeBox) return;
    envelopeBox.classList.add('open');
    if (envelopePrompt) envelopePrompt.style.display = 'none';
    if (letterActions) letterActions.style.display = 'block';

    if (window.createHeartBurst) {
      const rect = envelopeBox.getBoundingClientRect();
      window.createHeartBurst(rect.left + rect.width / 2, rect.top + 100, 25);
    }
  }

  function closeEnvelope() {
    if (!envelopeBox) return;
    envelopeBox.classList.remove('open');
    if (envelopePrompt) envelopePrompt.style.display = 'block';
    if (letterActions) letterActions.style.display = 'none';
  }

  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  if (closeLetterBtn) closeLetterBtn.addEventListener('click', closeEnvelope);


  // ==========================================================================
  // 5. OUR NEXT MILESTONES & BUCKET LIST
  // ==========================================================================
  const defaultBucketItems = [
    { text: "Celebrate our 5th Month Anniversary together on September 28th! 🥂✨", completed: false },
    { text: "Reach our official 6-month half-year milestone together ❤️", completed: false },
    { text: "Plan a cozy weekend getaway trip just for the two of us 🌲", completed: false },
    { text: "Have a midnight picnic under the open starry sky 🌌", completed: false },
    { text: "Cook a full 3-course dinner together from scratch 🍝", completed: false },
    { text: "Take cute candid photos in a vintage photo booth 📸", completed: false },
    { text: "Binge-watch an entire series wrapped in one giant blanket 🍿", completed: false },
    { text: "Celebrate our official 1-Year Anniversary in style 🥂", completed: false },
    { text: "Keep loving each other more and more with every passing day ✨", completed: true }
  ];

  const bucketContainer = document.getElementById('bucket-items');
  const bucketCounter = document.getElementById('bucket-counter');
  const newBucketInput = document.getElementById('new-bucket-input');
  const addBucketBtn = document.getElementById('add-bucket-btn');

  let bucketItems = JSON.parse(localStorage.getItem('jodhaa_bucket_list')) || defaultBucketItems;

  function renderBucketList() {
    if (!bucketContainer) return;
    bucketContainer.innerHTML = '';

    let completedCount = 0;

    bucketItems.forEach((item, index) => {
      if (item.completed) completedCount++;

      const itemEl = document.createElement('div');
      itemEl.className = `bucket-item ${item.completed ? 'completed' : ''}`;
      itemEl.innerHTML = `
        <div class="bucket-checkbox">${item.completed ? '✓' : ''}</div>
        <span class="bucket-text">${item.text}</span>
      `;

      itemEl.addEventListener('click', () => {
        bucketItems[index].completed = !bucketItems[index].completed;
        saveAndRenderBucket();

        if (bucketItems[index].completed && window.createHeartBurst) {
          const rect = itemEl.getBoundingClientRect();
          window.createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        }
      });

      bucketContainer.appendChild(itemEl);
    });

    if (bucketCounter) {
      bucketCounter.innerText = `${completedCount} / ${bucketItems.length} Completed`;
    }
  }

  function saveAndRenderBucket() {
    localStorage.setItem('jodhaa_bucket_list', JSON.stringify(bucketItems));
    renderBucketList();
  }

  if (addBucketBtn && newBucketInput) {
    addBucketBtn.addEventListener('click', () => {
      const text = newBucketInput.value.trim();
      if (!text) return;

      bucketItems.push({ text, completed: false });
      newBucketInput.value = '';
      saveAndRenderBucket();

      if (window.createHeartBurst) {
        window.createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
      }
    });

    newBucketInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addBucketBtn.click();
      }
    });
  }

  renderBucketList();


  // ==========================================================================
  // 6. QUICK ACTION HEART BURSTS & FOOTER INTERACTION
  // ==========================================================================
  const burstLoveBtn = document.getElementById('burst-love-btn');
  const footerHeartBtn = document.getElementById('footer-heart-btn');

  if (burstLoveBtn) {
    burstLoveBtn.addEventListener('click', () => {
      if (window.createHeartBurst) {
        window.createHeartBurst(window.innerWidth / 2, 120, 30);
      }
    });
  }

  if (footerHeartBtn) {
    footerHeartBtn.addEventListener('click', () => {
      if (window.createHeartBurst) {
        window.createHeartBurst(window.innerWidth / 2, window.innerHeight - 150, 45);
      }
      footerHeartBtn.innerHTML = '<span>💖 Sent Infinite Love to Jodhaa! 💖</span>';
      setTimeout(() => {
        footerHeartBtn.innerHTML = '<span>💖 Tap to Send Jodhaa More Love 💖</span>';
      }, 2500);
    });
  }

});
