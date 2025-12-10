const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Servidor
app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
})
