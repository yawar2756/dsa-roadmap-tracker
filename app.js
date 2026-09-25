const STORAGE_KEY = "dsaRoadmapV2State";
const THEME_KEY = "dsaRoadmapV2Theme";

let state = loadState();
let currentFilter = "all";
let currentTopic = null;

function freshState() {
  return {
    checked: {},
    notes: {},
    weeklyGoal: 10,
    weekStart: getWeekStart(),
    weekCheckedStart: 0,
    lastVisit: null,
    streak: 1,
    dailySolvedDate: null,
    dailySolved: false
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved && typeof saved === "object") {
      return {
        ...freshState(),
        ...saved,
        checked: saved.checked || {},
        notes: saved.notes || {}
      };
    }
  } catch (error) {
    console.warn("Could not load saved progress.", error);
  }

  return freshState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getWeekStart() {
  const date = new Date();
  const day = date.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + difference);
  date.setHours(0, 0, 0, 0);

  return date.toISOString().slice(0, 10);
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);

  if (state.lastVisit === today) {
    return;
  }

  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10);

  state.streak = state.lastVisit === yesterday ? (state.streak || 1) + 1 : 1;
  state.lastVisit = today;

  saveState();
}

function updateWeeklyState() {
  const currentWeek = getWeekStart();

  if (state.weekStart !== currentWeek) {
    state.weekStart = currentWeek;
    state.weekCheckedStart = getTotalCompletedCheckpoints();
    saveState();
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function findTopic(topicId) {
  for (const phase of ROADMAP_DATA) {
    const topic = phase.topics.find((item) => item.id === topicId);

    if (topic) {
      return topic;
    }
  }

  return null;
}

function getTopicTotal(topic) {
  return topic.learn.length + topic.practice.length;
}

function isDone(topicId, index) {
  return Array.isArray(state.checked[topicId]) &&
    state.checked[topicId].includes(index);
}

function getTopicDone(topic) {
  const completed = state.checked[topic.id] || [];

  return completed.filter((index) => index >= 0 && index < getTopicTotal(topic)).length;
}

function getTopicPercent(topic) {
  const total = getTopicTotal(topic);

  if (total === 0) {
    return 0;
  }

  return Math.round((getTopicDone(topic) / total) * 100);
}

function getAllTopics() {
  return ROADMAP_DATA.flatMap((phase) => phase.topics);
}

function getTotalCheckpoints() {
  return getAllTopics().reduce((total, topic) => total + getTopicTotal(topic), 0);
}

function getTotalCompletedCheckpoints() {
  return getAllTopics().reduce((total, topic) => total + getTopicDone(topic), 0);
}

function getProblemsSolved() {
  let solved = 0;

  getAllTopics().forEach((topic) => {
    const practiceStart = topic.learn.length;

    topic.practice.forEach((problem, index) => {
      if (isDone(topic.id, practiceStart + index)) {
        solved += 1;
      }
    });
  });

  return solved;
}

function getCompletedTopicsCount() {
  return getAllTopics().filter((topic) => getTopicPercent(topic) === 100).length;
}

function getNextTopic() {
  const topics = getAllTopics();

  for (const topic of topics) {
    if (getTopicPercent(topic) < 100) {
      return topic;
    }
  }

  return topics[0];
}

function getNextCheckpoint(topic) {
  for (let index = 0; index < topic.learn.length; index += 1) {
    if (!isDone(topic.id, index)) {
      return {
        type: "learn",
        index,
        title: topic.learn[index][0],
        description: topic.learn[index][1]
      };
    }
  }

  for (let index = 0; index < topic.practice.length; index += 1) {
    const itemIndex = topic.learn.length + index;

    if (!isDone(topic.id, itemIndex)) {
      return {
        type: "practice",
        index: itemIndex,
        title: topic.practice[index].name,
        description: `Solve this ${topic.practice[index].difficulty} practice problem.`
      };
    }
  }

  return null;
}

function getDailyChallenge() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const difference = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(difference / oneDay);

  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}

function isBadgeUnlocked(badge) {
  if (badge.condition === "checkpoint") {
    return getTotalCompletedCheckpoints() >= badge.required;
  }

  if (badge.condition === "problems") {
    return getProblemsSolved() >= badge.required;
  }

  if (badge.condition === "streak") {
    return (state.streak || 1) >= badge.required;
  }

  if (badge.condition === "topic") {
    const topic = findTopic(badge.topicId);
    return topic && getTopicPercent(topic) === 100;
  }

  if (badge.condition === "topics") {
    return badge.topicIds.every((topicId) => {
      const topic = findTopic(topicId);
      return topic && getTopicPercent(topic) === 100;
    });
  }

  if (badge.condition === "all-topics") {
    return getCompletedTopicsCount() === getAllTopics().length;
  }

  return false;
}

function getUnlockedBadges() {
  return BADGES.filter((badge) => isBadgeUnlocked(badge));
}

function phaseId(phase) {
  return phase.title.replace(/\W+/g, "_");
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function renderRoadmap() {
  const roadmap = document.getElementById("roadmap");

  if (!roadmap) {
    return;
  }

  roadmap.innerHTML = ROADMAP_DATA.map((phase) => {
    const number = phase.phase.replace("Phase", "").trim();

    return `
      <section class="phase" data-phase="${phaseId(phase)}">
        <div class="phase-head">
          <div class="phase-num">${escapeHtml(number)}</div>

          <div class="phase-info">
            <h2>${escapeHtml(phase.title)}</h2>
            <p>${escapeHtml(phase.time)}</p>
          </div>

          <div class="phase-badge" id="badge-${phaseId(phase)}">0% complete</div>
        </div>

        <div class="topics">
          ${phase.topics.map((topic) => `
            <button
              class="topic"
              id="card-${topic.id}"
              data-topic-id="${topic.id}"
              type="button"
            >
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
    card.addEventListener("click", () => {
      openTopic(card.dataset.topicId);
    });
  });
}

function refreshDashboard() {
  const total = getTotalCheckpoints();
  const completed = getTotalCompletedCheckpoints();
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  setText("statPct", `${percent}%`);
  setText("statTopics", `${getCompletedTopicsCount()}/${getAllTopics().length}`);
  setText("statProblems", getProblemsSolved());
  setText("statStreak", `🔥 ${state.streak || 1}`);

  setText("progressText", `${completed} of ${total} checkpoints completed`);
  setText("progressPct", `${percent}%`);

  const progressFill = document.getElementById("progressFill");

  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }

  updateNextTopic();
  updateDailyChallenge();
  updateWeeklyGoal();
  renderBadges();
  updateRoadmapProgress();
  applyFilters();
}

function updateRoadmapProgress() {
  ROADMAP_DATA.forEach((phase) => {
    let phaseTotal = 0;
    let phaseDone = 0;

    phase.topics.forEach((topic) => {
      const total = getTopicTotal(topic);
      const done = getTopicDone(topic);
      const percent = getTopicPercent(topic);

      phaseTotal += total;
      phaseDone += done;

      const card = document.getElementById(`card-${topic.id}`);
      const pct = document.getElementById(`pct-${topic.id}`);

      if (card) {
        card.classList.toggle("completed", percent === 100);
      }

      if (pct) {
        pct.textContent = `${percent}%`;
        pct.classList.toggle("full", percent === 100);
      }
    });

    const percent = phaseTotal === 0 ? 0 : Math.round((phaseDone / phaseTotal) * 100);
    const badge = document.getElementById(`badge-${phaseId(phase)}`);

    if (badge) {
      badge.textContent = percent === 100 ? "✓ Complete" : `${percent}% complete`;
      badge.classList.toggle("done", percent === 100);
    }
  });
}

function updateNextTopic() {
  const topic = getNextTopic();
  const checkpoint = getNextCheckpoint(topic);

  if (!topic) {
    return;
  }

  setText("nextTopicIcon", topic.icon);
  setText("nextTopicName", topic.name);

  if (checkpoint) {
    setText("nextTopicTask", checkpoint.title);
  } else {
    setText("nextTopicTask", "You completed all available tasks.");
  }
}

function updateDailyChallenge() {
  const challenge = getDailyChallenge();

  setText("dailyTitle", challenge.title);
  setText("dailyHint", `Hint: ${challenge.hint}`);

  const difficulty = document.getElementById("dailyDifficulty");

  if (difficulty) {
    difficulty.textContent = challenge.difficulty;
    difficulty.className = `challenge-difficulty ${challenge.difficulty}`;
  }

  const link = document.getElementById("dailyLink");

  if (link) {
    link.href = challenge.url;
  }

  const button = document.getElementById("dailySolvedBtn");
  const today = new Date().toISOString().slice(0, 10);
  const solvedToday = state.dailySolvedDate === today && state.dailySolved;

  if (button) {
    button.textContent = solvedToday ? "Solved Today ✓" : "Mark Solved ✓";
    button.disabled = solvedToday;
  }
}

function updateWeeklyGoal() {
  updateWeeklyState();

  const current = Math.max(
    0,
    getTotalCompletedCheckpoints() - (state.weekCheckedStart || 0)
  );

  const goal = Number(state.weeklyGoal) || 10;
  const percent = Math.min(100, Math.round((current / goal) * 100));

  setText("weeklyDone", current);
  setText("weeklyGoal", goal);

  const fill = document.getElementById("weeklyFill");

  if (fill) {
    fill.style.width = `${percent}%`;
  }

  if (current >= goal) {
    setText("weeklyMessage", "🎉 Weekly goal completed. Great work!");
  } else {
    setText("weeklyMessage", `${goal - current} more checkpoints to reach your weekly goal.`);
  }
}

function renderBadges() {
  const unlocked = getUnlockedBadges();

  setText("badgeCount", unlocked.length);
  setText("badgeTotal", BADGES.length);

  const miniBadges = document.getElementById("miniBadges");

  if (miniBadges) {
    miniBadges.innerHTML = BADGES.slice(0, 5).map((badge) => {
      const unlockedBadge = isBadgeUnlocked(badge);

      return `
        <div class="mini-badge ${unlockedBadge ? "unlocked" : "locked"}" title="${escapeHtml(badge.name)}">
          ${badge.icon}
        </div>
      `;
    }).join("");
  }

  const allBadges = document.getElementById("allBadges");

  if (allBadges) {
    allBadges.innerHTML = BADGES.map((badge) => {
      const unlockedBadge = isBadgeUnlocked(badge);

      return `
        <article class="full-badge ${unlockedBadge ? "unlocked" : "locked"}">
          <div class="full-badge-icon">${badge.icon}</div>

          <div>
            <h3>${escapeHtml(badge.name)}</h3>
            <p>${escapeHtml(badge.description)}</p>
          </div>

          <span>${unlockedBadge ? "Unlocked ✓" : "Locked"}</span>
        </article>
      `;
    }).join("");
  }
}

function getSearchText(topic) {
  const learnText = topic.learn.map((item) => item.join(" ")).join(" ");
  const problemText = topic.practice.map((problem) => problem.name).join(" ");

  return `${topic.name} ${topic.why} ${learnText} ${problemText}`.toLowerCase();
}

function applyFilters() {
  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearSearch");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

  if (clearButton) {
    clearButton.hidden = query.length === 0;
  }

  ROADMAP_DATA.forEach((phase) => {
    let visibleTopics = 0;

    phase.topics.forEach((topic) => {
      const card = document.getElementById(`card-${topic.id}`);

      if (!card) {
        return;
      }

      const percent = getTopicPercent(topic);
      let visible = true;

      if (currentFilter === "todo") {
        visible = percent === 0;
      }

      if (currentFilter === "active") {
        visible = percent > 0 && percent < 100;
      }

      if (currentFilter === "done") {
        visible = percent === 100;
      }

      if (visible && query) {
        visible = getSearchText(topic).includes(query);
      }

      card.classList.toggle("hidden-card", !visible);

      if (visible) {
        visibleTopics += 1;
      }
    });

    const phaseElement = document.querySelector(
      `[data-phase="${phaseId(phase)}"]`
    );

    if (phaseElement) {
      phaseElement.style.display = visibleTopics === 0 ? "none" : "";
    }
  });
}

function openTopic(topicId) {
  const topic = findTopic(topicId);
  const overlay = document.getElementById("topicOverlay");
  const modal = document.getElementById("topicModal");

  if (!topic || !overlay || !modal) {
    return;
  }

  currentTopic = topic;
  const note = state.notes[topic.id] || "";

  modal.innerHTML = `
    <div class="modal-head">
      <div class="topic-modal-title">
        <span class="modal-topic-icon">${topic.icon}</span>

        <div>
          <span class="dashboard-kicker">DSA TOPIC</span>
          <h2>${escapeHtml(topic.name)}</h2>
          <p>🕐 ${escapeHtml(topic.time)} estimated</p>
        </div>
      </div>

      <button class="close-btn" id="closeTopicBtn" type="button">✕</button>
    </div>

    <div class="modal-body">
      <div class="why-box">
        <strong>Why learn this:</strong>
        ${escapeHtml(topic.why)}
      </div>

      <div class="section-title">
        <span>📚 Learning Checklist</span>
      </div>

      ${topic.learn.map((item, index) => `
        <label class="check-item">
          <input
            type="checkbox"
            data-index="${index}"
            data-type="learn"
            ${isDone(topic.id, index) ? "checked" : ""}
          >

          <span class="txt">
            ${escapeHtml(item[0])}
            <small>${escapeHtml(item[1])}</small>
          </span>
        </label>
      `).join("")}

      <div class="section-title">
        <span>💻 Practice Problems</span>
      </div>

      ${topic.practice.map((problem, index) => {
        const itemIndex = topic.learn.length + index;
        const solved = isDone(topic.id, itemIndex);

        return `
          <div class="practice-row ${solved ? "solved" : ""}">
            <label class="practice-check">
              <input
                type="checkbox"
                data-index="${itemIndex}"
                data-type="practice"
                ${solved ? "checked" : ""}
              >

              <span>${escapeHtml(problem.name)}</span>
            </label>

            <div class="practice-actions">
              <span class="diff ${problem.difficulty}">
                ${escapeHtml(problem.difficulty)}
              </span>

              <a
                class="problem-link"
                href="${problem.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solve ↗
              </a>
            </div>
          </div>
        `;
      }).join("")}

      <div class="section-title">
        <span>📝 My Notes</span>
      </div>

      <textarea
        id="topicNotes"
        class="topic-notes"
        placeholder="Write your notes, mistakes, formulas or revision points here..."
      >${escapeHtml(note)}</textarea>

      <div class="notes-actions">
        <button id="saveNotesBtn" class="outline-btn" type="button">
          Save Notes
        </button>

        <span id="notesStatus"></span>
      </div>

      <div class="tip-box">
        <strong>💡 Tip:</strong>
        ${escapeHtml(topic.tip)}
      </div>
    </div>

    <div class="modal-foot">
      <span class="modal-pct" id="modalPercent">0%</span>

      <button id="completeTopicBtn" class="primary-btn" type="button">
        ✓ Mark Topic Complete
      </button>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  modal.querySelector("#closeTopicBtn").addEventListener("click", closeTopic);

  modal.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      toggleCheckpoint(
        topic.id,
        Number(checkbox.dataset.index),
        checkbox.checked
      );
    });
  });

  modal.querySelector("#completeTopicBtn").addEventListener("click", () => {
    completeTopic(topic.id);
  });

  modal.querySelector("#saveNotesBtn").addEventListener("click", () => {
    saveTopicNotes(topic.id);
  });

  updateTopicModalProgress();
}

function closeTopic() {
  const overlay = document.getElementById("topicOverlay");

  if (overlay) {
    overlay.classList.remove("open");
  }

  document.body.style.overflow = "";
  currentTopic = null;
}

function toggleCheckpoint(topicId, index, checked) {
  const topic = findTopic(topicId);

  if (!topic) {
    return;
  }

  const wasComplete = getTopicPercent(topic) === 100;

  if (!Array.isArray(state.checked[topicId])) {
    state.checked[topicId] = [];
  }

  if (checked && !state.checked[topicId].includes(index)) {
    state.checked[topicId].push(index);
  }

  if (!checked) {
    state.checked[topicId] = state.checked[topicId].filter(
      (item) => item !== index
    );
  }

  saveState();
  refreshDashboard();
  updateTopicModalProgress();

  if (currentTopic) {
    openTopic(currentTopic.id);
  }

  if (!wasComplete && getTopicPercent(topic) === 100) {
    showConfetti();
    showToast(`🎉 ${topic.name} completed!`);
  }
}

function completeTopic(topicId) {
  const topic = findTopic(topicId);

  if (!topic) {
    return;
  }

  state.checked[topicId] = Array.from(
    { length: getTopicTotal(topic) },
    (_, index) => index
  );

  saveState();
  refreshDashboard();
  openTopic(topicId);
  showConfetti();
  showToast(`🏆 ${topic.name} completed!`);
}

function saveTopicNotes(topicId) {
  const textarea = document.getElementById("topicNotes");
  const status = document.getElementById("notesStatus");

  if (!textarea) {
    return;
  }

  state.notes[topicId] = textarea.value.trim();
  saveState();

  if (status) {
    status.textContent = "Saved ✓";

    setTimeout(() => {
      status.textContent = "";
    }, 2000);
  }
}

function updateTopicModalProgress() {
  if (!currentTopic) {
    return;
  }

  const element = document.getElementById("modalPercent");

  if (!element) {
    return;
  }

  const done = getTopicDone(currentTopic);
  const total = getTopicTotal(currentTopic);
  const percent = getTopicPercent(currentTopic);

  element.textContent = `Topic Progress: ${done}/${total} (${percent}%)`;
  element.classList.toggle("full", percent === 100);
}

function showBadges() {
  document.getElementById("badgeOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBadges() {
  document.getElementById("badgeOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function showGoalModal() {
  const input = document.getElementById("goalInput");

  if (input) {
    input.value = state.weeklyGoal || 10;
  }

  document.getElementById("goalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeGoalModal() {
  document.getElementById("goalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function saveWeeklyGoal() {
  const input = document.getElementById("goalInput");
  let goal = Number(input.value);

  if (!goal || goal < 1) {
    goal = 10;
  }

  if (goal > 100) {
    goal = 100;
  }

  state.weeklyGoal = goal;
  saveState();
  updateWeeklyGoal();
  closeGoalModal();
  showToast("Weekly goal updated ✓");
}

function continueLearning() {
  const topic = getNextTopic();

  if (topic) {
    openTopic(topic.id);
  }
}

function markDailySolved() {
  const today = new Date().toISOString().slice(0, 10);

  state.dailySolved = true;
  state.dailySolvedDate = today;

  saveState();
  updateDailyChallenge();
  showConfetti();
  showToast("🎉 Daily challenge completed!");
}

function exportProgress() {
  const backup = {
    app: "DSA Roadmap Tracker Version 2",
    exportedAt: new Date().toISOString(),
    state
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `dsa-roadmap-backup-${new Date().toISOString().slice(0, 10)}.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
  showToast("Backup downloaded ✓");
}

function importProgress(file) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const backup = JSON.parse(reader.result);

      if (!backup.state || typeof backup.state !== "object") {
        throw new Error("Invalid backup");
      }

      const shouldRestore = confirm(
        "Restore this backup? Your current progress will be replaced."
      );

      if (!shouldRestore) {
        return;
      }

      state = {
        ...freshState(),
        ...backup.state,
        checked: backup.state.checked || {},
        notes: backup.state.notes || {}
      };

      saveState();
      refreshDashboard();
      showToast("Progress restored ✓");
    } catch (error) {
      alert("Invalid backup file.");
    }
  };

  reader.readAsText(file);
}

