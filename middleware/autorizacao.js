const eFuncionario = (req, res, next) => {
    if (!req.usuario || req.usuario.tipo !== 'Funcionario') { 
        return res.status(403).json({ mensagem: "Acesso negado. Ação exclusiva para Funcionários." });
    }
    next();
};

const eCliente = (req, res, next) => {
    
    if (!req.usuario || req.usuario.tipo !== 'Cliente') {
        return res.status(403).json({ mensagem: "Acesso negado. Ação exclusiva para Clientes." });
    }
    next();
};

module.exports = { eFuncionario, eCliente };