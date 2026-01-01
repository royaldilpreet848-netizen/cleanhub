let DATABASE = [];
let currentType = "game";

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const tabs = document.querySelectorAll(".tab");
const toggle = document.getElementById("themeToggle");

/* LOAD DATABASE */
fetch("./data/database.json")
  .then(res => res.json())
  .then(json => {
    DATABASE = json.items || [];
    initSearch();
  })
  .catch(err => console.error("Database load failed", err));

/* OPEN POST PAGE */
function openPost(item) {
  window.location.href = `post.html?id=${item.id}`;
}

/* RENDER RESULTS */
function render(query = "") {
  results.innerHTML = "";

  const filtered = DATABASE.filter(item =>
    item.type === currentType &&
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }


  /*   Card  */

  filtered.forEach(item => {
  const card = document.createElement("div");
  card.className = "latest-card";
  card.innerHTML = `
    <div class="thumb"></div>
    <div class="meta">
      <strong>${item.title}</strong><br>
      <small>${item.platform} · ${item.versions[0].size}</small>
    </div>
  `;

  card.onclick = () => openPost(item);

  // ACCESSIBILITY (ADD HERE)
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.onkeydown = e => {
    if (e.key === "Enter") card.click();
  };

  results.appendChild(card);
});


/* INIT SEARCH */
function initSearch() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";
  searchInput.value = q;
  render(q);

  searchInput.oninput = e => render(e.target.value);
}

/* TABS */
tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentType = tab.dataset.type === "games" ? "game" : "app";
    render(searchInput.value);
  };
});

/* THEME TOGGLE */
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
}