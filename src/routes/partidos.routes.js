import { Router } from 'express';
import { 
    getPartidos, 
    getPartidosById, 
    postPartidos, 
    putPartidos, 
    deletePartidos 
} from '../controladores/partidosCtrl.js';

const router = Router();

// Ruta para obtener todos los partidos
router.get('/partidos', getPartidos);

// Ruta para obtener un partido por su ID
router.get('/partidos/:id', getPartidosById);

// Ruta para crear un nuevo partido
router.post('/partidos', postPartidos);

// Ruta para actualizar un partido existente
router.put('/partidos/:id', putPartidos);

// Ruta para eliminar un partido
router.delete('/partidos/:id', deletePartidos);

export default router;
