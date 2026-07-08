const form = document.querySelector("#reportForm");
const title = document.querySelector("#reportTitle");
const summary = document.querySelector("#reportSummary");
const meta = document.querySelector("#reportMeta");
const sections = document.querySelector("#reportSections");

const moduleCopy = {
  "Natal Chart": {
    lead: "The natal layer translates birth time and place into a symbolic life map. In the full production version, this section should connect to an astrology calculation service for accurate placements, houses, and aspects.",
    bullets: [
      "Core temperament and growth edge",
      "Emotional needs and nervous-system rhythm",
      "Career, vocation, and public contribution themes"
    ]
  },
  "Ikigai": {
    lead: "The ikigai layer turns the client's current focus into a practical purpose map, balancing devotion, skill, service, and livelihood.",
    bullets: [
      "What feels alive and meaningful",
      "What they can practice until mastery",
      "Where their gifts meet a real-world need"
    ]
  },
  "Archetypes": {
    lead: "The archetypal layer gives the client a mythic language for their repeating patterns without reducing them to a fixed personality type.",
    bullets: [
      "Primary archetype for this season",
      "Shadow pattern that asks for compassion",
      "Integration ritual and reflection prompt"
    ]
  },
  "Gene Keys": {
    lead: "The Gene Keys layer can be added as a contemplative profile once the correct birth data workflow and licensed source material are in place.",
    bullets: [
      "Life's Work contemplation",
      "Evolution challenge and gift",
      "Pearl sequence prosperity inquiry"
    ]
  },
  "Numerology": {
    lead: "The name layer looks at the resonance of the full name and can be expanded into formal numerology, phonetic symbolism, or naming history.",
    bullets: [
      "Name tone and first impression",
      "Expression pattern",
      "Client-facing affirmation language"
    ]
  },
  "Human Design": {
    lead: "The Human Design layer should use a dedicated chart API in production, then translate type, authority, profile, and centers into plain-language guidance.",
    bullets: [
      "Decision-making authority",
      "Energy pattern and pacing",
      "Relationship to pressure, invitation, and timing"
    ]
  }
};

function getSeason(dateValue) {
  const date = new Date(`${dateValue}T12:00:00`);
  const month = date.getMonth();
  if ([2, 3, 4].includes(month)) return "spring";
  if ([5, 6, 7].includes(month)) return "summer";
  if ([8, 9, 10].includes(month)) return "autumn";
  return "winter";
}

function getNameTone(name) {
  const letters = name.replace(/[^a-z]/gi, "").length;
  if (letters % 3 === 0) return "builder";
  if (letters % 3 === 1) return "bridge-maker";
  return "vision-carrier";
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${dateValue}T12:00:00`));
}

function createModule(name, context) {
  const data = moduleCopy[name];
  const article = document.createElement("section");
  article.className = "module";
  article.innerHTML = `
    <h3>${name}</h3>
    <p>${data.lead}</p>
    <ul>
      ${data.bullets.map((bullet) => `<li>${bullet} for ${context.firstName}</li>`).join("")}
    </ul>
  `;
  return article;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const fullName = String(formData.get("fullName")).trim();
  const firstName = fullName.split(/\s+/)[0] || "this client";
  const birthDate = String(formData.get("birthDate"));
  const birthTime = String(formData.get("birthTime"));
  const birthLocation = String(formData.get("birthLocation")).trim();
  const focus = String(formData.get("focus"));
  const notes = String(formData.get("notes")).trim();
  const selectedModules = formData.getAll("module");
  const season = getSeason(birthDate);
  const tone = getNameTone(fullName);

  title.textContent = `${fullName}'s Soul Blueprint`;
  summary.textContent = `${firstName}'s draft report is framed around ${focus.toLowerCase()}, using a ${season} birth signature, the ${tone} name tone, and the birth coordinates of ${formatDate(birthDate)} at ${birthTime} in ${birthLocation}. ${notes ? `The current inquiry is: ${notes}` : "Add client notes to make the interpretation more specific."}`;

  meta.innerHTML = `
    <span>${formatDate(birthDate)}</span>
    <span>${birthTime}</span>
    <span>${birthLocation}</span>
    <span>${focus}</span>
  `;

  sections.innerHTML = "";
  selectedModules.forEach((moduleName) => {
    sections.appendChild(createModule(moduleName, { firstName }));
  });
});
