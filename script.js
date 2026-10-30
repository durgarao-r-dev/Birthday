const LYRIC_TIMESTAMPS = {"audioFile":"cursor-of-courage.mp3","duration":285.62,"note":"Timestamps are approximate based on the provided audio transcript. Adjust in this file for perfect sync. Word highlighting uses start/end times.","lyrics":[{"start":22.0,"end":28.0,"text":"Background to state of blinking cursor on my screen."},{"start":32.0,"end":36.0,"text":"Read every line a hundred times and never see."},{"start":37.0,"end":40.0,"text":"You didn't take the keyboard, you just pulled a chair up near."},{"start":42.0,"end":47.0,"text":"And said read it out loud to me, the answers hidden here."},{"start":48.0,"end":51.0,"text":"My hands were cold, my face was hot."},{"start":53.0,"end":56.0,"text":"You waited and you did not run."},{"start":58.0,"end":65.0,"text":"Thank you, madam, for the patient hours, for every bug"},{"start":65.0,"end":68.0,"text":"you let me find myself."},{"start":69.0,"end":76.0,"text":"Thank you, madam, you handed me the power to trust my head"},{"start":76.0,"end":80.0,"text":"and ask for no one's help."},{"start":80.0,"end":83.0,"text":"Happy birthday to the teacher who stayed."},{"start":85.0,"end":90.0,"text":"Tell the broken thing was something I had made."},{"start":100.0,"end":106.0,"text":"Markers squeaking on the whiteboard, loops in blue and green."},{"start":110.0,"end":115.0,"text":"He drew a little staircase, and I finally saw what it could mean."},{"start":115.0,"end":116.0,"text":"And I was sad."},{"start":116.0,"end":120.0,"text":"Was not built for the strongly smile instead."},{"start":120.0,"end":125.0,"text":"Nobody's born knowing it, we learn it line by line."},{"start":125.0,"end":129.0,"text":"Instead, my hands were warm, my head was clear."},{"start":131.0,"end":136.0,"text":"You waited and the program ran and left."},{"start":136.0,"end":144.0,"text":"Thank you, madam, for the patient hours, for every book"},{"start":144.0,"end":147.0,"text":"you let me find myself."},{"start":147.0,"end":155.0,"text":"Thank you, madam, you handed me the power to trust my kin."},{"start":155.0,"end":158.0,"text":"Ask for no one's help."},{"start":158.0,"end":165.0,"text":"Happy birthday to the teacher who stayed, till the break and fame was"},{"start":165.0,"end":173.0,"text":"something I had made."},{"start":177.0,"end":186.0,"text":"Now I'm the one beside a student's chair, hard"},{"start":186.0,"end":193.0,"text":"face, a cursor on the screen, my voice says softly,"},{"start":194.0,"end":201.0,"text":"take your son, your words come out of me, and I can't"},{"start":201.0,"end":205.0,"text":"tell them from my own."},{"start":205.0,"end":212.0,"text":"You not up for the patient hours, for this rebirth, you let"},{"start":213.0,"end":214.0,"text":"me find myself."},{"start":215.0,"end":222.0,"text":"Thank you, not up, you handed me the power to trust my head"},{"start":222.0,"end":226.0,"text":"and ask for no one's help."},{"start":226.0,"end":231.0,"text":"They built me to a teacher who stayed."},{"start":231.0,"end":245.0,"text":"As though the broken thing was something"},{"start":245.0,"end":255.0,"text":"we had made."}],"letterWords":[{"start":58.0,"end":68.0,"words":["Thank","you,","Madam,","for","the","patient","hours","and","every","bug","you","let","me","find","myself."]},{"start":69.0,"end":80.0,"words":["You","handed","me","the","power","to","trust","my","head","and","ask","for","no","one's","help."]},{"start":80.0,"end":90.0,"words":["Happy","birthday","to","the","teacher","who","stayed","until","the","broken","thing","was","something","I","had","made."]},{"start":136.0,"end":147.0,"words":["Thank","you,","Madam,","for","the","patient","hours,","for","every","book","you","let","me","find","myself."]},{"start":147.0,"end":158.0,"words":["Thank","you,","Madam,","you","handed","me","the","power","to","trust","myself","and","ask","for","no","one's","help."]},{"start":158.0,"end":173.0,"words":["Happy","birthday","to","the","teacher","who","stayed","till","the","breakthrough","was","something","I","had","made."]},{"start":205.0,"end":214.0,"words":["Thank","you","for","the","patient","hours,","for","this","rebirth,","you","let","me","find","myself."]},{"start":215.0,"end":226.0,"words":["Thank","you,","Madam,","you","handed","me","the","power","to","trust","my","head","and","ask","for","no","one's","help."]},{"start":226.0,"end":255.0,"words":["You","built","me","into","a","teacher","who","stayed,","as","though","the","broken","thing","was","something","we","had","made."]}]};

