import { evFailleParadoxe } from "../extensions/ecarlateViolet/ev4FailleParadoxe.js";
import axios from "axios";
import fs from "fs";
import path from "path";

// Vérifier si le dossier "assets" existe, sinon le créer
const assetsDir = path.resolve("assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// Fonction pour télécharger une image
const downloadImage = async (url, outputPath) => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    // Écrire le fichier téléchargé dans le chemin spécifié
    response.data.pipe(fs.createWriteStream(outputPath));

    // Retourner une promesse qui se résout une fois l'écriture terminée
    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        console.log(`Image téléchargée : ${outputPath}`);
        resolve();
      });

      response.data.on("error", (err) => {
        console.error(`Erreur lors du téléchargement de l'image : ${url}`);
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Erreur lors de la requête pour ${url}: `, error.message);
  }
};

// Télécharger toutes les images des cartes du set
(async () => {
  for (const card of evFailleParadoxe.cards) {
    const fileName = `${card.id}-${card.name.replace(/ /g, "_")}.webp`;
    const outputPath = path.join(assetsDir, fileName);

    await downloadImage(card.image, outputPath);
  }
})();
