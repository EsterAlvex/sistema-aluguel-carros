const jwt = require('jsonwebtoken');
const models = require('../models');

const autenticar = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token de acesso não fornecido.' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ mensagem: 'Formato do token inválido (esperado: Bearer [token]).' });
    }

    try {
        // Verifica a validade do token usando a chave secreta
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        // Busca o usuário no banco pelo ID do token
        const usuario = await models.Usuario.findByPk(payload.id, {
            // Seleciona apenas os atributos necessários para autorização e identificação
            attributes: ['id', 'nome', 'email', 'tipo'] 
        });

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário do token não encontrado no banco de dados.' });
        }

        // Anexa o objeto do usuário (com o tipo!) à requisição
        req.usuario = usuario; 
        
        next();
    } catch (error) {
        // Trata erros como token expirado ou inválido
        return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
};

module.exports = { autenticar };