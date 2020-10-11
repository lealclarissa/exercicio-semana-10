const express = require('express');
const router = express.Router();
const controller = require('../controller/funcionariosController');

router.get('/',controller.getAll);
router.get('/age/:id', controller.getEmployeesAge);
router.get("/:id", controller.getById);
router.post("/", controller.postFuncionarios);
router.delete("/:id", controller.deleteFuncionario);

module.exports = router;