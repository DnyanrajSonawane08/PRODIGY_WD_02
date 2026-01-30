let ms = 0, sec = 0, min = 0;
let running = false;
let interval;
let lapCount = 0;
let sessionHistory = [];

const msEl = document.getElementById("ms");
const secEl = document.getElementById("sec");
const minEl = document.getElementById("min");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsEl = document.getElementById("laps");
const noLapsEl = document.getElementById("no-laps");
const historyList = document.getElementById("historyList");
const savedCount = document.getElementById("savedCount");

function updateDisplay() {
  msEl.textContent = ms.toString().padStart(2, '0');
  secEl.textContent = sec.toString().padStart(2, '0');
  minEl.textContent = min.toString().padStart(2, '0');
}

function timer() {
  ms++;
  if (ms === 100) { ms = 0; sec++; }
  if (sec === 60) { sec = 0; min++; }
  updateDisplay();
}

startBtn.onclick = () => {
  if (!running) {
    interval = setInterval(timer, 10);
    startBtn.textContent = "⏸";
  } else {
    clearInterval(interval);
    startBtn.textContent = "▶";
  }
  running = !running;
};

resetBtn.onclick = () => {
  clearInterval(interval);
  running = false;
  ms = sec = min = 0;
  updateDisplay();
  startBtn.textContent = "▶";
  lapsEl.innerHTML = "";
  lapCount = 0;
  noLapsEl.style.display = "block";
};

lapBtn.onclick = () => {
  if (!running) return;

  lapCount++;
  noLapsEl.style.display = "none";

  let total = `${minEl.textContent}:${secEl.textContent}.${msEl.textContent}`;
  let row = `<tr><td>${lapCount}</td><td>${total}</td><td>${total}</td></tr>`;
  lapsEl.innerHTML += row;
};

// Save session when paused
startBtn.addEventListener("click", () => {
  if (!running && (min || sec || ms)) {
    let timestamp = new Date().toLocaleString();
    let laps = lapCount;
    let total = `${minEl.textContent}:${secEl.textContent}.${msEl.textContent}`;
    
    sessionHistory.push({ timestamp, total, laps });
    renderHistory();
  }
});

function renderHistory() {
  historyList.innerHTML = "";
  sessionHistory.forEach(x => {
    historyList.innerHTML += `
      <div class="item">
        <div><strong>${x.total}</strong></div>
        <div>${x.timestamp}</div>
        <div>${x.laps} Laps</div>
      </div>`;
  });
  savedCount.textContent = `${sessionHistory.length} Saved`;
}
