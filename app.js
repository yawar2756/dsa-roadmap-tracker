// ============================================================
//  DSA ROADMAP TRACKER — app logic
//  Features: localStorage persistence, live search, status
//  filters, streak counter, backup/restore, confetti, themes
// ============================================================

const KEY = 'dsaTrackerState.v2';
const THEME_KEY = 'dsaTrackerTheme';

// ---------- STATE ----------
let state = loadState();
let currentFilter = 'all';
let currentTopic = null;

function freshState() { return { checked: {}, lastVisit: null, streak: 1 }; }

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && typeof s === 'object' && s.checked) return { ...freshState(), ...s };
  } catch (e) { /* corrupted JSON — start fresh */ }
  return freshState();
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function isDone(topicId, idx) { return !!(state.checked[topicId] && state.checked[topicId].includes(idx)); }

// ---------- STREAK ----------
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastVisit === today) return;
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  state.streak = (state.lastVisit === yesterday) ? (state.streak || 1) + 1 : 1;
  state.lastVisit = today;
  save();
}

// ---------- HELPERS ----------
function findTopic(id) {
  for (const p of ROADMAP_DATA) {
    const t = p.topics.find(t => t.id === id);
    if (t) return t;
  }
  return null;
}
function totalCount(topic) { return topic.learn.length + topic.practice.length; }
function doneCount(topicId, topic) {
  const c = state.checked[topicId] || [];
  return c.filter(i => i < totalCount(topic)).length;
}
function topicPct(topic) {
  return Math.round(100 * doneCount(topic.id, topic) / totalCount(topic));
}
function topicSearchText(t) {
  return (t.name + ' ' + t.why + ' ' + t.learn.map(x => x.join(' ')).join(' ')).toLowerCase();
}
const esc = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');


// ---------- RENDER ROADMAP ----------
function render() {
  const main = document.getElementById('roadmap');
  main.innerHTML = ROADMAP_DATA.map(phase => {
    const pid = phase.title.replace(/\W+/g, '_');
    return `
    <div class="phase" data-phase="${pid}">
      <div class="phase-head">
        <div class="phase-num">${phase.phase.split(' ')[1]}</div>
        <div class="phase-info">
          <h2>${phase.title}</h2>
          <p>${phase.time}</p>
        </div>
        <div class="phase-badge" id="badge-${pid}"></div>
      </div>
      <div class="topics">
        ${phase.topics.map(t => `
          <div class="topic" id="card-${t.id}" data-id="${t.id}" onclick="openTopic('${t.id}')">
            <div class="checkmark">✓</div>
            <span class="icon">${t.icon}</span>
            <h3>${esc(t.name)}</h3>
            <div class="meta">
              <span>🕐 ${t.time}</span>
              <span class="pct" id="pct-${t.id}">0%</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
  refreshAll();
}

// ---------- PROGRESS / STATS ----------
function refreshAll() {
  let total = 0, done = 0, topicsDone = 0, topicsTotal = 0;

  ROADMAP_DATA.forEach(phase => {
    let pDone = 0, pTotal = 0;
    const pid = phase.title.replace(/\W+/g, '_');

    phase.topics.forEach(t => {
      const d = doneCount(t.id, t), n = totalCount(t);
      pDone += d; pTotal += n;
      const pct = Math.round(100 * d / n);

      const card = document.getElementById('card-' + t.id);
      if (card) {
        card.classList.toggle('completed', pct === 100);
        const pctEl = document.getElementById('pct-' + t.id);
        pctEl.textContent = pct + '%';
        pctEl.classList.toggle('full', pct === 100);
      }
      topicsTotal++;
      if (pct === 100) topicsDone++;
    });

    total += pTotal; done += pDone;
    const badge = document.getElementById('badge-' + pid);
    if (badge) {
      const pp = Math.round(100 * pDone / Math.max(pTotal, 1));
      badge.textContent = pp === 100 ? '✓ Complete' : pp + '% complete';
      badge.classList.toggle('done', pp === 100);
    }
  });

  const pct = Math.round(100 * done / Math.max(total, 1));
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '%';
  document.getElementById('progressText').textContent = `${done} of ${total} checkpoints completed`;
  document.getElementById('statPct').textContent = pct + '%';
  document.getElementById('statTopics').textContent = `${topicsDone}/${topicsTotal}`;
  document.getElementById('statSubs').textContent = `${done}/${total}`;
  document.getElementById('statStreak').textContent = `🔥 ${state.streak || 1}`;

  applyFilter();
}

// ---------- SEARCH + FILTER ----------
function applyFilter() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  document.getElementById('clearSearch').hidden = !q;

  ROADMAP_DATA.forEach(phase => {
    let visible = 0;
    phase.topics.forEach(t => {
      const card = document.getElementById('card-' + t.id);
      const pct = topicPct(t);
      let show = true;
      if (currentFilter === 'todo') show = pct === 0;
      else if (currentFilter === 'active') show = pct > 0 && pct < 100;
      else if (currentFilter === 'done') show = pct === 100;
      if (show && q) show = topicSearchText(t).includes(q);
      card.classList.toggle('hidden-card', !show);
      if (show) visible++;
    });
    const pid = phase.title.replace(/\W+/g, '_');
    const phaseEl = document.querySelector(`[data-phase="${pid}"]`);
    if (phaseEl) phaseEl.style.display = visible === 0 ? 'none' : '';
  });
}

document.getElementById('searchInput').addEventListener('input', applyFilter);
document.getElementById('clearSearch').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  applyFilter();
});
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentFilter = chip.dataset.filter;
    applyFilter();
  });
});

