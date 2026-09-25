// ============================================================
// DSA ROADMAP TRACKER - Application Logic
// Features: progress tracking, search, filters, streaks,
// backup/restore, themes, confetti, responsive modal UI.
// ============================================================

const STORAGE_KEY = "dsaTrackerState.v3";
const THEME_KEY = "dsaTrackerTheme";

let state = loadState();
let currentFilter = "all";
let currentTopic = null;

// -------------------- STATE --------------------
function createFreshState() {
  return {
    checked: {},
    lastVisit: null,
    streak: 1
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object" && saved.checked) {
      return { ...createFreshState(), ...saved };
    }
  } catch (error) {
    console.warn("Saved progress could not be loaded. Starting with fresh progress.", error);
  }

  return createFreshState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isDone(topicId, itemIndex) {
  return Array.isArray(state.checked[topicId]) && state.checked[topicId].includes(itemIndex);
}

// -------------------- SAFE HTML --------------------
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// -------------------- STREAK --------------------
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);

  if (state.lastVisit === today) {
    return;
  }

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  state.streak = state.lastVisit === yesterday ? (state.streak || 1) + 1 : 1;
  state.lastVisit = today;
  saveState();
}

// -------------------- ROADMAP HELPERS --------------------
function findTopic(topicId) {
  for (const phase of ROADMAP_DATA) {
    const topic = phase.topics.find((item) => item.id === topicId);
    if (topic) {
      return topic;
    }
  }

  return null;
}

function totalItems(topic) {
  return topic.learn.length + topic.practice.length;
}

function completedItems(topic) {
  const completed = state.checked[topic.id] || [];
  return completed.filter((index) => index >= 0 && index < totalItems(topic)).length;
}

function topicPercentage(topic) {
  const total = totalItems(topic);
  return total === 0 ? 0 : Math.round((completedItems(topic) / total) * 100);
}

function topicSearchText(topic) {
  const learnText = topic.learn.map((item) => item.join(" ")).join(" ");
  const practiceText = topic.practice.map((item) => item.join(" ")).join(" ");

  return `${topic.name} ${topic.why} ${learnText} ${practiceText}`.toLowerCase();
}

function phaseId(phase) {
  return phase.title.replace(/\W+/g, "_");
}

