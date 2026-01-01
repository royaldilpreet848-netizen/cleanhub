let DATABASE = [];
let currentType = "game";

const trending = document.getElementById("trending");
const latest = document.getElementById("latest");
const tabs = document.querySelectorAll(".tab");
const toggle = document.getElementById("themeToggle");

/* =========================
   LOAD DATABASE (SAFE)
========================= */
fetch("data/database.json")
  .then(res => res.json())
  .then(json => {
    DATABASE = json.items || [];
    renderHome();
  })
  .catch(err => {
    console.error("Database load failed", err);
  });

/* =========================
   NAVIGATE TO POST
========================= */
function openPost(item) {
  window.location.href = `post.html?id=${item.id}`;
}

/* =========================
   RENDER HOME
========================= */
function renderHome() {
  if (!trending || !latest) return;

  trending.innerHTML = "";
  latest.innerHTML = "";

  const filtered = DATABASE.filter(item => item.type === currentType);

  filtered.slice(0, 12).forEach(item => {

    /* TRENDING */
   
const t = document.createElement("div");
t.className = "trend-card";
t.innerHTML = `<strong>${item.title}</strong>`;
t.onclick = () => openPost(item);

// ACCESSIBILITY (ADD HERE)
t.tabIndex = 0;
t.setAttribute("role", "button");
t.onkeydown = e => {
  if (e.key === "Enter") t.click();
};

trending.appendChild(t);


    /* LATEST */
   const l = document.createElement("div");
l.className = "latest-card";
l.innerHTML = `
  <div class="thumb"></div>
  <div class="meta">
    <strong>${item.title}</strong><br>
    <small>${item.platform} · ${item.versions[0].size}</small>
  </div>
`;
l.onclick = () => openPost(item);

// ACCESSIBILITY (ADD HERE)
l.tabIndex = 0;
l.setAttribute("role", "button");
l.onkeydown = e => {
  if (e.key === "Enter") l.click();
};

latest.appendChild(l);

  });
}

/* =========================
   TABS
========================= */
tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentType = tab.dataset.type === "games" ? "game" : "app";
    renderHome();
  };
});

/* =========================
   THEME TOGGLE
========================= */
if (toggle) {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  }

  toggle.onclick = () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    toggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };
}
