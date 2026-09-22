/**
 * Celestial Stars, Falling Rose Petals & Interactive Heart Bursts
 * Lightweight, high-performance HTML5 Canvas animation
 */

(function() {
  // Canvases & Contexts
  const starCanvas = document.getElementById('star-canvas');
  const petalCanvas = document.getElementById('petal-canvas');
  
  if (!starCanvas || !petalCanvas) return;

  const starCtx = starCanvas.getContext('2d');
  const petalCtx = petalCanvas.getContext('2d');

  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    starCanvas.width = width;
    starCanvas.height = height;
    petalCanvas.width = width;
    petalCanvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  // ==========================================
  // 1. STAR & CONSTELLATION SYSTEM
  // ==========================================
  const stars = [];
  const starCount = Math.min(120, Math.floor((width * height) / 12000));

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  // Shooting Stars
  let shootingStar = null;
  function maybeSpawnShootingStar() {
    if (!shootingStar && Math.random() < 0.008) {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 12,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        opacity: 1
      };
    }
  }

  function renderStars() {
    starCtx.clearRect(0, 0, width, height);

    // Draw static twinkling stars
    for (let star of stars) {
      star.alpha += star.speed * star.direction;
      if (star.alpha <= 0.1) {
        star.alpha = 0.1;
        star.direction = 1;
      } else if (star.alpha >= 0.9) {
        star.alpha = 0.9;
        star.direction = -1;
      }

      starCtx.beginPath();
      starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      starCtx.fillStyle = `rgba(255, 245, 230, ${star.alpha})`;
      starCtx.shadowBlur = star.size * 3;
      starCtx.shadowColor = 'rgba(255, 220, 180, 0.8)';
      starCtx.fill();
    }

    // Draw Shooting Star
    maybeSpawnShootingStar();
    if (shootingStar) {
      const targetX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
      const targetY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

      const grad = starCtx.createLinearGradient(shootingStar.x, shootingStar.y, targetX, targetY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
      grad.addColorStop(1, 'rgba(255, 182, 193, 0)');

      starCtx.beginPath();
      starCtx.moveTo(shootingStar.x, shootingStar.y);
      starCtx.lineTo(targetX, targetY);
      starCtx.strokeStyle = grad;
      starCtx.lineWidth = 2;
      starCtx.stroke();

      shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
      shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
      shootingStar.opacity -= 0.02;

      if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
        shootingStar = null;
      }
    }
  }

  // ==========================================
  // 2. FALLING ROSE PETALS SYSTEM
  // ==========================================
  const petals = [];
  const petalColors = [
    'rgba(230, 57, 111, 0.7)',
    'rgba(255, 117, 143, 0.65)',
    'rgba(255, 154, 162, 0.6)',
    'rgba(214, 45, 98, 0.75)'
  ];

  const maxPetals = Math.min(35, Math.floor(width / 35));

  for (let i = 0; i < maxPetals; i++) {
    petals.push(createPetal(true));
  }

  function createPetal(randomY = false) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.5 - 0.75,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() * 2 - 1) * 1.2,
      oscillation: Math.random() * Math.PI * 2,
      oscillationSpeed: Math.random() * 0.03 + 0.01,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    };
  }

  function renderPetals() {
    petalCtx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      let p = petals[i];
      p.y += p.speedY;
      p.oscillation += p.oscillationSpeed;
      p.x += Math.sin(p.oscillation) * 1.2 + p.speedX;
      p.rotation += p.rotationSpeed;

      // Draw elegant petal shape
      petalCtx.save();
      petalCtx.translate(p.x, p.y);
      petalCtx.rotate((p.rotation * Math.PI) / 180);

      petalCtx.beginPath();
      petalCtx.moveTo(0, 0);
      petalCtx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 3, 0, p.size);
      petalCtx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
      petalCtx.fillStyle = p.color;
      petalCtx.shadowBlur = 6;
      petalCtx.shadowColor = 'rgba(230, 57, 111, 0.3)';
      petalCtx.fill();
      petalCtx.restore();

      // Reset when offscreen
      if (p.y > height + 20 || p.x < -40 || p.x > width + 40) {
        petals[i] = createPetal(false);
      }
    }
  }

  // Animation Loop
  function animate() {
    renderStars();
    renderPetals();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // ==========================================
  // 3. INTERACTIVE HEART BURSTS & CLICK EFFECTS
  // ==========================================
  const heartEmojis = ['💖', '❤️', '💕', '✨', '🌸', '🥰', '💗'];

  window.createHeartBurst = function(x, y, count = 18) {
    const originX = x !== undefined ? x : window.innerWidth / 2;
    const originY = y !== undefined ? y : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'click-heart';
      heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 160;
      const size = Math.random() * 18 + 16;
      
      heart.style.left = `${originX + offsetX}px`;
      heart.style.top = `${originY + offsetY}px`;
      heart.style.fontSize = `${size}px`;
      heart.style.animationDuration = `${Math.random() * 0.6 + 1.0}s`;

      document.body.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 1600);
    }
  };

  // Click on screen for floating hearts (ignoring inputs and buttons that have specific actions)
  document.addEventListener('click', (e) => {
    // Check if clicked element or its parent is an interactive control
    if (e.target.closest('button, input, select, label, .modal-card, .lightbox-content')) {
      return;
    }
    window.createHeartBurst(e.clientX, e.clientY, 3);
  });

})();