/* ===== audio.js ===== */
/**
 * Audio manager - single instance, continuous across scenes
 */
const AudioManager = (function () {
  let audio = null;
  let isReady = false;

  function init() {
    if (audio) return audio;
    audio = new Audio('cursor-of-courage.mp3');
    audio.preload = 'auto';
    audio.volume = 0.7;
    audio.loop = false;

    audio.addEventListener('loadedmetadata', () => {
      isReady = true;
      updateProgress();
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      const playBtn = document.getElementById('btn-play');
      if (playBtn) playBtn.textContent = '▶';
    });

    return audio;
  }

  function play() {
    if (!audio) init();
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        const btn = document.getElementById('btn-play');
        if (btn) btn.textContent = '❚❚';
      }).catch(err => {
        console.warn('Autoplay blocked:', err);
        return false;
      });
    }
    return true;
  }

  function pause() {
    if (audio) {
      audio.pause();
      const btn = document.getElementById('btn-play');
      if (btn) btn.textContent = '▶';
    }
  }

  function toggle() {
    if (!audio) init();
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  }

  function replay() {
    if (!audio) init();
    audio.currentTime = 0;
    play();
  }

  function setVolume(v) {
    if (audio) audio.volume = Math.max(0, Math.min(1, v));
  }

  function getCurrentTime() {
    return audio ? audio.currentTime : 0;
  }

  function seek(t) {
    if (audio) audio.currentTime = t;
  }

  function updateProgress() {
    const el = document.getElementById('progress-text');
    if (!el || !audio) return;
    const cur = formatTime(audio.currentTime);
    const dur = formatTime(audio.duration || 0);
    el.textContent = `${cur} / ${dur}`;
  }

  function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function getAudio() {
    return audio || init();
  }

  return {
    init,
    play,
    pause,
    toggle,
    replay,
    setVolume,
    getCurrentTime,
    seek,
    getAudio,
    isReady: () => isReady
  };
})();


/* ===== letter-sync.js ===== */
/**
 * Word-by-word lyric synchronization for Scene 3
 * Uses actual audio.currentTime against timestamp data
 */
