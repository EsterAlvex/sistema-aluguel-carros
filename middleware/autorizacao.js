const eFuncionario = (req, res, next) => {
    if (!req.usuario || req.usuario.tipo !== 'Funcionario') { 
        return res.status(403).json({ mensagem: "Acesso negado. Ação exclusiva para Funcionários." });
    }
    next();
};


module.exports = { eFuncionario };