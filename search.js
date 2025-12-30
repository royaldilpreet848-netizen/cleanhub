const data = {
  games: [
    { name: "GTA V", size: "20GB", version: "v1.0" },
    { name: "GTA Vice City", size: "10GB", version: "v1.0" },
    { name: "Call of Duty", size: "30GB", version: "v1.0" },
    { name: "Cyberpunk 2077", size: "70GB", version: "v1.0" },
    { name: "Far Cry 5", size: "45GB", version: "v1.0" },
    { name: "Red Dead Redemption 2", size: "120GB", version: "v1.0" }
  ],
  apps: [
    { name: "Photoshop", size: "2GB", version: "2023" },
    { name: "Premiere Pro", size: "3GB", version: "2023" },
    { name: "After Effects", size: "4GB", version: "2023" },
    { name: "Blender", size: "500MB", version: "3.0" },
    { name: "VS Code", size: "200MB", version: "Latest" }
  ]
};

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const tabs = document.querySelectorAll(".tab");
const resultTitle = document.getElementById("resultTitle");

let current = "games";

function goToPost(item) {
  const params = new URLSearchParams(item).toString();
  window.location.href = `post.html?${params}`;
}

function render(query = "") {
  results.innerHTML = "";

  const filtered = data[current].filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  resultTitle.innerText =
    filtered.length === 0 ? "No Results Found" : "Search Results";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "latest-card";
    card.innerHTML = `
      <div class="thumb"></div>
      <div class="meta">
        <strong>${item.name}</strong><br>
        <small>${item.version} · Windows · ${item.size}</small>
      </div>
    `;
    card.onclick = () => goToPost(item);
    results.appendChild(card);
  });
}

tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    current = tab.dataset.type;
    render(searchInput.value);
  };
});

searchInput.addEventListener("input", e => {
  render(e.target.value);
});

// Read ?q= from URL
const params = new URLSearchParams(window.location.search);
const initialQuery = params.get("q") || "";
searchInput.value = initialQuery;
render(initialQuery);


const toggle = document.getElementById("themeToggle");

if (toggle) {
  // load saved mode
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