// -------------------- RENDER ROADMAP --------------------
function renderRoadmap() {
  const roadmap = document.getElementById("roadmap");

  if (!roadmap) {
    console.error("Roadmap container was not found in index.html.");
    return;
  }

  roadmap.innerHTML = ROADMAP_DATA.map((phase) => {
    const id = phaseId(phase);
    const phaseNumber = phase.phase.replace("Phase", "").trim();

    return `
      <section class="phase" data-phase="${id}">
        <div class="phase-head">
          <div class="phase-num">${escapeHtml(phaseNumber)}</div>
          <div class="phase-info">
            <h2>${escapeHtml(phase.title)}</h2>
            <p>${escapeHtml(phase.time)}</p>
          </div>
          <div class="phase-badge" id="badge-${id}">0% complete</div>
        </div>

        <div class="topics">
          ${phase.topics.map((topic) => `
            <button class="topic" id="card-${topic.id}" data-id="${topic.id}" type="button" aria-label="Open ${escapeHtml(topic.name)} roadmap">
              <span class="checkmark">✓</span>
              <span class="icon">${topic.icon}</span>
              <span class="topic-title">${escapeHtml(topic.name)}</span>
              <span class="meta">
                <span>🕐 ${escapeHtml(topic.time)}</span>
                <span class="pct" id="pct-${topic.id}">0%</span>
              </span>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");

  document.querySelectorAll(".topic").forEach((card) => {
    card.addEventListener("click", () => openTopic(card.dataset.id));
  });

  refreshAllProgress();
}

// -------------------- PROGRESS + STATS --------------------
function refreshAllProgress() {
  let checkpointsTotal = 0;
  let checkpointsDone = 0;
  let topicsTotal = 0;
  let topicsDone = 0;

  ROADMAP_DATA.forEach((phase) => {
    let phaseTotal = 0;
    let phaseDone = 0;

    phase.topics.forEach((topic) => {
      const total = totalItems(topic);
      const done = completedItems(topic);
      const percent = topicPercentage(topic);

      checkpointsTotal += total;
      checkpointsDone += done;
      topicsTotal += 1;
      phaseTotal += total;
      phaseDone += done;

      if (percent === 100) {
        topicsDone += 1;
      }

      const card = document.getElementById(`card-${topic.id}`);
      const percentageElement = document.getElementById(`pct-${topic.id}`);

      if (card) {
        card.classList.toggle("completed", percent === 100);
      }

      if (percentageElement) {
        percentageElement.textContent = `${percent}%`;
        percentageElement.classList.toggle("full", percent === 100);
      }
    });

    const phasePercent = phaseTotal === 0 ? 0 : Math.round((phaseDone / phaseTotal) * 100);
    const badge = document.getElementById(`badge-${phaseId(phase)}`);

    if (badge) {
      badge.textContent = phasePercent === 100 ? "✓ Complete" : `${phasePercent}% complete`;
      badge.classList.toggle("done", phasePercent === 100);
    }
  });

  const overallPercent = checkpointsTotal === 0
    ? 0
    : Math.round((checkpointsDone / checkpointsTotal) * 100);

  setText("progressText", `${checkpointsDone} of ${checkpointsTotal} checkpoints completed`);
  setText("progressPct", `${overallPercent}%`);
  setText("statPct", `${overallPercent}%`);
  setText("statTopics", `${topicsDone}/${topicsTotal}`);
  setText("statSubs", `${checkpointsDone}/${checkpointsTotal}`);
  setText("statStreak", `🔥 ${state.streak || 1}`);

  const progressFill = document.getElementById("progressFill");
  if (progressFill) {
    progressFill.style.width = `${overallPercent}%`;
  }

  applySearchAndFilter();
}

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

// -------------------- SEARCH + FILTERS --------------------
function applySearchAndFilter() {
  const searchInput = document.getElementById("searchInput");
  const clearSearchButton = document.getElementById("clearSearch");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  if (clearSearchButton) {
    clearSearchButton.hidden = query.length === 0;
  }

  ROADMAP_DATA.forEach((phase) => {
    let visibleTopics = 0;

    phase.topics.forEach((topic) => {
      const card = document.getElementById(`card-${topic.id}`);
      if (!card) {
        return;
      }

      const percent = topicPercentage(topic);
      let shouldShow = true;

      if (currentFilter === "todo") {
        shouldShow = percent === 0;
      } else if (currentFilter === "active") {
        shouldShow = percent > 0 && percent < 100;
      } else if (currentFilter === "done") {
        shouldShow = percent === 100;
      }

      if (shouldShow && query) {
        shouldShow = topicSearchText(topic).includes(query);
      }

      card.classList.toggle("hidden-card", !shouldShow);

      if (shouldShow) {
        visibleTopics += 1;
      }
    });

    const phaseElement = document.querySelector(`[data-phase="${phaseId(phase)}"]`);
    if (phaseElement) {
      phaseElement.style.display = visibleTopics === 0 ? "none" : "";
    }
  });
}

function setupSearchAndFilters() {
  const searchInput = document.getElementById("searchInput");
  const clearSearchButton = document.getElementById("clearSearch");

  if (searchInput) {
    searchInput.addEventListener("input", applySearchAndFilter);
  }

  if (clearSearchButton) {
    clearSearchButton.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      applySearchAndFilter();
    });
  }

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.dataset.filter || "all";
      applySearchAndFilter();
    });
  });
}

