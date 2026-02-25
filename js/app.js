const root = document.body;
const themeToggle = document.getElementById('themeToggle');
const langSelect = document.getElementById('langSelect');
const testTimer = document.getElementById('testTimer');
const startMockBtn = document.getElementById('startMockBtn');

const i18n = {
  mr: {
    slogan: 'तुमच्या यशाचा डिजिटल साथीदार',
    ctaStart: 'शिकायला सुरुवात करा',
    ctaJoin: 'फ्री क्लास जॉइन करा',
    quote: '“दररोजचा छोटा अभ्यास उद्याचा मोठा विजय ठरतो.”'
  },
  hi: {
    slogan: 'आपकी सफलता का डिजिटल साथी',
    ctaStart: 'सीखना शुरू करें',
    ctaJoin: 'फ्री क्लास जॉइन करें',
    quote: '“रोज़ की छोटी पढ़ाई ही बड़ी जीत बनती है।”'
  },
  en: {
    slogan: 'Your digital partner for success',
    ctaStart: 'Start Learning',
    ctaJoin: 'Join Free Class',
    quote: '“Small daily study leads to big success.”'
  }
};

const setTheme = (theme) => {
  root.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
};

const applyLang = (lang) => {
  const dict = i18n[lang] || i18n.mr;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });
  localStorage.setItem('lang', lang);
};

const animateCounters = () => {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const tick = () => {
      value += step;
      if (value >= target) value = target;
      el.textContent = el.dataset.suffix ? `${value}${el.dataset.suffix}` : `${value}`;
      if (value < target) requestAnimationFrame(tick);
    };
    tick();
  });
};

const drawGraph = () => {
  const c = document.getElementById('progressGraph');
  if (!c) return;
  const ctx = c.getContext('2d');
  const points = [42, 53, 61, 58, 70, 78, 87, 92];
  const { width, height } = c;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#1e66f5';
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((v, i) => {
    const x = (i / (points.length - 1)) * (width - 24) + 12;
    const y = height - (v / 100) * (height - 24) - 12;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
};

const startTimer = () => {
  if (!testTimer) return;
  let left = 30 * 60;
  const interval = setInterval(() => {
    left -= 1;
    const m = String(Math.floor(left / 60)).padStart(2, '0');
    const s = String(left % 60).padStart(2, '0');
    testTimer.textContent = `${m}:${s}`;
    if (left <= 0) {
      clearInterval(interval);
      testTimer.textContent = '00:00';
    }
  }, 1000);
};

startMockBtn?.addEventListener('click', startTimer);
themeToggle?.addEventListener('click', () => setTheme(root.classList.contains('dark') ? 'light' : 'dark'));
langSelect?.addEventListener('change', (e) => applyLang(e.target.value));

setTheme(localStorage.getItem('theme') || 'light');
const lang = localStorage.getItem('lang') || 'mr';
if (langSelect) langSelect.value = lang;
applyLang(lang);
animateCounters();
drawGraph();
