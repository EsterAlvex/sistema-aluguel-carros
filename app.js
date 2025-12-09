require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Servidor
const PORT = process.env.PORT || 3000;
const JWT = process.env.JWT_SECRET;

// Rota Principal 
app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema Drive Easy").status(200);
});

//Usuarios e perfis


app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
});