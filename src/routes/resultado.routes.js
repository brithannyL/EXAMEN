import { Router } from 'express';
import { 
    getResultados, 
    getResultadoById, 
    postResultado, 
    putResultado, 
    deleteResultado 
} from '../controladores/resultadoCtrl.js';

const router = Router();

router.get('/resultado', getResultados); // Obtener todos los resultados
router.get('/resultados/:id', getResultadoById); // Obtener resultado por ID
router.post('/resultados', postResultado); // Crear nuevo resultado
router.put('/resultados/:id', putResultado); // Actualizar resultado completamente
router.delete('/resultados/:id', deleteResultado); // Eliminar resultado

export default router;