const LetterSync = (function () {
  let timestamps = null;
  let words = [];
  let rafId = null;
  let letterEl = null;

  async function loadTimestamps() {
    timestamps = LYRIC_TIMESTAMPS;
    return timestamps;
  }

  function buildLetterHTML() {
    // Full letter content that maps to the song themes
    const paragraphs = [
      "Dear Madam,",
      "Thank you, Madam, for the patient hours and every bug you let me find myself. You handed me the power to trust my head and ask for no one's help.",
      "Happy birthday to the teacher who stayed until the broken thing was something I had made.",
      "You taught us programming not by giving answers, but by sitting beside us while the cursor blinked. You showed patience when our hands were cold and our faces hot. You waited, and you did not run.",
      "Markers squeaking on the whiteboard, loops in blue and green — you drew the staircase of understanding until we finally saw what it could mean. Nobody is born knowing it; we learn it line by line.",
      "Thank you, Madam, for the patient hours, for every book you let me find myself. Thank you, Madam, you handed me the power to trust myself and ask for no one's help.",
      "Happy birthday to the teacher who stayed till the breakthrough was something I had made.",
      "Now the lessons continue. Your words come out of us, and we cannot always tell them from our own. Thank you for the patient hours, for this rebirth, you let me find myself.",
      "Thank you, Madam, you handed me the power to trust my head and ask for no one's help. You built me into someone who can stay, as though the broken thing was something we had made.",
      "With deepest respect and gratitude,",
      "Your students"
    ];

    const container = document.getElementById('letter-body');
    if (!container) return;

    container.innerHTML = '';
    words = [];

    paragraphs.forEach((para, pi) => {
      const p = document.createElement('p');
      if (pi === 0) p.className = 'letter-greeting';
      if (pi === paragraphs.length - 1 || pi === paragraphs.length - 2) {
        p.style.marginTop = '1.2rem';
        if (pi === paragraphs.length - 1) p.className = 'letter-signature';
      }

      const tokens = para.split(/(\s+)/);
      tokens.forEach(tok => {
        if (tok.trim() === '') {
          p.appendChild(document.createTextNode(tok));
        } else {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = tok;
          p.appendChild(span);
          words.push(span);
        }
      });
      container.appendChild(p);
    });
  }

  function getActiveWordIndex(currentTime) {
    if (!timestamps || !timestamps.letterWords) return -1;

    // Find which letterWords group is active
    for (let g = 0; g < timestamps.letterWords.length; g++) {
      const group = timestamps.letterWords[g];
      if (currentTime >= group.start && currentTime < group.end) {
        const duration = group.end - group.start;
        const progress = (currentTime - group.start) / duration;
        const wordCount = group.words.length;
        const idxInGroup = Math.min(Math.floor(progress * wordCount), wordCount - 1);

        // Map group word index to global words array
        // We approximate by finding sequential matching
        return findGlobalIndex(g, idxInGroup);
      }
    }
    return -1;
  }

  // Simple sequential mapping based on order of letterWords
  let groupStartIndices = null;
  function computeGroupStarts() {
    if (groupStartIndices) return;
    groupStartIndices = [];
    // Approximate: letter has many words; we map groups roughly to later parts of the letter
    // For better accuracy the letter was written to mirror song phrases
    let approx = 0;
    // Greeting + first para ~ 30 words before first highlight group
    const offsets = [28, 45, 62, 95, 112, 130, 155, 170, 188];
    timestamps.letterWords.forEach((_, i) => {
      groupStartIndices.push(offsets[i] || approx);
      approx = (offsets[i] || approx) + (timestamps.letterWords[i].words.length || 10);
    });
  }

  function findGlobalIndex(groupIdx, wordInGroup) {
    computeGroupStarts();
    const start = groupStartIndices[groupIdx] || 0;
    return Math.min(start + wordInGroup, words.length - 1);
  }

  function highlight(currentTime) {
    const activeIdx = getActiveWordIndex(currentTime);
    words.forEach((w, i) => {
      if (i === activeIdx) {
        w.classList.add('active');
        // Keep active word in view
        w.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      } else {
        w.classList.remove('active');
      }
    });
  }

  function startSync() {
    stopSync();
    const tick = () => {
      const t = AudioManager.getCurrentTime();
      highlight(t);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  }

  function stopSync() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  async function init() {
    await loadTimestamps();
    buildLetterHTML();
  }

  return {
    init,
    startSync,
    stopSync,
    highlight
  };
})();


/* ===== gift.js ===== */
/**
 * Gift box interaction and final photo reveal
 */
const GiftManager = (function () {
  let unlocked = false;

  function showGiftStage() {
    const challenge = document.getElementById('challenge-stage');
    const gift = document.getElementById('gift-stage');
    if (challenge) challenge.style.display = 'none';
    if (gift) {
      gift.classList.add('visible');
      gift.style.display = 'flex';
    }
  }

  function openGift() {
    if (!unlocked) return;
    const box = document.getElementById('gift-box');
    if (box) box.classList.add('opened');

    setTimeout(() => {
      revealPhoto();
    }, 900);
  }

  function revealPhoto() {
    const wrap = document.getElementById('final-photo-wrap');
    const img = document.getElementById('final-photo');
    if (img) {
      // Load via protected endpoint
      img.src = 'final-photo.jpg';
      img.onerror = () => { img.alt = 'The final photo could not be loaded.'; };
    }
    if (wrap) {
      wrap.classList.add('visible');
      wrap.style.display = 'block';
    }

    setTimeout(() => {
      const msg = document.getElementById('closing-message');
      if (msg) msg.classList.add('visible');
    }, 800);
  }

  async function submitChallenge(answer) {
    return answer === 'Moham pagilipodhi' ? { success: true } : { success: false, message: 'Not quite! Try again.' };
  }

  function setUnlocked(val) {
    unlocked = val;
  }

  return {
    showGiftStage,
    openGift,
    revealPhoto,
    submitChallenge,
    setUnlocked
  };
})();


/* ===== scenes.js ===== */
/**
 * Scene manager - controls transitions between the 5 scenes
 */
const SceneManager = (function () {
  let current = 0;
  const total = 5;
  let quoteTimers = [];

  const quotes = {
    1: [
      "A great teacher leaves a mark that time cannot erase.",
      "The lessons we learn become the strength we carry forward."
    ],
    2: [
      "Your guidance helped turn questions into possibilities.",
      "Knowledge becomes more meaningful when shared with kindness.",
      "The best lessons continue to inspire us long after class ends.",
      "Thank you for helping us learn, grow, and believe in ourselves."
    ],
    3: [
      "Beyond every line of code, you taught us how to think.",
      "Your patience taught us that every mistake is a chance to learn.",
      "Some memories become treasures we carry for a lifetime.",
      "A teacher's influence lives on in every student they inspire."
    ]
  };

  function showScene(n) {
    // Hide all
    document.querySelectorAll('.scene').forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });

    const scene = document.getElementById('scene-' + n);
    if (scene) {
      scene.style.display = 'block';
      // Force reflow then activate
      void scene.offsetWidth;
      scene.classList.add('active');
    }

    // Update dots
    document.querySelectorAll('.scene-dot').forEach((d, i) => {
      d.classList.toggle('active', i === n - 1);
    });

    current = n;

    // Scene-specific setup
    clearQuoteTimers();
    if (n === 1) startQuotes(1);
    if (n === 2) startWishes();
    if (n === 3) {
      LetterSync.init().then(() => LetterSync.startSync());
      startQuotes(3);
    } else {
      LetterSync.stopSync();
    }
    if (n === 4) revealGallery();
    if (n === 5) {
      // Reset challenge UI if needed
      const fb = document.getElementById('challenge-feedback');
      if (fb) {
        fb.textContent = '';
        fb.className = 'feedback';
      }
    }
  }

  function next() {
    if (current < total) showScene(current + 1);
  }

  function prev() {
    if (current > 1) showScene(current - 1);
  }

  function clearQuoteTimers() {
    quoteTimers.forEach(t => clearTimeout(t));
    quoteTimers = [];
  }

  function startQuotes(sceneNum) {
    const list = quotes[sceneNum] || [];
    const container = document.getElementById('quotes-' + sceneNum);
    if (!container || list.length === 0) return;

    container.innerHTML = '';
    let i = 0;

    function showNext() {
      if (i >= list.length) return;
      const q = document.createElement('div');
      q.className = 'quote';
      q.textContent = '“' + list[i] + '”';
      container.appendChild(q);
      // fade in
      setTimeout(() => q.classList.add('visible'), 50);

      const t1 = setTimeout(() => {
        q.classList.remove('visible');
        const t2 = setTimeout(() => {
          q.remove();
          i++;
          showNext();
        }, 800);
        quoteTimers.push(t2);
      }, 4500);
      quoteTimers.push(t1);
    }
    showNext();
  }

  function startWishes() {
    const wishes = document.querySelectorAll('#scene-2 .wish-text');
    wishes.forEach((w, i) => {
      const t = setTimeout(() => w.classList.add('visible'), 400 + i * 700);
      quoteTimers.push(t);
    });
    // also start quotes for scene 2
    startQuotes(2);
  }

  function revealGallery() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, i) => {
      const t = setTimeout(() => item.classList.add('visible'), 200 + i * 250);
      quoteTimers.push(t);
    });
  }

  function getCurrent() {
    return current;
  }

  return {
    showScene,
    next,
    prev,
    getCurrent
  };
})();


