import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuarioById,  // Corrección del nombre de la función
    postUsuario, 
    putUsuario, 
    patchUsuario, 
    deleteUsuario, 
    login 
} from '../controladores/usuariosCtrl.js';
import { verifyToken } from '../jtw/auth.js';

const router = Router();

router.get('/usuarios', verifyToken, getUsuarios); // Obtener todos los usuarios
router.get('/usuarios/:id', verifyToken, getUsuarioById); // Obtener usuario por ID
router.post('/usuarios', postUsuario);  // Crear usuario
router.put('/usuarios/:id', verifyToken, putUsuario); // Actualizar usuario completamente
router.patch('/usuarios/:id', verifyToken, patchUsuario); // Actualizar usuario parcialmente
router.delete('/usuarios/:id', verifyToken, deleteUsuario); // Eliminar usuario
router.post('/login', login);  // Iniciar sesión

export default router;
