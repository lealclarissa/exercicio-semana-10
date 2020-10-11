const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send({
        title: "Reprograma - On7 Backend - API para Livraria",
        version: "1.1.0"
    })
})

module.exports = router