/* ── CivicIQ App Logic ── */

// ── State ──
const state = {
  country: null, exp: null, mode: null,
  xp: 0, level: 0, streak: 0,
  badgesEarned: [], levelsUnlocked: [0],
  quizPending: false, currentQuizLevel: -1,
  usedFacts: []  // tracks indices of already-shown fun facts
};

// ── DOM refs ──
const $ = id => document.getElementById(id);

// ── Particles ──
function initParticles() {
  const canvas = $('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() * 2 + 0.5, vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3, a: Math.random()
    });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,102,241,${p.a * 0.6})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = innerWidth;
      if (p.x > innerWidth) p.x = 0;
      if (p.y < 0) p.y = innerHeight;
      if (p.y > innerHeight) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Onboarding ──
function initOnboarding() {
  document.querySelectorAll('.country-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.country = btn.dataset.country;
      checkStartReady();
    });
  });
  document.querySelectorAll('.exp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.exp-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.exp = btn.dataset.exp;
      checkStartReady();
    });
  });
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.mode = btn.dataset.mode;
      checkStartReady();
    });
  });
  $('start-btn').addEventListener('click', startApp);
}

function checkStartReady() {
  const ready = state.country && state.exp && state.mode;
  $('start-btn').disabled = !ready;
  $('start-btn').querySelector('#start-btn-text').textContent = ready
    ? `Start Learning in ${state.country} ${COUNTRY_DATA[state.country].flag} →`
    : 'Select all options to begin →';
}

function startApp() {
  $('screen-welcome').classList.remove('active');
  $('screen-main').classList.add('active');
  updateSidebar();
  buildStepDots();
  startLevel(0);
}

// ── Sidebar ──
function updateSidebar() {
  const cd = COUNTRY_DATA[state.country];
  $('profile-country').textContent = `${cd.flag} ${cd.name}`;
  $('profile-mode').textContent = `${modeLabel()} · ${expLabel()}`;
  $('mode-tag').textContent = `${modeEmoji()} ${modeLabel()}`;
  updateXP();
}

function modeLabel() { return {quick:'Quick',deep:'Deep Dive',interactive:'Interactive'}[state.mode]; }
function modeEmoji() { return {quick:'⚡',deep:'🔬',interactive:'🎮'}[state.mode]; }
function expLabel() { return {beginner:'Beginner',intermediate:'Learner',advanced:'Advanced'}[state.exp]; }

function updateXP() {
  const max = 500;
  $('xp-display').textContent = `${state.xp} / ${max}`;
  $('xp-fill').style.width = `${Math.min((state.xp / max) * 100, 100)}%`;
  const lvlNames = ['Rookie Voter','Registered Citizen','Campaign Follower','Active Voter','Democracy Champion'];
  const lvl = Math.min(Math.floor(state.xp / 100), 4);
  $('current-level').textContent = lvl + 1;
  $('level-name').textContent = lvlNames[lvl] || 'Democracy Champion';
  $('streak-tag').textContent = `🔥 ${state.streak} streak`;
}

// ── Step Dots ──
function buildStepDots() {
  const container = $('step-dots');
  container.innerHTML = '';
  LEVELS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'step-dot' + (i === 0 ? ' active' : '');
    dot.id = `dot-${i}`;
    container.appendChild(dot);
  });
}

function updateStepDots(current) {
  LEVELS.forEach((_, i) => {
    const dot = $(`dot-${i}`);
    if (!dot) return;
    dot.className = 'step-dot';
    if (i < current) dot.classList.add('done');
    else if (i === current) dot.classList.add('active');
  });
  $('step-label').textContent = `Step ${current + 1}/${LEVELS.length}`;
}

// ── Level Nav ──
function unlockLevel(lvlId) {
  if (!state.levelsUnlocked.includes(lvlId)) state.levelsUnlocked.push(lvlId);
  const navIds = ['nav-intro','nav-registration','nav-campaign','nav-voting','nav-counting'];
  const btn = $(navIds[lvlId]);
  if (btn) {
    btn.classList.remove('locked');
    btn.querySelector('.nav-badge').textContent = '→';
    btn.addEventListener('click', () => startLevel(lvlId));
  }
}

function setActiveNav(lvlId) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const navIds = ['nav-intro','nav-registration','nav-campaign','nav-voting','nav-counting'];
  const btn = $(navIds[lvlId]);
  if (btn) {
    btn.classList.add('active');
    const badge = btn.querySelector('.nav-badge');
    if (badge) badge.textContent = '✓';
    badge && badge.classList.add('unlocked');
  }
}