/* ===== particles.js ===== */
/**
 * Subtle golden particles background
 */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(60, Math.floor((w * h) / 18000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.15
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  draw();
})();


/* ===== GitHub Pages static challenge ===== */
GiftManager.submitChallenge = async function(answer) {
  return answer === 'Moham pagilipodhi'
    ? { success: true }
    : { success: false, message: 'Not quite! Try again.' };
};

/* ===== Main bootstrap ===== */
document.addEventListener('DOMContentLoaded', () => {
  AudioManager.init();
  const startOverlay = document.getElementById('start-overlay');
  const startBtn = document.getElementById('start-btn');
  function beginExperience() {
    startOverlay.classList.add('hidden');
    AudioManager.play();
    SceneManager.showScene(1);
  }
  startBtn.addEventListener('click', beginExperience);
  document.getElementById('btn-play').addEventListener('click', () => AudioManager.toggle());
  document.getElementById('btn-replay').addEventListener('click', () => AudioManager.replay());
  document.getElementById('volume-slider').addEventListener('input', e => AudioManager.setVolume(parseFloat(e.target.value)));
  document.getElementById('unlock-btn').addEventListener('click', async () => {
    const answer = document.getElementById('answer-select').value;
    const fb = document.getElementById('challenge-feedback');
    const btn = document.getElementById('unlock-btn');
    if (!answer) { fb.textContent = 'Please select an option.'; fb.className = 'feedback error'; return; }
    btn.disabled = true; fb.textContent = 'Checking…'; fb.className = 'feedback';
    const result = await GiftManager.submitChallenge(answer);
    btn.disabled = false;
    if (result.success) {
      fb.textContent = 'Correct! Preparing your surprise…'; fb.className = 'feedback success';
      GiftManager.setUnlocked(true);
      setTimeout(() => GiftManager.showGiftStage(), 900);
    } else {
      fb.textContent = result.message || 'Not quite! Try again.'; fb.className = 'feedback error';
    }
  });
  const giftBox = document.getElementById('gift-box');
  giftBox.addEventListener('click', () => GiftManager.openGift());
  giftBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); GiftManager.openGift(); }
  });
  document.getElementById('replay-btn').addEventListener('click', () => {
    AudioManager.replay();
    document.getElementById('gift-box').classList.remove('opened');
    document.getElementById('final-photo-wrap').classList.remove('visible');
    document.getElementById('final-photo-wrap').style.display = 'none';
    document.getElementById('final-photo').src = '';
    document.getElementById('closing-message').classList.remove('visible');
    document.getElementById('gift-stage').classList.remove('visible');
    document.getElementById('gift-stage').style.display = 'none';
    document.getElementById('challenge-stage').style.display = 'block';
    document.getElementById('answer-select').value = '';
    document.getElementById('challenge-feedback').textContent = '';
    GiftManager.setUnlocked(false);
    SceneManager.showScene(1);
  });
});
