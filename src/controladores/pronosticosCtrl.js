import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken'
export const getPronosticos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pronostico');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los pronósticos" });
    }
};
export const getPronosticoById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pronostico WHERE id_pron = ?', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ message: "Pronóstico no encontrado" });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el pronóstico" });
    }
};
export const postPronostico = async (req, res) => {
    try {
        const { id_usr, id_par, id_res, valor, fecha_registro } = req.body;
        const [result] = await conmysql.query(
            'INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) VALUES (?, ?, ?, ?, ?)',
            [id_usr, id_par, id_res, valor, fecha_registro || new Date()]
        );
        res.json({ id: result.insertId, message: "Pronóstico creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el pronóstico" });
    }
};
export const putPronostico = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usr, id_par, id_res, valor, fecha_registro } = req.body;
        const [result] = await conmysql.query(
            'UPDATE pronostico SET id_usr = ?, id_par = ?, id_res = ?, valor = ?, fecha_registro = ? WHERE id_pron = ?',
            [id_usr, id_par, id_res, valor, fecha_registro, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Pronóstico no encontrado" });

        res.json({ message: "Pronóstico actualizado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el pronóstico" });
    }
};
export const deletePronostico = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await conmysql.query('DELETE FROM pronostico WHERE id_pron = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Pronóstico no encontrado" });

        res.json({ message: "Pronóstico eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el pronóstico" });
    }
};
