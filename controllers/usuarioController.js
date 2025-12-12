// src/controllers/usuarioController.js

const models = require('../models');
const bcrypt = require('bcryptjs');

// --- 1. Rota POST /api/usuarios (Criação de Cliente) ---
// Acesso: Exclusivo para Funcionário
exports.criarUsuario = async (req, res) => {
    const { nome, cnh, email, senha, telefone, endereco } = req.body;
    const tipoUsuario = 'Cliente'; // Tipo Fixo: A rota de Funcionário só pode criar Clientes

    if (!email || !senha || !nome) {
        return res.status(400).json({ mensagem: "Email, senha e nome são obrigatórios." });
    }

    try {
        // Criptografa a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = await models.Usuario.create({
            nome,
            cnh,
            email,
            senha: senhaHash,
            telefone,
            endereco,
            tipo: tipoUsuario
        });

        res.status(201).json({
            mensagem: `Cliente ${novoUsuario.nome} cadastrado com sucesso.`,
            usuario: { 
                id: novoUsuario.id, 
                email: novoUsuario.email, 
                tipo: novoUsuario.tipo 
            }
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ mensagem: "Este e-mail já está cadastrado." });
        }
        res.status(500).json({ mensagem: "Erro ao cadastrar usuário.", erro: error.message });
    }
};


// --- 2. Rota GET /api/usuarios (Listagem de Todos) ---
// Acesso: Exclusivo para Funcionário
exports.listarTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await models.Usuario.findAll({
            // Exclui a senha de todos os resultados para segurança
            attributes: { exclude: ['senha'] }, 
            order: [['nome', 'ASC']]
        });

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários.", erro: error.message });
    }
};


// --- 3. Rota GET /api/usuarios/:id OU /api/perfis-clientes/:id (Detalhes) ---
// Acesso: Exclusivo para Funcionário
exports.buscarUsuarioPorId = async (req, res) => {
    const usuarioId = req.params.id;
    try {
        const usuario = await models.Usuario.findByPk(usuarioId, {
            // Exclui a senha
            attributes: { exclude: ['senha'] } 
        });

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuário.", erro: error.message });
    }
};


// --- 4. Rota PUT /api/usuarios/:id (Atualização) ---
// Acesso: Exclusivo para Funcionário
exports.atualizarUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    const dadosAtualizados = req.body;

    try {
        // 1. SEGURANÇA: Impede que o funcionário mude o TIPO de usuário
        // e impede que mude a senha sem o hash.
        delete dadosAtualizados.tipo;
        
        if (dadosAtualizados.senha) {
             const senhaHash = await bcrypt.hash(dadosAtualizados.senha, 10);
             dadosAtualizados.senha = senhaHash;
        } else {
             delete dadosAtualizados.senha;
        }
        // 

        const [linhasAfetadas, [usuarioAtualizado]] = await models.Usuario.update(dadosAtualizados, {
            where: { id: usuarioId },
            returning: true // Retorna a linha atualizada (útil para Sequelize v5+)
        });

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso.",
            usuario: { 
                id: usuarioAtualizado.id, 
                nome: usuarioAtualizado.nome, 
                email: usuarioAtualizado.email,
                tipo: usuarioAtualizado.tipo // Retorna o tipo (não foi alterado)
            }
        });

    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar usuário.", erro: error.message });
    }
};


// --- 5. Rota DELETE /api/usuarios/:id (Deleção) ---
// Acesso: Exclusivo para Funcionário
exports.deletarUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    try {
        const linhasDeletadas = await models.Usuario.destroy({
            where: { id: usuarioId }
        });

        if (linhasDeletadas === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        res.status(204).send(); // 204 No Content para deleções bem-sucedidas

    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao deletar usuário.", erro: error.message });
    }
};