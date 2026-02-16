const regels = [
  {
    categoryTitle: "1. Algemeen gedrag",
    items: [
      { title: "1.1 Wees respectvol naar iedereen", description: "Inclusief staffleden, moderators en andere leden. Beledigingen, discriminatie, bedreigingen, intimidatie of haatdragende opmerkingen zijn niet toegestaan." },
      { title: "1.2 Gebruik correcte taal", description: "Vermijd scheldwoorden, obscene of aanstootgevende uitdrukkingen." },
      { title: "1.3 Geen spam of irrelevante content", description: "Herhalende berichten of onnodige afbeeldingen, GIFs of links zijn niet toegestaan." },
      { title: "1.4 Vermijd politiek, religie of controversiële onderwerpen", description: "Dit is alleen toegestaan in daarvoor bestemde kanalen." },
      { title: "1.5 Vermijd overmatig taggen", description: "@everyone, @here of het taggen van leden zonder toestemming is niet toegestaan." }
    ]
  },
  {
    categoryTitle: "2. Kopen",
    items: [
      { title: "2.1 Alleen serieuze kopers", description: "Zorg dat je duidelijk aangeeft welke command je wilt kopen en eventuele vragen hebt over functionaliteit." },
      { title: "2.2 Misleiding, fraude of oplichting", description: "Niet toegestaan. Iedereen die hieraan doet, wordt per direct geband." },
      { title: "2.3 Discussies over prijzen", description: "Moeten netjes en professioneel verlopen. Dreigementen of intimidatie leiden tot waarschuwingen of bans." },
      { title: "2.4 Geen spam in koopkanalen", description: "Probeer geen onnodige onderhandelingen of vragen te spammen in de kanalen." }
    ]
  },
  {
    categoryTitle: "3. Transacties",
    items: [
      { title: "3.1 Betalingsmethoden", description: "Betalingen gebeuren via de afgesproken en veilige methode, bijvoorbeeld PayPal, Discord Payment of een andere overeengekomen manier." },
      { title: "3.2 Levering", description: "Na betaling wordt de bot geleverd volgens de gemaakte afspraken. Leveringsproblemen dienen eerlijk en respectvol opgelost te worden." },
      { title: "3.3 Verantwoordelijkheid", description: "De server en staff zijn niet verantwoordelijk voor externe problemen zoals mislukte betalingen buiten de afgesproken methode of technische fouten van de koper/verkoper." },
      { title: "3.4 Bewijs van betaling", description: "Houd altijd een bewijs van betaling bij, bijvoorbeeld screenshots of transactienummers, voor het geval er een probleem ontstaat." }
    ]
  },
  {
    categoryTitle: "4. Veiligheid",
    items: [
      { title: "4.1 Persoonlijke informatie", description: "Deel geen gevoelige persoonlijke informatie, zoals wachtwoorden, bankgegevens, ID-nummers of andere vertrouwelijke informatie." },
      { title: "4.2 Vertrouwen buiten server", description: "Vertrouw geen andere verkopers of kopers buiten deze server; controleer altijd of iemand betrouwbaar is via de server kanalen." },
      { title: "4.3 Links en downloads", description: "Klik niet op verdachte links en download geen bestanden van onbekende personen." },
      { title: "4.4 Verdachte activiteiten melden", description: "Meld verdachte activiteiten of oplichting direct bij de staff." }
    ]
  },
  {
    categoryTitle: "5. Staffleden",
    items: [
      { title: "5.1 Bevoegdheden", description: "Staffleden hebben het recht om berichten te verwijderen, waarschuwingen te geven, mutes of bans uit te delen bij overtredingen van de regels." },
      { title: "5.2 Volg aanwijzingen", description: "Volg altijd de aanwijzingen van staffleden op. Discussies over staffbeslissingen moeten via DM of het aangewezen kanaal plaatsvinden, niet publiekelijk." },
      { title: "5.3 Respect voor staff", description: "Staffleden zijn er om de server veilig en netjes te houden. Respecteer hun rol en beslissingen." },
      { title: "5.4 Misbruik van staffrechten", description: "Misbruik van staffrechten door leden of staff zal leiden tot directe sancties." }
    ]
  },
  {
    categoryTitle: "6. Discord ToS",
    items: [
      { title: "6.1 Discord ToS", description: "Alles wat hier gebeurt moet voldoen aan de Discord Terms of Service. Bots, services of transacties die deze schenden worden niet toegestaan of verkocht." },
      { title: "6.2 Illegale content", description: "Het delen van content die illegaal, piraterij-gerelateerd of in strijd met de Discord regels is, is verboden." },
      { title: "6.3 Gevolgen overtredingen", description: "Overtredingen kunnen leiden tot waarschuwingen, mutes, tijdelijke bans of permanente bans, afhankelijk van de ernst van de overtreding." }
    ]
  }
];

// Regels toevoegen aan container
const container = document.getElementById('regels-container');

regels.forEach((categorie, catIndex) => {
  // Categorie header
  const catHeader = document.createElement('h2');
  catHeader.textContent = categorie.categoryTitle;
  container.appendChild(catHeader);

  // Regels binnen categorie
  categorie.items.forEach((regel, regelIndex) => {
    const div = document.createElement('div');
    div.className = 'regel';
    div.innerHTML = `<strong>${regel.title}:</strong><p>${regel.description}</p>`;
    container.appendChild(div);

    // Fade-in effect met kleine vertraging per regel
    setTimeout(() => {
      div.classList.add('visible');
    }, (catIndex * 5 + regelIndex) * 200); // 200ms tussen elke regel
  });
});


// Functie om vallende balletjes te maken
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

