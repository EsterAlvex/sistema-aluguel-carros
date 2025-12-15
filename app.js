require('dotenv').config();
const express = require('express');
const app = express();

// Servidor
const PORT = process.env.PORT || 3000;

// Importar Módulos de Rotas 
const usuarioRoutes = require('./routes/usuarioRoutes');
const publicRoutes = require('./routes/publicRoutes');
const carroRoutes = require("./routes/carroRoutes");
const locacaoRoutes = require('./routes/locacaoRoutes');

app.use(express.json()); 

// ROTAS PÚBLICAS: Lida com /login e /cadastro
app.use('/', publicRoutes); 

// ROTAS PROTEGIDAS: Usuários
app.use('/listar/usuarios', usuarioRoutes);
app.use('/buscar', usuarioRoutes);
app.use('/atualizar', usuarioRoutes);
app.use('/deletar', usuarioRoutes);

// ROTAS PROTEGIDAS: Carros
app.use('/carros', carroRoutes);

// ROTAS PROTEGIDAS: LOCAÇÃO
app.use('/locacoes', locacaoRoutes);

// Rota Principal 
app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema Drive Easy").status(200);
});

app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
});