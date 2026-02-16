function createBalletje() {
  const balletjesContainer = document.getElementById('balletjes-container');
  const balletje = document.createElement('div');
  balletje.className = 'balletje';

  const startX = Math.random() * window.innerWidth;
  balletje.style.left = `${startX}px`;

  // Donkerrood of donkerblauw
  const kleur = Math.random() > 0.5 ? '#ff0000' : '#0000ff';
  balletje.style.backgroundColor = kleur;
  balletje.style.color = kleur; // belangrijk voor glow

  const duration = 3 + Math.random() * 3;
  balletje.style.animationDuration = `${duration}s`;

  balletjesContainer.appendChild(balletje);

  setTimeout(() => {
    balletje.remove();
  }, duration * 1000);
}

setInterval(createBalletje, 50);


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
const ADMIN_PASSWORD = "Murat"; // <-- wijzig dit naar je eigen wachtwoord

function showAdmin(){
  const input = prompt("Voer admin wachtwoord in:");
  if(input !== ADMIN_PASSWORD){
    return; // niet admin, niks tonen
  }

  const adminPanel = document.getElementById("admin-panel");

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
      <input id="time" type="number" placeholder="Timer (seconden)">
      <button id="save">Opslaan</button>
    `;

    adminPanel.appendChild(form);

    form.querySelector("#save").onclick = () => {
      const title = form.querySelector("#title").value;
      const desc = form.querySelector("#desc").value;
      const oldp = form.querySelector("#old").value;
      const newp = form.querySelector("#newp").value;
      const time = parseInt(form.querySelector("#time").value);

      if(!title || !newp || !time){
        alert("Vul minimaal titel, nieuwe prijs en timer in");
        return;
      }

      createDeal(title, desc, oldp, newp, time);
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
function startTimer(el, time){
  setInterval(() => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    el.innerHTML =
      `⏳ ${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

    if(time > 0) time--;
    else el.innerHTML = "Actie verlopen";
  },1000);
}