// ── Chat ──
function addMessage(html, role='bot') {
  const msgs = $('chat-messages');
  const wrap = document.createElement('div');
  wrap.className = `msg ${role}`;
  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'bot' ? '🗳️' : '👤';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = mdToHtml(html);
  const time = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  wrap.appendChild(avatar);
  const inner = document.createElement('div');
  inner.style.display = 'flex';
  inner.style.flexDirection = 'column';
  inner.appendChild(bubble);
  inner.appendChild(time);
  wrap.appendChild(inner);
  msgs.appendChild(wrap);
  $('chat-container').scrollTop = $('chat-container').scrollHeight;
}

function showTyping() {
  const msgs = $('chat-messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.id = 'typing-indicator';
  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = '🗳️';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  msgs.appendChild(wrap);
  $('chat-container').scrollTop = $('chat-container').scrollHeight;
}

function removeTyping() {
  const t = $('typing-indicator');
  if (t) t.remove();
}

function addBotMessage(html, delay = 600) {
  return new Promise(resolve => {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(html, 'bot');
      resolve();
    }, delay);
  });
}

// ── Markdown-lite ──
function mdToHtml(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^# (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^> (.*?)$/gm, '<div class="highlight">$1</div>')
    .replace(/^\- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n{2,}/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// ── Quick Actions ──
function setQuickActions(actions) {
  const qa = $('quick-actions');
  qa.innerHTML = '';
  actions.forEach(({ label, value }) => {
    const btn = document.createElement('button');
    btn.className = 'qa-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => handleUserInput(value));
    qa.appendChild(btn);
  });
}

// ── Fun Fact Picker (no repeats until all shown) ──
function pickFunFact(factsArray) {
  // filter out already-used indices
  const available = factsArray
    .map((_, i) => i)
    .filter(i => !state.usedFacts.includes(i));
  // if all used, reset and start fresh
  if (available.length === 0) {
    state.usedFacts = [];
    available.push(...factsArray.map((_, i) => i));
  }
  const pick = available[Math.floor(Math.random() * available.length)];
  state.usedFacts.push(pick);
  return factsArray[pick];
}

// ── Level Flow ──
async function startLevel(lvlId) {
  state.level = lvlId;
  setActiveNav(lvlId);
  updateStepDots(lvlId);
  const lvl = LEVELS[lvlId];
  const cd = COUNTRY_DATA[state.country];
  const content = CONTENT[lvlId][state.mode] || CONTENT[lvlId].quick;

  await addBotMessage(
    `<span class="step-tag">Step ${lvlId + 1}/5 — ${lvl.title}</span>\n\n` + content
  );

  if (state.mode === 'interactive') {
    setQuickActions([
      { label: '▶ Continue', value: 'continue' },
      { label: '🔍 More detail', value: 'more detail' },
      { label: '📖 Glossary', value: 'show glossary' },
      { label: '🌍 Compare', value: 'compare countries' }
    ]);
  } else {
    setQuickActions([
      { label: '▶ Continue', value: 'continue' },
      { label: '❓ Ask question', value: '' },
      { label: '📊 Show timeline', value: 'show timeline' },
      { label: '🌍 Compare', value: 'compare countries' }
    ]);
  }

  await addBotMessage(
    `📍 **${cd.flag} ${cd.name} context:** ${cd.steps[lvlId] || cd.steps[0]}\n\n` +
    `> 💡 *Did you know? ${pickFunFact(cd.funFacts)}*\n\n` +
    `Type **"continue"** to proceed to the mini-quiz, or ask any question!`
  , 1200);
}

async function finishLevel(lvlId) {
  const lvl = LEVELS[lvlId];
  addXP(lvl.xp);
  state.streak++;
  updateXP();
  unlockLevel(Math.min(lvlId + 1, 4));
  showQuiz(lvlId);
}

function addXP(amount) {
  state.xp = Math.min(state.xp + amount, 500);
  updateXP();
  // flash xp bar
  const fill = $('xp-fill');
  fill.style.boxShadow = '0 0 12px rgba(99,102,241,.8)';
  setTimeout(() => fill.style.boxShadow = '', 1000);
}

// ── Quiz ──
function showQuiz(lvlId) {
  const quiz = QUIZZES[lvlId];
  if (!quiz) return;
  state.quizPending = true;
  state.currentQuizLevel = lvlId;

  $('quiz-level-tag').textContent = `Level ${lvlId + 1} Quiz`;
  $('quiz-title').textContent = `Quick Check! 🧠`;
  $('quiz-question').textContent = quiz.q;

  const opts = $('quiz-options');
  opts.innerHTML = '';
  quiz.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = `${['A','B','C','D'][i]}. ${opt}`;
    btn.addEventListener('click', () => answerQuiz(i, quiz, btn));
    opts.appendChild(btn);
  });

  $('quiz-feedback').className = 'quiz-feedback';
  $('quiz-feedback').textContent = '';
  $('quiz-next-btn').style.display = 'none';
  $('quiz-overlay').classList.add('active');
}

