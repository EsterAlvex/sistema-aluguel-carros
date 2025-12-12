const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  async create(req, res) {
    try {
      const senhaHash = await bcrypt.hash(req.body.senha, 10);
      const usuario = await Usuario.create({ ...req.body, senha: senhaHash });
      return res.status(201).json(usuario);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async list(req, res) {
    const usuarios = await Usuario.findAll();
    return res.json(usuarios);
  },

  async findOne(req, res) {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(usuario);
  },

  async update(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

      await usuario.update(req.body);
      return res.json(usuario);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    await usuario.destroy();
    return res.json({ message: "Usuário removido" });
  },

  async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: "Email não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  },
};