// -------------------- TOPIC MODAL --------------------
function openTopic(topicId) {
  const topic = findTopic(topicId);
  if (!topic) {
    return;
  }

  currentTopic = topic;
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if (!modal || !overlay) {
    return;
  }

  modal.innerHTML = `
    <div class="modal-head">
      <span class="icon">${topic.icon}</span>
      <div>
        <h3>${escapeHtml(topic.name)}</h3>
        <div class="sub">🕐 ${escapeHtml(topic.time)} estimated</div>
      </div>
      <button class="close-btn" id="closeModalBtn" type="button" aria-label="Close topic details">✕</button>
    </div>

    <div class="modal-body">
      <div class="why-box"><strong>Why learn this:</strong> ${escapeHtml(topic.why)}</div>

      <div class="section-title">📚 What to learn</div>
      ${topic.learn.map((item, index) => `
        <label class="check-item">
          <input type="checkbox" data-topic="${topic.id}" data-index="${index}" data-kind="learn" ${isDone(topic.id, index) ? "checked" : ""}>
          <span class="txt">${escapeHtml(item[0])}<small>${escapeHtml(item[1])}</small></span>
        </label>
      `).join("")}

      <div class="section-title">💻 Practice problems</div>
      ${topic.practice.map((item, practiceIndex) => {
        const itemIndex = topic.learn.length + practiceIndex;
        const isCompleted = isDone(topic.id, itemIndex);

        return `
          <label class="prob-item ${isCompleted ? "done" : ""}" id="prob-${topic.id}-${itemIndex}">
            <span class="name">
              <input type="checkbox" data-topic="${topic.id}" data-index="${itemIndex}" data-kind="practice" ${isCompleted ? "checked" : ""}>
              ${escapeHtml(item[0])}
            </span>
            <span class="diff ${escapeHtml(item[1])}">${escapeHtml(item[1])}</span>
          </label>
        `;
      }).join("")}

      <div class="tip-box"><strong>💡 Tip:</strong> ${escapeHtml(topic.tip)}</div>
    </div>

    <div class="modal-foot">
      <span class="modal-pct" id="modalPct"></span>
      <button class="complete-btn" id="markAllBtn" type="button">✓ Mark everything learned</button>
    </div>
  `;

  modal.querySelector("#closeModalBtn").addEventListener("click", closeModal);
  modal.querySelector("#markAllBtn").addEventListener("click", () => markEverythingComplete(topic.id));

  modal.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      toggleCheckpoint(
        checkbox.dataset.topic,
        Number(checkbox.dataset.index),
        checkbox.checked,
        checkbox.dataset.kind === "practice"
      );
    });
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  updateModalProgress();
}

function closeModal() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.remove("open");
  }

  document.body.style.overflow = "";
  currentTopic = null;
}

function toggleCheckpoint(topicId, itemIndex, checked, isPractice) {
  const topic = findTopic(topicId);
  if (!topic) {
    return;
  }

  const topicWasComplete = topicPercentage(topic) === 100;

  if (!Array.isArray(state.checked[topicId])) {
    state.checked[topicId] = [];
  }

  if (checked && !state.checked[topicId].includes(itemIndex)) {
    state.checked[topicId].push(itemIndex);
  }

  if (!checked) {
    state.checked[topicId] = state.checked[topicId].filter((index) => index !== itemIndex);
  }

  saveState();

  if (isPractice) {
    const practiceRow = document.getElementById(`prob-${topicId}-${itemIndex}`);
    if (practiceRow) {
      practiceRow.classList.toggle("done", checked);
    }
  }

  refreshAllProgress();
  updateModalProgress();

  if (!topicWasComplete && topicPercentage(topic) === 100) {
    showConfetti();
    showToast(`🎉 ${topic.name} complete!`);
  }
}

function markEverythingComplete(topicId) {
  const topic = findTopic(topicId);
  if (!topic) {
    return;
  }

  state.checked[topicId] = Array.from({ length: totalItems(topic) }, (_, index) => index);
  saveState();
  refreshAllProgress();
  openTopic(topicId);
  showConfetti();
  showToast(`🎉 ${topic.name} complete!`);
}

