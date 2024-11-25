import { ebTenebresEmbrasees } from "/src/js/extensions/epeeBouclier/eb3TenebresEmbrasees.js";
import { ebZenithSupreme } from "/src/js/extensions/epeeBouclier/eb12.5ZenithSupreme.js";
import { ebTempeteArgentee } from "/src/js/extensions/epeeBouclier/eb12TempeteArgentee.js";
import { ev151 } from "/src/js/extensions/ecarlateViolet/ev3.5Pokemon151.js";
import { evFlammesObsidiennes } from "/src/js/extensions/ecarlateViolet/ev3FlammesObsidiennes.js";
import { evFailleParadoxe } from "/src/js/extensions/ecarlateViolet/ev4FailleParadoxe.js";

// Défini dès le début la liste des cartes comme étant égale aux données du localstorage, sinon c'est un tableau vide. Utilise getItem pour aller chercher la valeur associée à listOfcardsOwned qu'on défini dans la fonction du bouton, qui elle utilise la méthode setItem pour ajouter au local storage la liste des cartes
let listOfCardsOwned = JSON.parse(localStorage.getItem("listOfCardsOwned")) || [];
// Tout se charge sur collection.html

// Fonction pour afficher les cartes
function renderCards(cards, gridId, assetsPath) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = ""; // Vider la grille

  cards.forEach((card) => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.id = card.id;

    // Conteneur de l'image
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("card-image-container");

    // Image de la carte
    const imageElement = document.createElement("img");
    const imageName = `${card.id}-${card.name.replace(/ /g, "_")}.webp`;
    imageElement.src = `${assetsPath}/${imageName}`;
    imageElement.alt = card.name;
    imageElement.classList.add("card-image");

    // Si la carte n'est pas possédée, ajoute la classe "not-owned" pour modifier l'opacité en css
    if (!listOfCardsOwned.includes(card.id)) {
      imageElement.classList.add("not-owned");
    }
    // Ajout du conteneur du bouton
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("card-button-container");

    // Ajout du bouton de collection
    const ownedButton = document.createElement("button");
    ownedButton.classList.add("collection-button");
    ownedButton.textContent = "non possédée"; // pour chaque carte, par défaut le bouton est sur non possédée

    // si la liste (le localstorage) contient l'id de la carte, alors met le bouton sur possédée à chaque fois qu'on charge la carte, sinon reste sur non possédée, idem pour les classes
    if (listOfCardsOwned.includes(card.id)) {
      ownedButton.textContent = "possédée";
      ownedButton.classList.add("owned");
    } else {
      ownedButton.textContent = "non possédée";
      ownedButton.classList.add("not-owned");
    }
    // Quand clique sur bouton, lance la fonction
    ownedButton.addEventListener("click", () => {
      ownedButtonCollecion(card.id, ownedButton, imageElement);
    });

    // Ajout des conteneurs à la carte
    newCard.appendChild(imageContainer);
    newCard.appendChild(buttonContainer);
    // Ajout de l'image au conteneur
    imageContainer.appendChild(imageElement);
    // Ajout du bouton au conteneur du bouton
    buttonContainer.appendChild(ownedButton);
    // Ajout de la carte à la grille
    grid.appendChild(newCard);
  });
}
// Fonction du bouton : si quand on clique le texte = non possédée, devient "possédée" et ajoute l'id de la carte dans la liste, sinon, remet sur "non possédée" et retire l'id de la liste
// Les boutons ont deux classes : collection-button et owned ou not-owned dès qu'on intéragit avec. La classe est conservées plus haut à chaque refresh.
// On change la classe dans la fonction renderCards uniquement pour la conserver après refresh et dans cette fonction pour changer la classe au clic. Si on ne le fait pas ici, il faudrait refresh pour que le bouton prenne sa seconde classe. Change également la classe de l'image pour modifier l'opacité
function ownedButtonCollecion(cardId, button, imageElement) {
  if (button.textContent == "non possédée") {
    button.textContent = "possédée";
    button.classList.add("owned");
    button.classList.remove("not-owned");
    imageElement.classList.remove("not-owned");
    listOfCardsOwned.push(cardId); // ajoute la carte à la liste
  } else {
    button.textContent = "non possédée";
    button.classList.add("not-owned");
    button.classList.remove("owned");
    imageElement.classList.add("not-owned");
    listOfCardsOwned = listOfCardsOwned.filter((id) => id !== cardId); // retire de la liste la carte
  }
  localStorage.setItem("listOfCardsOwned", JSON.stringify(listOfCardsOwned)); // ajoute au localstorage la liste des cartes à laquelle on ajoute ou retire un id en fonction du texte du bouton
  console.log(listOfCardsOwned);
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
  if (extensionName === "Tenebres-Embrasees") {
    renderCards(ebTenebresEmbrasees.cards, "grid-view", "/assets/epeeBouclier/eb3TenebresEmbrasees");
    updateExtensionTitle("Épée et Bouclier - Ténèbres Embrasées");
  } else if (extensionName === "Zenith-Supreme") {
    renderCards(ebZenithSupreme.cards, "grid-view", "/assets/epeeBouclier/eb12.5ZenithSupreme");
    updateExtensionTitle("Épée et Bouclier - Zénith Suprême");
  } else if (extensionName === "Tempete-Argentee") {
    renderCards(ebTempeteArgentee.cards, "grid-view", "/assets/epeeBouclier/eb12TempeteArgentee");
    updateExtensionTitle("Épée et Bouclier - Tempête Argentée");
  } else if (extensionName === "Faille-Paradoxe") {
    renderCards(evFailleParadoxe.cards, "grid-view", "/assets/ecarlateViolet/ev4FailleParadoxe");
    updateExtensionTitle("Écarlate et Violet - Faille Paradoxe");
  } else if (extensionName === "Flammes-Obsidiennes") {
    renderCards(evFlammesObsidiennes.cards, "grid-view", "/assets/ecarlateViolet/ev3FlammesObsidiennes");
    updateExtensionTitle("Écarlate et Violet - Flammes Obsidiennes");
  } else if (extensionName === "Pokemon-151") {
    renderCards(ev151.cards, "grid-view", "/assets/ecarlateViolet/ev3.5Pokemon151");
    updateExtensionTitle("Écarlate et Violet - 151");
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

// Gère l'affichage des sous-menus
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les toggles du menu
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      // Fermer tous les autres menus déroulants
      document.querySelectorAll(".menu-item").forEach((item) => {
        if (item !== toggle.parentElement) {
          item.classList.remove("active");
        }
      });

      // Bascule l'état du menu courant
      toggle.parentElement.classList.toggle("active");
    });
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-item")) {
      document.querySelectorAll(".menu-item").forEach((item) => {
        item.classList.remove("active");
      });
    }
  });
});