// ---------- MODAL ----------
function openTopic(id) {
  const t = findTopic(id);
  if (!t) return;
  currentTopic = t;
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-head">
      <span class="icon">${t.icon}</span>
      <div>
        <h3>${esc(t.name)}</h3>
        <div class="sub">🕐 ${t.time} estimated</div>
      </div>
      <button class="close-btn" onclick="closeModal()" aria-label="Close">✕</button>
    </div>
    <div class="modal-body">
      <div class="why-box"><strong>Why learn this:</strong> ${t.why}</div>

      <div class="section-title">📚 What to learn</div>
      ${t.learn.map((item, i) => `
        <label class="check-item">
          <input type="checkbox" ${isDone(t.id, i) ? 'checked' : ''}
                 onchange="toggleItem('${t.id}', ${i}, this, false)">
          <span class="txt">${esc(item[0])}<small>${esc(item[1])}</small></span>
        </label>`).join('')}

      <div class="section-title">💻 Practice problems</div>
      ${t.practice.map((p, i) => {
        const gi = t.learn.length + i;
        return `
        <label class="prob-item ${isDone(t.id, gi) ? 'done' : ''}" id="prob-${t.id}-${gi}">
          <span class="name"><input type="checkbox" ${isDone(t.id, gi) ? 'checked' : ''}
                 onchange="toggleItem('${t.id}', ${gi}, this, true)"> ${esc(p[0])}</span>
          <span class="diff ${p[1]}">${p[1]}</span>
        </label>`;
      }).join('')}

      <div class="tip-box"><strong>💡 Tip:</strong> ${t.tip}</div>
    </div>
    <div class="modal-foot">
      <span class="modal-pct" id="modalPct"></span>
      <button class="complete-btn" onclick="markAll('${t.id}')">✓ Mark everything learned</button>
    </div>`;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  updateModalPct();
}
function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
  currentTopic = null;
}
function toggleItem(id, i, el, isProb) {
  const t = findTopic(id);
  const wasComplete = topicPct(t) === 100;
  (state.checked[id] = state.checked[id] || []);
  if (el.checked) { if (!state.checked[id].includes(i)) state.checked[id].push(i); }
  else state.checked[id] = state.checked[id].filter(x => x !== i);
  save();
  if (isProb) {
    const row = document.getElementById(`prob-${id}-${i}`);
    if (row) row.classList.toggle('done', el.checked);
  }
  refreshAll();
  updateModalPct();
  if (!wasComplete && topicPct(t) === 100) { confetti(); toast(`🎉 ${t.name} complete!`); }
}
function markAll(id) {
  const t = findTopic(id);
  state.checked[id] = Array.from({ length: totalCount(t) }, (_, i) => i);
  save(); refreshAll(); openTopic(id); confetti(); toast(`🎉 ${t.name} complete!`);
}
function updateModalPct() {
  if (!currentTopic) return;
  const t = currentTopic;
  const d = doneCount(t.id, t), n = totalCount(t);
  const pct = Math.round(100 * d / n);
  const el = document.getElementById('modalPct');
  if (el) {
    el.textContent = `Topic progress: ${d}/${n} (${pct}%)`;
    el.classList.toggle('full', pct === 100);
  }
}

// ---------- BACKUP / RESTORE ----------
function exportProgress() {
  const payload = {
    app: 'dsa-roadmap-tracker', version: 2,
    exportedAt: new Date().toISOString(),
    checked: state.checked
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `dsa-progress-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('📦 Backup downloaded');
}
function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data.checked || typeof data.checked !== 'object') throw new Error('bad file');
      if (!confirm('Restore this backup? It will REPLACE your current progress.')) return;
      state.checked = data.checked;
      save(); refreshAll();
      toast('✅ Progress restored');
    } catch (e) { alert('Invalid backup file — please choose a file exported from this app.'); }
  };
  reader.readAsText(file);
}
document.getElementById('exportBtn').addEventListener('click', exportProgress);
document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change', e => {
  if (e.target.files[0]) importProgress(e.target.files[0]);
  e.target.value = '';
});
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Reset ALL progress? This cannot be undone (unless you made a backup).')) {
    state = freshState(); save(); refreshAll(); toast('↺ Progress reset');
  }
});

// ---------- THEME ----------
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}
document.getElementById('themeBtn').addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});
setTheme(localStorage.getItem(THEME_KEY) || 'dark');

// ---------- CONFETTI + TOAST ----------
function confetti() {
  const colors = ['#6366f1', '#22d3ee', '#34d399', '#fbbf24', '#f87171'];
  for (let i = 0; i < 45; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    c.style.animationDelay = (Math.random() * 0.4) + 's';
    if (Math.random() > 0.5) c.style.borderRadius = '50%';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3800);
  }
}
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

// ---------- MISC ----------
document.getElementById('overlay').addEventListener('click', e => { if (e.target.id === 'overlay') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
window.addEventListener('scroll', () => {
  document.getElementById('scrollTop').hidden = window.scrollY < 400;
});
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- INIT ----------
updateStreak();
render();
