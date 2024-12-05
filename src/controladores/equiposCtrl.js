import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken'

export const getEquipos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM equipo');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los equipos" });
    }
};
export const getEquipoById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM equipo WHERE id_eq = ?', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ message: "Equipo no encontrado" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el equipo" });
    }
};
export const postEquipo = async (req, res) => {
    try {
        const { nombre_eq, ciudad_eq } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO equipo (nombre_eq, ciudad_eq) VALUES (?, ?)', 
            [nombre_eq, ciudad_eq]
        );
        res.json({ id: result.insertId, message: "Equipo creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el equipo" });
    }
};
export const putEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_eq, ciudad_eq } = req.body;
        const [result] = await conmysql.query(
            'UPDATE equipo SET nombre_eq = ?, ciudad_eq = ? WHERE id_eq = ?', 
            [nombre_eq, ciudad_eq, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Equipo no encontrado" });

        res.json({ message: "Equipo actualizado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el equipo" });
    }
};
export const deleteEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await conmysql.query('DELETE FROM equipo WHERE id_eq = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Equipo no encontrado" });

        res.json({ message: "Equipo eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el equipo" });
    }
};
