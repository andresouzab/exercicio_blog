const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const Usuarios = require('../model/Usuarios');
const Posts = require('../model/Posts');
sequelize.sync();  
//GET Retorna os usuarios com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM Usuarios ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
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

//GET Consulta um usuario pelo ID
router.get('/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM Usuarios WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
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

//POST Cria um usuario
router.post('/', async (req, res) => {
    sequelize.query(`INSERT INTO Usuarios (nome, email, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?)`,
        { replacements: [req.body.nome, req.body.email, new Date(), new Date()] }
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//PUT Atualiza um usuario pelo ID
router.put('/:id', async (req, res) => {
    sequelize.query(`UPDATE Usuarios SET nome = ? WHERE id = ?`,
        { replacements: [req.body.nome, req.params.id] }
    )
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                message: "Tarefa atualizada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//DELETE Deleta um usuario pelo ID
router.delete('/:id', async (req, res) => {
    sequelize.query(`DELETE FROM Usuarios WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                message: "Tarefa deletada com sucesso",
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
