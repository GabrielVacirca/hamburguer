import { Router } from 'express';
import PedidoController from '../controllers/PedidoController.js';

const router = Router();

router.post('/', PedidoController.create);
router.get('/', PedidoController.findAll);
router.get('/:id', PedidoController.findById);
router.put('/:id', PedidoController.update);
router.delete('/:id', PedidoController.delete);

export default router;
