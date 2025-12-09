const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await models.Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        tipo: usuario.tipo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
