const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const Usuarios = require('../model/Usuarios');
const Posts = require('../model/Posts');
sequelize.sync();  
//GET Retorna posts com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM Posts ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
        { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
    )
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//GET Consulta um post pelo ID
router.get('/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM Posts WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "Post não encontrado",
            });
        } else {
            res.json({
                success: true,
                task: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//POST Cria um post
router.post('/', async (req, res) => {
    sequelize.query(`INSERT INTO Posts (titulo, conteudo, autor_id, data_publicacao, data_atualizacao) VALUES (?, ?, ?, ?, ?)`,
        { replacements: [req.body.titulo, req.body.conteudo, req.body.autor_id, new Date(), new Date()] }
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            success: true,
            message: "Post criado com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//PUT Atualiza um post pelo ID
router.put('/:id', async (req, res) => {
    sequelize.query(`UPDATE Posts SET titulo = ? WHERE id = ?`,
        { replacements: [req.body.titulo, req.params.id] }
    )
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Post não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Post atualizado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//DELETE Deleta um post pelo ID
router.delete('/:id', async (req, res) => {
    sequelize.query(`DELETE FROM Posts WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "Post não encontrado",
            });
        } else {
            res.json({
                success: true,
                message: "Post deletado com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

module.exports = router;
