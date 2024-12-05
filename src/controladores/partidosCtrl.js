import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken'

export const getPartidos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM partido');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los partidos" });
    }
};
export const getPartidosById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM partido WHERE id_par = ?', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ message: "Partido no encontrado" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el partido" });
    }
};
export const postPartidos = async (req, res) => {
    try {
        const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO partido (eq_uno, eq_dos, fecha_par, id_res, estado_par) VALUES (?, ?, ?, ?, ?)',
            [eq_uno, eq_dos, fecha_par, id_res || null, estado_par || 'activo']
        );
        res.json({ id: result.insertId, message: "Partido creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el partido" });
    }
};
export const putPartidos = async (req, res) => {
    try {
        const { id } = req.params;
        const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;
        const [result] = await conmysql.query(
            'UPDATE partido SET eq_uno = ?, eq_dos = ?, fecha_par = ?, id_res = ?, estado_par = ? WHERE id_par = ?',
            [eq_uno, eq_dos, fecha_par, id_res, estado_par, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Partido no encontrado" });

        res.json({ message: "Partido actualizado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el partido" });
    }
};
export const deletePartidos = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await conmysql.query('DELETE FROM partido WHERE id_par = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Partido no encontrado" });

        res.json({ message: "Partido eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el partido" });
    }
};
