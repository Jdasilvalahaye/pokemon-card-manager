import { ebTenebresEmbrasees } from "/src/js/extensions/epeeBouclier/eb3TenebresEmbrasees.js";
import { ebZenithSupreme } from "/src/js/extensions/epeeBouclier/eb12.5ZenithSupreme.js";
import { ebTempeteArgentee } from "/src/js/extensions/epeeBouclier/eb12TempeteArgentee.js";

// Tout se charge sur index.html

// Fonction pour afficher les cartes
function renderCards(cards, gridId, assetsPath) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = ""; // Vider la grille

  cards.forEach((card) => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.id = card.id;

    const imageElement = document.createElement("img");
    const imageName = `${card.id}-${card.name.replace(/ /g, "_")}.webp`;
    imageElement.src = `${assetsPath}/${imageName}`;
    imageElement.alt = card.name;
    imageElement.classList.add("card-image");

    newCard.appendChild(imageElement);
    grid.appendChild(newCard);
  });
}

// Fonction pour mettre à jour le titre de l'extension
function updateExtensionTitle(title) {
  const extensionTitle = document.getElementById("extension-title");
  extensionTitle.innerHTML = ""; // Vider le titre précédent

  const extensionTitleElement = document.createElement("h2");
  extensionTitleElement.textContent = title;
  extensionTitle.appendChild(extensionTitleElement);
}

// Fonction pour charger l'extension en fonction de l'URL
function loadExtension(extensionName) {
  if (extensionName === "ebTenebresEmbrasees") {
    renderCards(ebTenebresEmbrasees.cards, "grid-view", "/assets/epeeBouclier/eb3TenebresEmbrasees");
    updateExtensionTitle("Épée et Bouclier - Ténèbres Embrasées");
  } else if (extensionName === "ebZenithSupreme") {
    renderCards(ebZenithSupreme.cards, "grid-view", "/assets/epeeBouclier/eb12.5ZenithSupreme");
    updateExtensionTitle("Épée et Bouclier - Zénith Suprême");
  } else if (extensionName === "ebTempeteArgentee") {
    renderCards(ebTempeteArgentee.cards, "grid-view", "/assets/epeeBouclier/eb12TempeteArgentee");
    updateExtensionTitle("Épée et Bouclier - Tempête Argentée");
  }
}

// Gestion des clics sur les extensions
document.addEventListener("click", function (event) {
  if (event.target.matches("[data-extension]")) {
    event.preventDefault();
    const extension = event.target.getAttribute("data-extension");
    const title = event.target.textContent;

    // Mettre à jour l'URL sans recharger la page
    history.pushState({ extension }, title, `?extension=${extension}`);

    // Charger l'extension
    loadExtension(extension);
  }
});

// Gérer le chargement de l'extension au rechargement de la page
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const extension = params.get("extension");

  if (extension) {
    loadExtension(extension);
  }
});

// Gestion de l'historique pour naviguer avec le bouton retour
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.extension) {
    loadExtension(event.state.extension);
  }
});
