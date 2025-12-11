require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

//Rota Principal
app.get('/', (req, res) => {
    res.send("Bem vindo a Loja EasyCar").status(200);
});

//Usuarios e perfis


// Servidor
app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
})
