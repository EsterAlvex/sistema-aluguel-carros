require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const usuarioRoutes = require('./routes/usuarioRoutes');
const autenticacaoRoutes = require('./routes/autenticacaoRoutes');

app.use(express.json()); 



// 2. ROTAS
app.use("/usuarios", usuarioRoutes); 

// Servidor
const PORT = process.env.PORT || 3000;
const JWT = process.env.JWT_SECRET;


app.use('/', autenticacaoRoutes); 
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
    res.send("Bem vindo a API do sistema Drive Easy").status(200);
});





app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`)
})