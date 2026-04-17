import { Router } from 'express';
import AvaliacaoController from '../controllers/AvaliacaoController.js';

const router = Router();

router.post('/', AvaliacaoController.store);
router.get('/', AvaliacaoController.index);
router.get('/:id', AvaliacaoController.show);
router.put('/:id', AvaliacaoController.update);
router.delete('/:id', AvaliacaoController.destroy);

export default router;