function answerQuiz(chosen, quiz, btn) {
  document.querySelectorAll('.quiz-opt').forEach(b => b.style.pointerEvents = 'none');
  const correct = chosen === quiz.ans;
  btn.classList.add(correct ? 'correct' : 'wrong');
  if (!correct) {
    document.querySelectorAll('.quiz-opt')[quiz.ans].classList.add('correct');
  }
  const fb = $('quiz-feedback');
  fb.textContent = (correct ? '✅ Correct! ' : '❌ Not quite. ') + quiz.exp;
  fb.className = 'quiz-feedback show';
  if (correct) addXP(25);
  $('quiz-next-btn').style.display = 'block';
}

$('quiz-next-btn').addEventListener('click', () => {
  $('quiz-overlay').classList.remove('active');
  const lvlId = state.currentQuizLevel;
  state.quizPending = false;
  awardBadge(lvlId);
});

// ── Badge ──
function awardBadge(lvlId) {
  const lvl = LEVELS[lvlId];
  if (state.badgesEarned.includes(lvlId)) {
    proceedAfterBadge(lvlId);
    return;
  }
  state.badgesEarned.push(lvlId);
  const badgeEl = $(`badge-${lvlId}`);
  if (badgeEl) { badgeEl.classList.remove('locked'); badgeEl.classList.add('earned'); }

  $('badge-burst').textContent = lvl.badge;
  $('badge-award-title').textContent = `Badge Unlocked!`;
  $('badge-award-sub').textContent = `You earned: ${lvl.badge} "${lvl.badgeName}"`;
  $('badge-overlay').classList.add('active');
}

$('badge-close-btn').addEventListener('click', () => {
  $('badge-overlay').classList.remove('active');
  proceedAfterBadge(state.currentQuizLevel);
});

async function proceedAfterBadge(lvlId) {
  const next = lvlId + 1;
  if (next < LEVELS.length) {
    await addBotMessage(
      `🎉 Level ${lvlId + 1} complete! You earned the **${LEVELS[lvlId].badge} ${LEVELS[lvlId].badgeName}** badge!\n\n` +
      `Ready for **Level ${next + 1}: ${LEVELS[next].title}**?\n\nType **"continue"** or click ▶ below.`
    );
    setQuickActions([
      { label: `▶ Level ${next + 1}: ${LEVELS[next].title}`, value: 'continue' },
      { label: '🔄 Replay this level', value: 'replay' },
      { label: '🌍 Compare countries', value: 'compare countries' }
    ]);
    state.level = lvlId; // will advance on "continue"
  } else {
    await addBotMessage(
      `🏆 **Congratulations! You've completed all 5 levels!**\n\n` +
      `You are now a **Democracy Champion** 🏆\n\n` +
      `**Your stats:**\n- ⚡ XP Earned: ${state.xp}\n- 🔥 Streak: ${state.streak}\n- 🏅 Badges: ${state.badgesEarned.length}/5\n\n` +
      `Use the sidebar tools to explore more — compare countries, check the glossary, or try the checklist!`
    );
    setQuickActions([
      { label: '📋 First Vote Checklist', value: 'checklist' },
      { label: '🌍 Compare Countries', value: 'compare countries' },
      { label: '📖 Glossary', value: 'show glossary' },
      { label: '↩ Restart', value: 'restart' }
    ]);
  }
}

