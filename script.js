const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const ballCount = 120;

// Maak neon ballen met variabele kleuren en pulserende glow
for (let i = 0; i < ballCount; i++) {
  balls.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 2,       // grootte van de bal
    vx: (Math.random() - 0.5) * 0.3, 
    vy: (Math.random() - 0.5) * 0.3,
    colorBase: Math.random() > 0.5 ? [255, 0, 60] : [0, 94, 255], // RGB
    glow: Math.random() * 15 + 10,   // blur
    phase: Math.random() * Math.PI * 2 // voor pulseren
  });
}

function animate() {
  // Maak achtergrond deels transparant voor glow-trails
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  balls.forEach(b => {
    // Pulserende glow
    const glowFactor = Math.sin(b.phase) * 5 + b.glow;
    b.phase += 0.02;

    // Update positie
    b.x += b.vx;
    b.y += b.vy;

    // Wrap-around
    if (b.x > canvas.width) b.x = 0;
    if (b.x < 0) b.x = canvas.width;
    if (b.y > canvas.height) b.y = 0;
    if (b.y < 0) b.y = canvas.height;

    // Teken neon bal
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${b.colorBase[0]},${b.colorBase[1]},${b.colorBase[2]})`;
    ctx.shadowColor = `rgb(${b.colorBase[0]},${b.colorBase[1]},${b.colorBase[2]})`;
    ctx.shadowBlur = glowFactor;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

// Responsiveness
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (e.key === "F12") e.preventDefault();
  if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
  if (e.ctrlKey && e.shiftKey && e.key === "C") e.preventDefault();
  if (e.ctrlKey && e.shiftKey && e.key === "J") e.preventDefault();
});

/****************************
  TIMER VOOR BESTAANDE BLOKKEN
*****************************/
document.querySelectorAll('.timer').forEach(timer => {
  let time = parseInt(timer.dataset.time);

  setInterval(() => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    timer.innerHTML =
      `⏳ ${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

    if(time > 0) time--;
    else timer.innerHTML = "Actie verlopen";
  }, 1000);
});



/****************************
  ADMIN CONTROLE (WACHTWOORD)
*****************************/
const ADMIN_PASSWORD = "654235235131322345243"; // pas aan

function showAdmin() {
  const input = prompt("Voer admin wachtwoord in:");
  if(input !== ADMIN_PASSWORD){
    return; // niet admin
  }

  // Controleer of adminPanel al bestaat, anders maak een nieuwe
let adminPanel = document.getElementById("admin-panel");
if(!adminPanel) {
  adminPanel = document.createElement("div");
  adminPanel.id = "admin-panel";
  document.body.prepend(adminPanel); // bovenaan body toevoegen
}

  // Toevoeg knop
  const addBtn = document.createElement("button");
  addBtn.textContent = "Toevoeg Actie";
  addBtn.className = "admin-btn";
  adminPanel.appendChild(addBtn);

  addBtn.addEventListener("click", () => {

    // Maak formulier voor nieuwe actie
    const form = document.createElement("div");
    form.className = "admin-form";

    form.innerHTML = `
      <input id="title" placeholder="Titel">
      <textarea id="desc" placeholder="Beschrijving"></textarea>
      <input id="old" type="number" placeholder="Oude prijs (€)">
      <input id="newp" type="number" placeholder="Nieuwe prijs (€)">
      <input id="time" type="number" placeholder="Timer (dagen)">
      <button id="save">Opslaan</button>
    `;

    adminPanel.appendChild(form);

    form.querySelector("#save").onclick = () => {
      const title = form.querySelector("#title").value;
      const desc = form.querySelector("#desc").value;
      const oldp = form.querySelector("#old").value;
      const newp = form.querySelector("#newp").value;
      const timeDays = parseInt(form.querySelector("#time").value);

      if(!title || !newp || !timeDays){
        alert("Vul minimaal titel, nieuwe prijs en dagen in");
        return;
      }

      createDeal(title, desc, oldp, newp, timeDays);
      form.remove();
    };
  });
}

// Toon admin knop bij laden
window.onload = showAdmin;

/****************************
  FUNCTIE OM NIEUWE DEAL TE MAKEN
*****************************/
function createDeal(title, desc, oldp, newp, time){
  const deals = document.querySelector(".deals");

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <p class="price">€${newp} <span>€${oldp}</span></p>
    <p class="timer"></p>
    <a href="https://discord.gg/HeymBXuktT" class="btn" target="_blank">Bestel Nu</a>
    <button class="delete-btn">Verwijder</button>
  `;

  deals.appendChild(card);

  // Start timer
  startTimer(card.querySelector(".timer"), time);

  // Verwijder knop
  card.querySelector(".delete-btn").onclick = () => {
    card.remove();
  };
}


/****************************
  TIMER FUNCTIE VOOR NIEUWE DEALS
*****************************/
function startTimer(el, days) {
  let time = days * 86400; // dagen -> seconden

  setInterval(() => {
    let d = Math.floor(time / 86400);
    let h = Math.floor((time % 86400) / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;

    el.innerHTML =
      `⏳ ${d}d ${h.toString().padStart(2,'0')}h:${m.toString().padStart(2,'0')}m:${s.toString().padStart(2,'0')}s`;

    if(time > 0) time--;
    else el.innerHTML = "Actie verlopen";
  }, 1000);
}