function updateModalProgress() {
  if (!currentTopic) {
    return;
  }

  const progressText = document.getElementById("modalPct");
  if (!progressText) {
    return;
  }

  const completed = completedItems(currentTopic);
  const total = totalItems(currentTopic);
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressText.textContent = `Topic progress: ${completed}/${total} (${percent}%)`;
  progressText.classList.toggle("full", percent === 100);
}

// -------------------- BACKUP + RESTORE --------------------
function exportProgress() {
  const backup = {
    application: "DSA Roadmap Tracker",
    version: 3,
    exportedAt: new Date().toISOString(),
    checked: state.checked
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json"
  });

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `dsa-progress-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  URL.revokeObjectURL(downloadLink.href);

  showToast("📦 Progress backup downloaded");
}

function importProgress(file) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const backup = JSON.parse(reader.result);

      if (!backup || typeof backup.checked !== "object") {
        throw new Error("Invalid backup format");
      }

      const shouldRestore = window.confirm(
        "Restore this backup? Your current progress will be replaced."
      );

      if (!shouldRestore) {
        return;
      }

      state.checked = backup.checked;
      saveState();
      refreshAllProgress();
      showToast("✅ Progress restored successfully");
    } catch (error) {
      alert("This is not a valid DSA Roadmap Tracker backup file.");
    }
  };

  reader.readAsText(file);
}

function setupBackupAndReset() {
  const exportButton = document.getElementById("exportBtn");
  const importButton = document.getElementById("importBtn");
  const importFile = document.getElementById("importFile");
  const resetButton = document.getElementById("resetBtn");

  if (exportButton) {
    exportButton.addEventListener("click", exportProgress);
  }

  if (importButton && importFile) {
    importButton.addEventListener("click", () => importFile.click());

    importFile.addEventListener("change", (event) => {
      const [file] = event.target.files;
      if (file) {
        importProgress(file);
      }
      event.target.value = "";
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      const shouldReset = window.confirm(
        "Reset all DSA progress? This cannot be undone unless you already made a backup."
      );

      if (!shouldReset) {
        return;
      }

      state = createFreshState();
      saveState();
      refreshAllProgress();
      showToast("↺ All progress has been reset");
    });
  }
}

// -------------------- THEME --------------------
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

function setupTheme() {
  const themeButton = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  setTheme(savedTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }
}

// -------------------- CONFETTI + TOAST --------------------
function showConfetti() {
  const colors = ["#6366f1", "#22d3ee", "#34d399", "#fbbf24", "#f87171"];

  for (let index = 0; index < 45; index += 1) {
    const particle = document.createElement("div");
    particle.className = "confetti";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.background = colors[index % colors.length];
    particle.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
    particle.style.animationDelay = `${Math.random() * 0.4}s`;

    if (Math.random() > 0.5) {
      particle.style.borderRadius = "50%";
    }

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 4000);
  }
}

function showToast(message) {
  document.querySelectorAll(".toast").forEach((toast) => toast.remove());

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2800);
}

// -------------------- PAGE EVENTS --------------------
function setupPageEvents() {
  const overlay = document.getElementById("overlay");
  const scrollTopButton = document.getElementById("scrollTop");

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  window.addEventListener("scroll", () => {
    if (scrollTopButton) {
      scrollTopButton.hidden = window.scrollY < 400;
    }
  });

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// -------------------- APP START --------------------
function initApp() {
  if (typeof ROADMAP_DATA === "undefined" || !Array.isArray(ROADMAP_DATA)) {
    console.error("ROADMAP_DATA is missing. Check that data.js loads before app.js.");
    return;
  }

  updateStreak();
  setupTheme();
  setupSearchAndFilters();
  setupBackupAndReset();
  setupPageEvents();
  renderRoadmap();
}

initApp();