// ── User Input Handling ──
async function handleUserInput(text) {
  if (!text.trim()) return;
  addMessage(text, 'user');
  $('user-input').value = '';

  const t = text.toLowerCase().trim();

  if (t === 'restart') { location.reload(); return; }

  if (t.includes('compare') || t.includes('countries')) {
    showTool('compare'); return;
  }
  if (t.includes('checklist')) { showTool('checklist'); return; }
  if (t.includes('eligible')) { showTool('eligible'); return; }
  if (t.includes('compare') || t.includes('countries')) { showTool('compare'); return; }
  if (t.includes('glossary') || t.includes('terms')) { showTool('glossary'); return; }
  if (t.includes("do's") || t.includes('dos') || t.includes("don't")) { showTool('dos'); return; }
  if (t.includes('2024') || t.includes('demo') || t.includes('lok sabha') || t.includes('real example')) { showTool('demo2024'); return; }
  if (t.includes('parliament') || t.includes('rajya') || t.includes('indian system') || t.includes('mla') || t.includes('mp ') || t.includes('prime minister') || t.includes('president of india')) { showTool('indiansystem'); return; }

  if (t === 'continue' || t === '▶' || t === 'next') {
    const next = state.level + 1;
    if (next < LEVELS.length && state.levelsUnlocked.includes(state.level)) {
      await finishLevel(state.level);
    } else if (state.levelsUnlocked.includes(state.level)) {
      await finishLevel(state.level);
    } else {
      await addBotMessage('Complete the current level first! Type **"continue"** when ready.');
    }
    return;
  }

  if (t === 'replay') {
    await startLevel(state.level);
    return;
  }

  if (t.includes('timeline')) {
    const cd = COUNTRY_DATA[state.country];
    const steps = cd.steps.map((s, i) => `**Step ${i+1}:** ${s}`).join('\n');
    await addBotMessage(`📅 **Election Timeline — ${cd.flag} ${cd.name}**\n\n${steps}`);
    return;
  }

  if (t.includes('more detail') || t.includes('explain more') || t.includes('elaborate')) {
    const deepContent = CONTENT[state.level]?.deep || CONTENT[state.level]?.quick;
    await addBotMessage(`🔬 **Detailed View — ${LEVELS[state.level].title}**\n\n${deepContent}`);
    return;
  }

  if (t.includes('evm') || t.includes('ballot') || t.includes('constituency') || t.includes('vvpat')) {
    const cd = COUNTRY_DATA[state.country];
    const terms = cd.terms;
    const keyword = Object.keys(terms).find(k => t.includes(k.toLowerCase()));
    if (keyword) {
      await addBotMessage(`📖 **${keyword}:** ${terms[keyword]}`);
    } else {
      await addBotMessage(`📖 Check the **Glossary** for election terms! Click the 📖 Glossary button in the sidebar.`);
    }
    return;
  }

  if (t.includes('what if') || t.includes('scenario')) {
    const scenarios = [
      "**What if I miss election day?** → You cannot vote after polling closes. In India, there's no absentee/postal vote for general public. Plan ahead!",
      "**What if I lost my Voter ID?** → You can still vote with 12 other approved documents like Aadhaar, Passport, or PAN card.",
      "**What if there's a tie?** → In India, a draw of lots decides. In the UK, the Returning Officer draws straws. Very rare!",
      "**What if I'm abroad on election day?** → India doesn't allow overseas voting for most citizens yet. USA allows absentee ballots for citizens abroad."
    ];
    const pick = scenarios[Math.floor(Math.random() * scenarios.length)];
    await addBotMessage(`🤔 **What If? Scenario**\n\n${pick}`);
    return;
  }

  // Fallback to Gemini API Chatbot
  addMessage('', 'model', true); // Show typing indicator
  try {
    const res = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: [] }) // Note: You can expand this to pass conversation history
    });

    const data = await res.json();
    
    // Remove typing indicator and show response
    const msgs = document.querySelectorAll('.message.model');
    const lastMsg = msgs[msgs.length - 1];
    if (lastMsg && lastMsg.innerHTML.includes('...')) {
      lastMsg.remove(); 
    }

    if (res.ok) {
      await addBotMessage(`🤖 **Gemini AI:**\n\n${data.reply}`);
    } else {
      await addBotMessage('⚠️ Sorry, the AI is having trouble right now. Try another election question!');
    }
  } catch (err) {
    console.error("Chat Error:", err);
    await addBotMessage('⚠️ Network error. Please ensure the backend server is running on port 3001.');
  }
}

// ── Sidebar Tools ──
function showTool(toolKey) {
  const tool = TOOLS[toolKey];
  if (!tool) return;
  $('tool-content').innerHTML = tool.content;
  $('tool-overlay').classList.add('active');
}

$('tool-close-btn').addEventListener('click', () => $('tool-overlay').classList.remove('active'));
$('tool-overlay').addEventListener('click', e => { if (e.target === $('tool-overlay')) $('tool-overlay').classList.remove('active'); });

$('tool-checklist').addEventListener('click', () => showTool('checklist'));
$('tool-eligible').addEventListener('click', () => showTool('eligible'));
$('tool-compare').addEventListener('click', () => showTool('compare'));
$('tool-glossary').addEventListener('click', () => showTool('glossary'));
$('tool-dos').addEventListener('click', () => showTool('dos'));
$('tool-demo2024').addEventListener('click', () => showTool('demo2024'));
$('tool-indiansystem').addEventListener('click', () => showTool('indiansystem'));

// ── Send Input ──
$('send-btn').addEventListener('click', () => handleUserInput($('user-input').value));
$('user-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleUserInput($('user-input').value); }
});
$('user-input').addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// ── Sidebar Toggle ──
$('sidebar-toggle').addEventListener('click', () => $('sidebar').classList.toggle('collapsed'));
$('sidebar-toggle-mobile').addEventListener('click', () => $('sidebar').classList.toggle('mobile-open'));

// ── Restart ──
$('restart-btn').addEventListener('click', () => { if (confirm('Start over? Your progress will reset.')) location.reload(); });

// ── Init ──
initParticles();
initOnboarding();
