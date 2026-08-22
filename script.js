/* ================================================================
   BIRTHDAY SURPRISE — Script
   ================================================================ */

/* ----------------------------------------------------------------
   ✏️  KONFIGURASI — edit bagian ini sesuai kebutuhan
   ---------------------------------------------------------------- */
const CONFIG = {
  nama:      "Igal",
  pengirim:  "Nana",
  tanggal:   "24 Agustus 2026",

  sapaan: "Hari ini hari spesial buat kamuu. Jadi aku nyiapin small gift yang ga seberapa dari cinta yang aku punya ehe. Moga suka yaa sayangg^^",

  surat: [
    "Aloo sayangkuu>< ciee habede nih yaa wkwk udah seumuran aja sama aku hmm tidak bisa kupanggil adek lagi eheheh lucu banget sih kamu.",
    "Moga panjang umurr, sehat selaluu, murah rezeki nyaa, pokoknya semoga semua hal baik datang ke kamuu, aamiinn. Terimakasih banyak udah bertahan sampe saat ini, sayang. Aku selalu bangga sama sayangku inii.",
    "Apapun yang kamu inginkan, yang kamu impikan, semoga bisa terwujud ya sayang. Karna bagaimana pun kamu, aku akan selalu ada buat kamu. Jarak bukan jadi alasan untuk aku yang selalu mau di samping kamuu.",
    "I LOVEE YOUU SO MUCHH SAYANGKUU CINTAKUU DUNIAKUU SEMESTAKUU GANTENGKUU MMMUAHHHH❤️"
  ],
  tandaTanganSurat: "ur love,",

  // Isi url dengan path foto, atau kosongkan "" untuk placeholder
  foto: [
    { url: "assets/ngonser.jpg", caption: "Ngilang 2 hari langsung diajak ngonser wkwk" },
    { url: "assets/lovers.jpeg", caption: "Avv lopersan nih ye><" },
    { url: "assets/vc.jpeg", caption: "Luthu naa cowokku boboo xixixii" },
  ],

  jumlahGigitan: 5,

  fotoCinta: {
    url:     "assets/together.jpeg",   // foto landscape, kosongkan untuk placeholder
    caption: "Semoga kita selalu bareng apapun yang terjadi ya sayangg 🤍"
  },

  fotoFinal: {
    url: "assets/cute.png",   // isi path foto, contoh: "images/foto-final.jpg"
    alt: "cute"
  },

  penutup: "Maacii udah datang di hidup akuu. Hepi berdey sekali lagii mmmuahhhh",

  // ----------------------------------------------------------------
  // 🎵 AUDIO — isi path file musikmu (contoh: "music/lagu.mp3")
  //    Kosongkan bgMusic: "" untuk tidak ada musik latar.
  //    soundBite adalah sound efek saat gigit kue (boleh dikosongkan juga).
  // ----------------------------------------------------------------
  bgMusic:   "music/love.mp3",   // contoh: "music/lagu.mp3"
  soundBite: "music/yum.mp3",   // contoh: "music/bite.mp3"
};

/* ================================================================
   SETUP
   ================================================================ */
const STEPS = ['opening', 'letter', 'gallery', 'cake', 'final'];
let currentStep = 0;

/* ================================================================
   AUDIO
   ================================================================ */
let bgAudio   = null;
let biteAudio = null;

function initAudio() {
  if (CONFIG.bgMusic) {
    bgAudio        = new Audio(CONFIG.bgMusic);
    bgAudio.loop   = true;
    bgAudio.volume = 0.45;
  }
  if (CONFIG.soundBite) {
    biteAudio        = new Audio(CONFIG.soundBite);
    biteAudio.volume = 0.7;
  }
}

function playBgMusic() {
  if (!bgAudio) return;
  bgAudio.currentTime = 0;
  bgAudio.play().catch(() => {});
}

function pauseBgMusic() {
  if (!bgAudio) return;
  bgAudio.pause();
}

function stopBgMusic() {
  if (!bgAudio) return;
  bgAudio.pause();
  bgAudio.currentTime = 0;
}

function playBiteSound() {
  if (!biteAudio) return;
  biteAudio.currentTime = 0;
  biteAudio.play().catch(() => {});
}

function updateMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;
  if (!bgAudio) {
    btn.style.display = 'none';
    return;
  }
  btn.style.display = 'flex';
  btn.textContent   = bgAudio.paused ? '♪' : '♬';
  btn.setAttribute('aria-label', bgAudio.paused ? 'Putar musik' : 'Pause musik');
}

function toggleMusic() {
  if (!bgAudio) return;
  if (bgAudio.paused) {
    bgAudio.play().catch(() => {});
  } else {
    bgAudio.pause();
  }
  updateMusicBtn();
}

initAudio();

/* ================================================================
   PARTICLES
   ================================================================ */
const particleCanvas = document.getElementById('particle-canvas');
const particleCtx    = particleCanvas.getContext('2d');
let particleList     = [];

