const livros = require('../models/livros.json');
const fs = require('fs');

//Acesso a uma lista completa de todos os livros em estoque
const getAllBooks = (req, res) => {
    console.log(req.url);
    res.status(200).send(livros);
};

const getById = (req, res) => {
    const id = req.params.id;
  
    res.status(200).send(livros.find((livro) => livro.id == id));
  };

////Cadastro de novos livros:
const postBooks = (req, res) => {
    console.log(req.body)
    const { id, title, author, category, inStock } = req.body;
    livros.push({ id, title, author, category, inStock });
  
    fs.writeFile("./src/models/livros.json", JSON.stringify(livros), 'utf8', function(err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo atualizado com sucesso!");
    });
  
    res.status(201).send(livros)
};

////Excluir registo de livro:
const deleteBooks = (req, res) => {
  const id = req.params.id;
  const livroFiltrado = livros.find((livro) => livro.id == id);
  const index = livros.indexOf(livroFiltrado);
  livros.splice(index, 1);

  fs.writeFile("./src/models/livros.json", JSON.stringify(livros), 'utf8', function(err) {
    if (err) {
      return res.status(424).send({ message: err });
    }
    console.log("Arquivo atualizado com sucesso!");
  });

  res.status(200).send(livros)
};

module.exports = { getAllBooks, getById, postBooks, deleteBooks }