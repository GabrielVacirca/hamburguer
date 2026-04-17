import Avaliacao from '../models/Avaliacao.js';
import Pedido from '../models/Pedido.js';

class AvaliacaoController {
    async index(req, res) {
        try {
            const avaliacoes = await Avaliacao.findAll({ include: [{ model: Pedido, as: 'pedido' }] });
            res.status(200).json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id, { include: [{ model: Pedido, as: 'pedido' }] });
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao não encontrada' });
            }
            res.status(200).json(avaliacao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async store(req, res) {
        try {
            const { nota } = req.body;
            if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
                return res.status(400).json({ error: 'A nota deve ser um número inteiro entre 1 e 5' });
            }
            const avaliacao = await Avaliacao.create(req.body);
            const avaliacaoCriada = await Avaliacao.findByPk(avaliacao.id, { include: [{ model: Pedido, as: 'pedido' }] });
            res.status(201).json(avaliacaoCriada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { nota } = req.body;
            if (nota !== undefined && (!Number.isInteger(nota) || nota < 1 || nota > 5)) {
                return res.status(400).json({ error: 'A nota deve ser um número inteiro entre 1 e 5' });
            }
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao não encontrada' });
            }
            await avaliacao.update(req.body);
            const avaliacaoAtualizada = await Avaliacao.findByPk(avaliacao.id, { include: [{ model: Pedido, as: 'pedido' }] });
            res.status(200).json(avaliacaoAtualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async destroy(req, res) {
        try {
            const avaliacao = await Avaliacao.findByPk(req.params.id);
            if (!avaliacao) {
                return res.status(404).json({ error: 'Avaliacao não encontrada' });
            }
            await avaliacao.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new AvaliacaoController();
