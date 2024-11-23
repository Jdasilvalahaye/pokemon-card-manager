import TCGdex from "@tcgdex/sdk";
import fs from "fs";

// Instancier le SDK
const tcgdex = new TCGdex("fr");

// Entrer dans un contexte async
(async () => {
  try {
    // Récupérer les informations du set
    const set = await tcgdex.fetch("sets", "sv04");

    // Modifier l'URL de l'image pour chaque carte du set
    const modifiedCards = set.cards.map((card) => {
      return {
        ...card,
        image: card.image + "/high.webp", // Ajouter /high.webp à l'URL de l'image
      };
    });

    // Créer le contenu à écrire dans le fichier JavaScript
    const fileContent = `export const evFailleParadoxe = {
  cardCount: ${JSON.stringify(set.cardCount, null, 2)},
  cards: ${JSON.stringify(modifiedCards, null, 2)}
};`;

    // Écrire les cartes modifiées dans un fichier JavaScript
    fs.writeFile("ev4FailleParadoxe.js", fileContent, (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JavaScript :", err);
      } else {
        console.log("Le fichier JavaScript a été créé avec succès !");
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes :", error);
  }
})();
