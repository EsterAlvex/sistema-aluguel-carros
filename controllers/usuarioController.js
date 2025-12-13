const models = require("../models");
const bcrypt = require("bcryptjs");

// Rota pública de Cadastro
// Acesso: Qualquer um pode se cadastrar, mas tipo 'Funcionario' exige chave secreta
const cadastroPublico = async (req, res) => {
  const { nome, cnh, email, senha, telefone, endereco, tipo, chaveAdmin } =
    req.body;

  // Validação de tipos permitidos
  if (tipo !== "Cliente" && tipo !== "Funcionario") {
    return res
      .status(400)
      .json({
        mensagem:
          "Tipo de usuário inválido. Escolha 'Cliente' ou 'Funcionario'.",
      });
  }

  // Para segurança - Validação da Chave Mestra (CHAVE_ADMIN)
  if (tipo === "Funcionario") {
    const CHAVE_MESTRA = process.env.CHAVE_ADMIN;

    if (chaveAdmin !== CHAVE_MESTRA) {
      return res.status(403).json({
        mensagem:
          "Erro de segurança: Chave de administrador inválida ou ausente.",
      });
    }
  }

  if (!email || !senha || !nome) {
    return res
      .status(400)
      .json({ mensagem: "Email, senha e nome são obrigatórios." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = await models.Usuario.create({
      nome,
      cnh,
      email,
      senha: senhaHash,
      telefone,
      endereco,
      tipo,
    });

    res.status(201).json({
      mensagem: `${tipo} cadastrado com sucesso!`,
      usuario: {
        id: novoUsuario.id,
        email: novoUsuario.email,
        tipo: novoUsuario.tipo,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ mensagem: "Este e-mail já está cadastrado." });
    }
    console.error(error);
    res
      .status(500)
      .json({ mensagem: "Erro ao cadastrar.", erro: error.message });
  }
};

// Rotas protegidas: Apenas Funcionário
const listarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await models.Usuario.findAll({
      attributes: { exclude: ["senha"] },
      order: [["nome", "ASC"]],
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar usuários.", erro: error.message });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await models.Usuario.findByPk(usuarioId, {
      attributes: { exclude: ["senha"] },
    });
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar usuário.", erro: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const dadosAtualizados = req.body;

  try {
    delete dadosAtualizados.tipo;

    if (dadosAtualizados.senha) {
      const salt = await bcrypt.genSalt(10);
      dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, salt);
    } else {
      delete dadosAtualizados.senha;
    }

    const [linhasAfetadas, [usuarioAtualizado]] = await models.Usuario.update(
      dadosAtualizados,
      {
        where: { id: usuarioId },
        returning: true,
      }
    );

    if (linhasAfetadas === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.status(200).json({
      mensagem: "Usuário atualizado com sucesso.",
      usuario: {
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        tipo: usuarioAtualizado.tipo,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao atualizar usuário.", erro: error.message });
  }
};

const deletarUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const linhasDeletadas = await models.Usuario.destroy({
      where: { id: usuarioId },
    });
    if (linhasDeletadas === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    return res.status(200).json({
      mensagem: "Usuário excluído com sucesso!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao deletar usuário.", erro: error.message });
  }
};

module.exports = {
  cadastroPublico,
  listarTodosUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
};
