import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken'

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar usuarios" });
    }
};


export const getUsuarioById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuario WHERE id_usr = ?', [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};


export const postUsuario = async (req, res) => {
    try {
        const { cedula, nombres, direccion, telefono, usuario, clave, per_id } = req.body;

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(clave, salt);

        const [result] = await conmysql.query(
            'INSERT INTO usuario (cedula, nombres, direccion, telefono, usuario, clave, per_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombres, direccion, telefono, usuario, hashedPassword, per_id]
        );

        res.json({ id: result.insertId, message: "Usuario creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};


export const putUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula, nombres, direccion, telefono, usuario, clave, per_id } = req.body;

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(clave, salt);

        const [result] = await conmysql.query(
            'UPDATE usuario SET cedula = ?, nombres = ?, direccion = ?, telefono = ?, usuario = ?, clave = ?, per_id = ? WHERE id_usr = ?',
            [cedula, nombres, direccion, telefono, usuario, hashedPassword, per_id, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const patchUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula, nombres, direccion, telefono, usuario, clave, per_id } = req.body;

        const salt = clave ? await bcrypt.genSalt(10) : null;
        const hashedPassword = clave ? await bcrypt.hash(clave, salt) : null;

        const [result] = await conmysql.query(
            'UPDATE usuario SET cedula = IFNULL(?, cedula), nombres = IFNULL(?, nombres), direccion = IFNULL(?, direccion), telefono = IFNULL(?, telefono), usuario = IFNULL(?, usuario), clave = IFNULL(?, clave), per_id = IFNULL(?, per_id) WHERE id_usr = ?',
            [cedula, nombres, direccion, telefono, usuario, hashedPassword, per_id, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario actualizado parcialmente" });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};


export const deleteUsuario = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM usuario WHERE id_usr = ?', [req.params.id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { usuario, clave } = req.body;

        const [result] = await conmysql.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);

        if (result.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const isPasswordValid = await bcrypt.compare(clave, result[0].clave);
        if (!isPasswordValid) return res.status(401).json({ message: "Contraseña inválida" });

        const token = jwt.sign({ id: result[0].id_usr }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ auth: true, token });
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
