import { Router } from 'express';
import { 
    getEquipos, 
    getEquipoById, 
    postEquipo, 
    putEquipo, 
    deleteEquipo 
} from '../controladores/equiposCtrl.js';

const router = Router();

// Ruta para obtener todos los equipos
router.get('/equipos', getEquipos);

// Ruta para obtener un equipo por su ID
router.get('/equipos/:id', getEquipoById);

// Ruta para crear un nuevo equipo
router.post('/equipos', postEquipo);

// Ruta para actualizar un equipo existente
router.put('/equipos/:id', putEquipo);

// Ruta para eliminar un equipo
router.delete('/equipos/:id', deleteEquipo);

export default router;
