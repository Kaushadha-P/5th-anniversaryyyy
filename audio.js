/**
 * Romantic Ambient Audio System
 * Uses Web Audio API for an ethereal, gentle romantic melody (works offline, zero external dependencies)
 * + Supports custom audio upload for couples to play their real favorite song.
 */

(function() {
  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;

  const musicToggle = document.getElementById('music-toggle');
  const audioWaves = document.getElementById('audio-waves');
  const customAudioUpload = document.getElementById('custom-audio-upload');
  const customAudioPlayer = document.getElementById('custom-audio-player');
  const musicText = musicToggle ? musicToggle.querySelector('.music-text') : null;

  // Romantic Pentatonic Chord Progression frequencies (warm harp/celesta feel)
  // Chords: Fmaj7 -> Gsus4 -> Am7 -> Cmaj7
  const chords = [
    [174.61, 261.63, 329.63, 392.00, 523.25], // F3, C4, E4, G4, C5
    [196.00, 261.63, 293.66, 392.00, 587.33], // G3, C4, D4, G4, D5
    [220.00, 261.63, 329.63, 392.00, 659.25], // A3, C4, E4, G4, E5
    [130.81, 196.00, 261.63, 329.63, 523.25]  // C3, G3, C4, E4, C5
  ];

  let currentChordIndex = 0;
  let noteStep = 0;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play a soft, warm bell/harp note
  function playHarpNote(freq, delay = 0, duration = 2.5) {
    if (!audioCtx || !isPlaying) return;

    const startTime = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Gentle sine / triangle mix for a warm music-box/harp timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm low-pass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

    // Soft attack, gentle exponential decay
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  function scheduleNextNotes() {
    if (!isPlaying) return;

    const currentChord = chords[currentChordIndex];
    const freq = currentChord[noteStep % currentChord.length];

    // Play note with soft dynamics
    playHarpNote(freq, 0, 2.2);

    // Occasional gentle harmony note
    if (noteStep % 2 === 0) {
      const harmonyFreq = currentChord[(noteStep + 2) % currentChord.length];
      playHarpNote(harmonyFreq, 0.15, 2.0);
    }

    noteStep++;
    if (noteStep >= currentChord.length) {
      noteStep = 0;
      currentChordIndex = (currentChordIndex + 1) % chords.length;
    }

    // Next note in ~550ms - 850ms (relaxing, organic tempo)
    const nextInterval = 650 + (Math.random() * 200 - 100);
    timerId = setTimeout(scheduleNextNotes, nextInterval);
  }

  function startAmbientMusic() {
    initAudioContext();
    isPlaying = true;
    scheduleNextNotes();
    if (audioWaves) audioWaves.classList.add('playing');
    if (musicText) musicText.innerText = 'Pause Melody';
  }

  function stopAmbientMusic() {
    isPlaying = false;
    if (timerId) clearTimeout(timerId);
    if (audioWaves) audioWaves.classList.remove('playing');
    if (musicText) musicText.innerText = 'Play Melody';
  }

  // Toggle button handler
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      // If custom audio is loaded and playing, toggle that instead
      if (customAudioPlayer.src && !customAudioPlayer.paused) {
        customAudioPlayer.pause();
        if (audioWaves) audioWaves.classList.remove('playing');
        if (musicText) musicText.innerText = 'Play Our Song';
        return;
      } else if (customAudioPlayer.src && customAudioPlayer.paused) {
        customAudioPlayer.play();
        if (audioWaves) audioWaves.classList.add('playing');
        if (musicText) musicText.innerText = 'Pause Our Song';
        return;
      }

      // Otherwise toggle synthesized ambient melody
      if (isPlaying) {
        stopAmbientMusic();
      } else {
        startAmbientMusic();
      }
    });
  }

  // Custom Audio File Upload Handler
  if (customAudioUpload) {
    customAudioUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const fileURL = URL.createObjectURL(file);
      customAudioPlayer.src = fileURL;

      // Stop ambient synth if playing
      stopAmbientMusic();

      customAudioPlayer.play().then(() => {
        if (audioWaves) audioWaves.classList.add('playing');
        if (musicText) musicText.innerText = 'Playing: ' + file.name.slice(0, 12) + '...';
        if (window.createHeartBurst) {
          window.createHeartBurst(window.innerWidth / 2, 80, 15);
        }
      }).catch(err => {
        console.log('Audio playback permission:', err);
      });
    });
  }

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    stopAmbientMusic();
    if (audioCtx) audioCtx.close();
  });

})();
