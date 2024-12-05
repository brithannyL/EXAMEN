import { conmysql } from '../db.js';

export const getResultados = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM resultado');
        res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los resultados" });
    }
};

export const getResultadoById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM resultado WHERE id_res = ?', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ message: "Resultado no encontrado" });
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el resultado" });
    }
};

export const postResultado = async (req, res) => {
    try {
        const { descripcion_res } = req.body;
        if (!descripcion_res) {
            return res.status(400).json({ message: "La descripción del resultado es requerida" });
        }
        const [result] = await conmysql.query(
            'INSERT INTO resultado (descripcion_res) VALUES (?)',
            [descripcion_res]
        );
        res.json({ id: result.insertId, message: "Resultado creado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el resultado" });
    }
};

export const putResultado = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion_res } = req.body;
        if (!descripcion_res) {
            return res.status(400).json({ message: "La descripción del resultado es requerida" });
        }

        const [result] = await conmysql.query(
            'UPDATE resultado SET descripcion_res = ? WHERE id_res = ?',
            [descripcion_res, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Resultado no encontrado" });

        res.json({ message: "Resultado actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el resultado" });
    }
};

export const deleteResultado = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await conmysql.query('DELETE FROM resultado WHERE id_res = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Resultado no encontrado" });

        res.json({ message: "Resultado eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar el resultado" });
    }
};
