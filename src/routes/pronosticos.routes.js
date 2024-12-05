import { Router } from 'express';
import { 
    getPronosticos, 
    getPronosticoById, 
    postPronostico, 
    putPronostico, 
    deletePronostico 
} from '../controladores/pronosticosCtrl.js';

const router = Router();

router.get('/pronosticos', getPronosticos); // Obtener todos los pronósticos
router.get('/pronosticos/:id', getPronosticoById); // Obtener pronóstico por ID
router.post('/pronosticos', postPronostico); // Crear nuevo pronóstico
router.put('/pronosticos/:id', putPronostico); // Actualizar pronóstico completamente
router.delete('/pronosticos/:id', deletePronostico); // Eliminar pronóstico

export default router;
