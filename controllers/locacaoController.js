const models = require('../models');

// Criar uma nova locação
// Apenas funcionários podem registrar locações
const criarLocacao = async (req, res) => {
    const { cliente_id, carro_id, data_inicio, data_fim, valor } = req.body;
    
    // O ID do funcionário vem do token de autenticação (req.usuario)
    const funcionario_id = req.usuario.id; 

    try {
        // 1. Verificar se o Carro existe e está disponível
        const carro = await models.Carro.findByPk(carro_id);
        if (!carro) {
            return res.status(404).json({ mensagem: "Carro não encontrado." });
        }
        if (carro.status !== 'Disponivel') {
            return res.status(400).json({ mensagem: "Este carro não está disponível para locação." });
        }

        // 2. Verificar se o Cliente existe
        const cliente = await models.Usuario.findByPk(cliente_id);
        if (!cliente || cliente.tipo !== 'Cliente') {
            return res.status(400).json({ mensagem: "Cliente inválido ou não encontrado." });
        }

        // 3. Criar a Locação
        const novaLocacao = await models.Locacao.create({
            cliente_id,
            carro_id,
            funcionario_id,
            data_inicio,
            data_fim,
            valor
        });

        // 4. Atualizar status do Carro para 'Alugado'
        await carro.update({ status: 'Alugado' });

        res.status(201).json({
            mensagem: "Locação registrada com sucesso.",
            locacao: novaLocacao
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao registrar locação.", erro: error.message });
    }
};

// Listar todas as locações
const listarLocacoes = async (req, res) => {
    try {
        const locacoes = await models.Locacao.findAll({
            include: [
                { 
                    model: models.Carro, 
                    as: 'carro', 
                    attributes: ['modelo', 'placa', 'marca'] 
                },
                { 
                    model: models.Usuario, 
                    as: 'cliente', 
                    attributes: ['nome', 'email', 'cnh'] 
                },
                { 
                    model: models.Usuario, 
                    as: 'funcionario', 
                    attributes: ['nome'] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(locacoes);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar locações.", erro: error.message });
    }
};

// Buscar locação por ID
const buscarLocacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const locacao = await models.Locacao.findByPk(id, {
            include: [
                { model: models.Carro, as: 'carro' },
                { model: models.Usuario, as: 'cliente', attributes: ['nome'] },
                { model: models.Usuario, as: 'funcionario', attributes: ['nome'] }
            ]
        });

        if (!locacao) {
            return res.status(404).json({ mensagem: "Locação não encontrada." });
        }

        res.status(200).json(locacao);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar locação.", erro: error.message });
    }
};

// Atualizar Locação (ex: estender data ou mudar valor)
const atualizarLocacao = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const [linhasAfetadas] = await models.Locacao.update(dadosAtualizados, {
            where: { id }
        });

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Locação não encontrada." });
        }

        res.status(200).json({ mensagem: "Locação atualizada com sucesso." });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar locação.", erro: error.message });
    }
};

// Deletar Locação (Cancelamento)
const deletarLocacao = async (req, res) => {
    const { id } = req.params;
    try {
        const locacao = await models.Locacao.findByPk(id);

        if (!locacao) {
            return res.status(404).json({ mensagem: "Locação não encontrada." });
        }

        // Antes de deletar, libera o carro novamente para 'Disponivel'
        const carro = await models.Carro.findByPk(locacao.carro_id);
        if (carro) {
            await carro.update({ status: 'Disponivel' });
        }

        await locacao.destroy();

        return res.status(200).json({ mensagem: "Locação cancelada e excluída com sucesso." });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao deletar locação.", erro: error.message });
    }
};

// Exportando
module.exports = {
    criarLocacao,
    listarLocacoes,
    buscarLocacaoPorId,
    atualizarLocacao,
    deletarLocacao
};