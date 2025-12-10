require('dotenv').config();
const express = require('express');
const app = express();

// Servidor
const PORT = process.env.PORT || 3000;

// Importar Módulos de Rotas 
const usuarioRoutes = require('./routes/usuarioRoutes');
const publicRoutes = require('./routes/publicRoutes');
const locacaoRoutes = require('./routes/locacaoRoutes');

app.use(express.json()); 

// ROTAS PÚBLICAS: Lida com /login e /cadastro
app.use('/', publicRoutes); 

// ROTAS PROTEGIDAS: Lida com /api/usuarios, etc.
app.use('/api/usuarios', usuarioRoutes);

// Rota Principal 
app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema Drive Easy").status(200);
});

// ROTAS PROTEGIDAS: LOCAÇÃO
app.use('/api/locacoes', locacaoRoutes);

app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
});