function resizeParticleCanvas() {
  particleCanvas.width  = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener('resize', resizeParticleCanvas);

function spawnParticles(count = 55) {
  for (let i = 0; i < count; i++) {
    particleList.push({
      x:     Math.random() * particleCanvas.width,
      y:     Math.random() * particleCanvas.height,
      r:     Math.random() * 3 + 1,
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.4 + 0.1,
    });
  }
}
spawnParticles();

function animateParticles() {
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  for (const p of particleList) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -10)                         p.y = particleCanvas.height + 10;
    if (p.x < -10)                         p.x = particleCanvas.width  + 10;
    if (p.x > particleCanvas.width + 10)   p.x = -10;

    particleCtx.beginPath();
    particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    particleCtx.fillStyle = `rgba(78, 130, 104, ${p.alpha})`;
    particleCtx.fill();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ================================================================
   CONFETTI
   ================================================================ */
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx    = confettiCanvas.getContext('2d');
let confettiList     = [];

function resizeConfettiCanvas() {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

const CONFETTI_COLORS = ['#7daa8f', '#b2d4bf', '#5a9e82', '#a8d5b5', '#4e8268', '#d9ede1', '#c4a882'];

function burstConfetti(count = 160, originYFrac = 0.4) {
  for (let i = 0; i < count; i++) {
    confettiList.push({
      x:     confettiCanvas.width / 2 + (Math.random() - 0.5) * 200,
      y:     confettiCanvas.height * originYFrac,
      vx:    (Math.random() - 0.5) * 10,
      vy:    Math.random() * -12 - 3,
      size:  Math.random() * 7 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot:   Math.random() * Math.PI * 2,
      vrot:  (Math.random() - 0.5) * 0.25,
      life:  0,
    });
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (const p of confettiList) {
    p.vy  += 0.28;
    p.x   += p.vx;
    p.y   += p.vy;
    p.rot += p.vrot;
    p.life++;

    const alpha = Math.max(0, 1 - p.life / 180);
    confettiCtx.save();
    confettiCtx.globalAlpha = alpha;
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rot);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
    confettiCtx.restore();
  }
  confettiList = confettiList.filter(p => p.life < 180 && p.y < confettiCanvas.height + 60);
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

/* ================================================================
   PROGRESS DOTS
   ================================================================ */
const STEP_LABELS = [
  '— mini surprise —',
  '— love letter —',
  '— our moments —',
  '— mini game —',
  '— last but not least —',
];

function renderProgress(idx) {
  const wrap = document.getElementById('progress');
  const dots = STEPS.map((_, i) => {
    const cls = i === idx ? 'active' : i < idx ? 'done' : '';
    return `<div class="progress-dot ${cls}"></div>`;
  }).join('');

  wrap.innerHTML = `
    <div class="progress-dots">${dots}</div>
    <span class="progress-label">${STEP_LABELS[idx]}</span>
  `;
}

/* ================================================================
   NAVIGASI
   ================================================================ */
function goTo(stepName, cb) {
  const idx     = STEPS.indexOf(stepName);
  const current = document.getElementById(`stage-${STEPS[currentStep]}`);
  const next    = document.getElementById(`stage-${stepName}`);

  current.classList.add('fade-out');
  current.addEventListener('animationend', () => {
    current.hidden = true;
    current.classList.remove('fade-out');

    next.hidden = false;
    next.classList.add('fade-in');
    next.addEventListener('animationend', () => {
      next.classList.remove('fade-in');
      if (cb) cb();
    }, { once: true });

    currentStep = idx;
    renderProgress(idx);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, { once: true });
}

/* ================================================================
   RENDER KONTEN DARI CONFIG
   ================================================================ */
function renderContent() {

  /* --- Halaman 2: Surat --- */
  document.getElementById('letter-date').textContent     = CONFIG.tanggal;
  document.getElementById('letter-greeting').textContent = `Buat ${CONFIG.nama} my love,`;

  const bodyEl = document.getElementById('letter-body');
  bodyEl.innerHTML = CONFIG.surat
    .map((p, i) => `<p style="animation-delay: ${i * 0.3 + 0.1}s">${p}</p>`)
    .join('');

  document.getElementById('letter-signoff').innerHTML =
    `${CONFIG.tandaTanganSurat}<br><em>${CONFIG.pengirim}</em>`;

  /* --- Halaman 3: Galeri --- */
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = CONFIG.foto.map(f => `
    <div class="polaroid">
      <div class="polaroid-photo">
        ${f.url ? `<img src="${f.url}" alt="${f.caption}">` : '🖼️'}
      </div>
      <span class="polaroid-caption">${f.caption}</span>
    </div>
  `).join('');

  /* --- Halaman 4: Foto cinta --- */
  const revealFrame = document.getElementById('reveal-frame');
  revealFrame.innerHTML = CONFIG.fotoCinta.url
    ? `<img src="${CONFIG.fotoCinta.url}" alt="foto cinta">`
    : `<div class="reveal-fallback">🤍</div>`;
  document.getElementById('reveal-caption').textContent = CONFIG.fotoCinta.caption;

  /* --- Halaman 5: Penutup --- */
  const finalDeco = document.getElementById('final-deco');
  if (CONFIG.fotoFinal.url) {
    finalDeco.innerHTML = `<img src="${CONFIG.fotoFinal.url}" alt="${CONFIG.fotoFinal.alt}">`;
    finalDeco.classList.add('has-photo');
  }
  document.getElementById('final-text').textContent    = CONFIG.penutup;
  document.getElementById('pengirim-mark').textContent = `— FULL OF UR LOVE, ${CONFIG.pengirim}`;
}

/* ================================================================
   LIGHTBOX
   ================================================================ */
const lightbox         = document.getElementById('lightbox');
const lightboxImg      = document.getElementById('lightbox-img');
const lightboxDownload = document.getElementById('lightbox-download');
const lightboxClose    = document.getElementById('lightbox-close');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');

function openLightbox(src, alt = '') {
  lightboxImg.src           = src;
  lightboxImg.alt           = alt;
  lightboxDownload.href     = src;
  lightboxDownload.download = src.split('/').pop() || 'foto.jpg';
  lightbox.hidden           = false;
  lightbox.classList.remove('lb-out');
  lightbox.classList.add('lb-in');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('lb-in');
  lightbox.classList.add('lb-out');
  lightbox.addEventListener('animationend', () => {
    lightbox.hidden              = true;
    lightbox.classList.remove('lb-out');
    document.body.style.overflow = '';
    lightboxImg.src              = '';
  }, { once: true });
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

document.addEventListener('click', e => {
  const img = e.target.closest('.polaroid-photo img, .reveal-frame img');
  if (img) openLightbox(img.src, img.alt);
});

/* ================================================================
   HALAMAN 1 — OPENING: klik kado
   ================================================================ */
const giftEl = document.getElementById('gift-icon');

function handleGift() {
  giftEl.style.animation = 'none';
  giftEl.textContent = '✨';
  burstConfetti(180, 0.45);
  playBgMusic();
  updateMusicBtn();
  setTimeout(() => goTo('letter'), 700);
}

giftEl.addEventListener('click', handleGift);
giftEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') handleGift();
});

/* ================================================================
   HALAMAN 4 — MINI GAME GIGIT KUE
   ================================================================ */
const cakeWrap    = document.getElementById('cake-wrap');
const cakeIcon    = document.getElementById('cake-icon');
const biteCountEl = document.getElementById('bite-count');
const biteBarFill = document.getElementById('bite-bar-fill');
const cakeReveal  = document.getElementById('cake-reveal');
const btnToFinal  = document.getElementById('btn-to-final');

let bites = 0;

const cakeStates = ['🎂', '🎂', '🎂', '🎂', '😋', '🍽️'];

function handleBite() {
  if (bites >= CONFIG.jumlahGigitan) return;
  bites++;

  const stateIdx = Math.min(bites, cakeStates.length - 1);
  cakeIcon.textContent = cakeStates[stateIdx];

  cakeWrap.classList.remove('shake');
  requestAnimationFrame(() => cakeWrap.classList.add('shake'));
  cakeWrap.addEventListener('animationend', () => cakeWrap.classList.remove('shake'), { once: true });

  playBiteSound();

  biteCountEl.textContent = `${bites}/${CONFIG.jumlahGigitan} gigitan`;
  biteBarFill.style.width = `${(bites / CONFIG.jumlahGigitan) * 100}%`;

  if (bites >= CONFIG.jumlahGigitan) {
    biteCountEl.textContent      = 'kuenya habis! 🎉';
    cakeWrap.style.pointerEvents = 'none';
    burstConfetti(140, 0.5);
    setTimeout(() => {
      cakeWrap.style.display = 'none';
      document.getElementById('bite-info').style.display = 'none';
      document.getElementById('cake-headline').textContent = 'This is us in the future';
      cakeReveal.classList.add('show');
      btnToFinal.style.display = 'inline-block';
    }, 600);
  }
}

cakeWrap.addEventListener('click', handleBite);
cakeWrap.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') handleBite();
});

/* ================================================================
   RESTART
   ================================================================ */
function restart() {
  bites = 0;
  cakeIcon.textContent         = cakeStates[0];
  biteCountEl.textContent      = `0/${CONFIG.jumlahGigitan} gigitan`;
  biteBarFill.style.width      = '0%';
  cakeWrap.style.display       = '';
  cakeWrap.style.pointerEvents = '';
  document.getElementById('bite-info').style.display = '';
  cakeReveal.classList.remove('show');
  document.getElementById('cake-headline').innerHTML = 'Gigit kuenya<br><em>sampai habis!</em>';
  btnToFinal.style.display = 'none';

  giftEl.textContent     = '🎁';
  giftEl.style.animation = '';

  stopBgMusic();
  updateMusicBtn();

  STEPS.forEach(s => {
    document.getElementById(`stage-${s}`).hidden = true;
  });
  document.getElementById('stage-opening').hidden = false;
  currentStep = 0;
  renderProgress(0);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ================================================================
   INIT
   ================================================================ */
renderContent();
renderProgress(0);
