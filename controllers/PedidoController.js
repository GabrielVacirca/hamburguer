import Pedido from "../models/Pedido.js";
import Entrega from "../models/Entrega.js";
import Avaliacao from "../models/Avaliacao.js";

const includeRelations = [
    { model: Entrega, as: 'entrega' },
    { model: Avaliacao, as: 'avaliacoes' }
];

const PedidoController = {
    create : async (req, res) =>{
        try{
            const pedido = await Pedido.create(req.body);
            const pedidoComRelacionamentos = await Pedido.findByPk(pedido.id, { include: includeRelations });
            res.status(201).json(pedidoComRelacionamentos);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    findAll : async (req,res) =>{
        try{
            const pedidos = await Pedido.findAll({ include: includeRelations });
            if (pedidos.length === 0){
                throw new Error("Não há pedidos");
            }
            res.status(200).json(pedidos);  
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const pedido = await Pedido.findByPk(req.params.id, { include: includeRelations });
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
            res.status(200).json(pedido);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const pedido = await Pedido.findByPk(req.params.id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
            await pedido.update(req.body);
            const pedidoAtualizado = await Pedido.findByPk(pedido.id, { include: includeRelations });
            res.status(200).json(pedidoAtualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const pedido = await Pedido.findByPk(req.params.id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
            await pedido.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

export default PedidoController;