const livros = require('../models/livros.json');
const fs = require('fs');

const getAllBooks = (req, res) => {
  console.log(req.url);
  res.status(200).send(livros);
};

const getById = (req, res) => {
  const id = req.params.id;

  res.status(200).send(livros.find((livro) => livro.id == id));
};

const postBooks = (req, res) => {
  console.log(req.body)
  const { id, title, author, category, inStock } = req.body;
  livros.push({ id, title, author, category, inStock });

  fs.writeFile("./src/models/livros.json", JSON.stringify(livros), 'utf8', function (err) {
    if (err) {
      return res.status(424).send({ message: err });
    }
    console.log("Arquivo atualizado com sucesso!");
  });

  res.status(201).send(livros)
};

const deleteBooks = (req, res) => {
  const id = req.params.id;
  const livroFiltrado = livros.find((livro) => livro.id == id);
  const index = livros.indexOf(livroFiltrado);
  livros.splice(index, 1);

  fs.writeFile("./src/models/livros.json", JSON.stringify(livros), 'utf8', function (err) {
    if (err) {
      return res.status(424).send({ message: err });
    }
    console.log("Arquivo atualizado com sucesso!");
  });

  res.status(200).send(livros)
};

const getBooksByCategory = (req, res) => {
  const category = req.params.category
  const livroPorCategoria = livros.filter((livro) => livro.category == category);

  res.status(200).send({ livroPorCategoria })

};

const putBooks = (req, res) => {
  try {
    const id = req.params.id;

    const livroASerModificado = livros.find((livro) => livro.id == id);
    console.log(livroASerModificado);

    const livroAtualizado = req.body;
    console.log(livroAtualizado);

    const index = livros.indexOf(livroASerModificado);
    console.log(index);

    livros.splice(index, 1, livroAtualizado);
    console.log(livros);

    fs.writeFile("./src/models/livros.json", JSON.stringify(livros), 'utf8', function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo atualizado com sucesso!");
    });

    res.status(200).send(livros);
  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

const patchBooks = (req, res) => {
  const id = req.params.id;
  const atualizacao = req.body;
  console.log(atualizacao)

  try {
    const livroModificado = livros.find((livro) => livro.id == id);

    Object.keys(atualizacao).forEach((chave) => {
      livroModificado[chave] = atualizacao[chave]
    })

    fs.writeFile("./src/models/livros.json", JSON.stringify(livros), 'utf8', function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo atualizado com sucesso!")
    });

    return res.status(200).send(livros);
  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

module.exports = { getAllBooks, getById, postBooks, deleteBooks, getBooksByCategory, putBooks, patchBooks }