function resetProgress() {
  const shouldReset = confirm(
    "Reset all progress, notes, badges and weekly goals? This cannot be undone unless you have a backup."
  );

  if (!shouldReset) {
    return;
  }

  state = freshState();
  saveState();
  refreshDashboard();
  showToast("All progress reset");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

function setupTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";

  setTheme(savedTheme);

  document.getElementById("themeBtn").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });
}

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

    setTimeout(() => {
      particle.remove();
    }, 4000);
  }
}

function showToast(message) {
  document.querySelectorAll(".toast").forEach((toast) => toast.remove());

  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
}

function setupEvents() {
  document.getElementById("continueBtn").addEventListener("click", continueLearning);
  document.getElementById("heroContinueBtn").addEventListener("click", continueLearning);

  document.getElementById("dailySolvedBtn").addEventListener("click", markDailySolved);

  document.getElementById("badgesBtn").addEventListener("click", showBadges);
  document.getElementById("closeBadgesBtn").addEventListener("click", closeBadges);

  document.getElementById("goalEditBtn").addEventListener("click", showGoalModal);
  document.getElementById("closeGoalBtn").addEventListener("click", closeGoalModal);
  document.getElementById("saveGoalBtn").addEventListener("click", saveWeeklyGoal);

  document.getElementById("exportBtn").addEventListener("click", exportProgress);

  document.getElementById("importBtn").addEventListener("click", () => {
    document.getElementById("importFile").click();
  });

  document.getElementById("importFile").addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      importProgress(file);
    }

    event.target.value = "";
  });

  document.getElementById("resetBtn").addEventListener("click", resetProgress);

  document.getElementById("printBtn").addEventListener("click", () => {
    window.print();
  });

  document.getElementById("searchInput").addEventListener("input", applyFilters);

  document.getElementById("clearSearch").addEventListener("click", () => {
    const search = document.getElementById("searchInput");

    search.value = "";
    search.focus();

    applyFilters();
  });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((item) => {
        item.classList.remove("active");
      });

      chip.classList.add("active");
      currentFilter = chip.dataset.filter;

      applyFilters();
    });
  });

  document.getElementById("topicOverlay").addEventListener("click", (event) => {
    if (event.target.id === "topicOverlay") {
      closeTopic();
    }
  });

  document.getElementById("badgeOverlay").addEventListener("click", (event) => {
    if (event.target.id === "badgeOverlay") {
      closeBadges();
    }
  });

  document.getElementById("goalOverlay").addEventListener("click", (event) => {
    if (event.target.id === "goalOverlay") {
      closeGoalModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTopic();
      closeBadges();
      closeGoalModal();
    }
  });

  const scrollButton = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    scrollButton.hidden = window.scrollY < 400;
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function init() {
  if (typeof ROADMAP_DATA === "undefined") {
    console.error("data.js did not load correctly.");
    return;
  }

  updateStreak();
  updateWeeklyState();

  renderRoadmap();
  setupTheme();
  setupEvents();
  refreshDashboard();
}

init();
