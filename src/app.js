const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index');
const funcionarios = require('./routes/funcionariosRoute');
const livros = require('./routes/livrosRoute');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use('/', index);
app.use('/funcionarios', funcionarios);
app.use('/livros', livros)

module.exports = app