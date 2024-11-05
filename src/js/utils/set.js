import TCGdex from "@tcgdex/sdk";
import fs from "fs";

// Instancier le SDK
const tcgdex = new TCGdex("fr");

// Entrer dans un contexte async
(async () => {
  try {
    // Récupérer les informations du set "swsh3" (Ténèbres Embrasées)
    const sets = await tcgdex.fetch("sets");

    // Convertir l'objet sets en une chaîne JSON
    const jsonSets = JSON.stringify(sets, null, 2); // null et 2 sont pour l'indentation (lisibilité)

    // Écrire les cartes modifiées dans un fichier JSON
    fs.writeFile("sets.json", jsonSets, (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JSON :", err);
      } else {
        console.log("Le fichier JSON a été créé avec succès !");
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes :", error);
  }
})();
