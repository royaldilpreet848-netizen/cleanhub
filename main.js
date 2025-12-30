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
    { name: "Blender", size: "500MB", version: "3.0" }
  ]
};

const trending = document.getElementById("trending");
const latest = document.getElementById("latest");
const tabs = document.querySelectorAll(".tab");

let current = "games";

function goToPost(item) {
  const params = new URLSearchParams(item).toString();
  window.location.href = `post.html?${params}`;
}

function render() {
  trending.innerHTML = "";
  latest.innerHTML = "";

  data[current].forEach(item => {
    // 🔵 Trending
    const t = document.createElement("div");
    t.className = "trend-card";
    t.innerHTML = `<strong>${item.name}</strong>`;
    t.onclick = () => goToPost(item);
    trending.appendChild(t);

    // 🟢 Latest
    const l = document.createElement("div");
    l.className = "latest-card";
    l.innerHTML = `
      <div class="thumb"></div>
      <div class="meta">
        <strong>${item.name}</strong><br>
        <small>${item.version} · Windows · ${item.size}</small>
      </div>
    `;
    l.onclick = () => goToPost(item);
    latest.appendChild(l);
  });
}

tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    current = tab.dataset.type;
    render();
  };
});

render();

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
