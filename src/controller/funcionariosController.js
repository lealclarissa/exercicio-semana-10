const funcionarios = require('../models/funcionarios.json');
const fs = require('fs');

const getAll = (req, res) => {
  console.log(req.url);
  res.status(200).send(funcionarios);
};

const getById = (req, res) => {
  const id = req.params.id;

  res.status(200).send(funcionarios.find((funcionario) => funcionario.id == id));
};

const postFuncionarios = (req, res) => {
  console.log(req.body)
  const { id, name, position, age, accessToTheSystem } = req.body;
  funcionarios.push({ id, name, position, age, accessToTheSystem });

  fs.writeFile("./src/models/funcionarios.json", JSON.stringify(funcionarios), 'utf8', function (err) {
    if (err) {
      return res.status(424).send({ message: err });
    }
    console.log("Arquivo atualizado com sucesso!");
  });

  res.status(201).send(funcionarios)
};

const deleteFuncionario = (req, res) => {
  const id = req.params.id;
  const funcionarioFiltrado = funcionarios.find((funcionario) => funcionario.id == id);
  const index = funcionarios.indexOf(funcionarioFiltrado);
  funcionarios.splice(index, 1);

  fs.writeFile("./src/models/funcionarios.json", JSON.stringify(funcionarios), 'utf8', function (err) {
    if (err) {
      return res.status(424).send({ message: err });
    }
    console.log("Arquivo atualizado com sucesso!");
  });

  res.status(200).send(funcionarios)
};

const getEmployeesAge = (req, res) => {
  const id = req.params.id
  const funcionarioFiltrado = funcionarios.find((funcionario) => funcionario.id == id);
  const nomeDoFuncionario = funcionarioFiltrado.name
  const idadeDoFuncionario = funcionarioFiltrado.age

  res.status(200).send({ nomeDoFuncionario, idadeDoFuncionario })
};

const putFuncionarios = (req, res) => {
  try {
    const id = req.params.id;

    const funcionarioASerModificado = funcionarios.find((funcionario) => funcionario.id == id);
    console.log(funcionarioASerModificado);

    const funcionarioAtualizado = req.body;
    console.log(funcionarioAtualizado);

    const index = funcionarios.indexOf(funcionarioASerModificado);
    console.log(index);

    funcionarios.splice(index, 1, funcionarioAtualizado);
    console.log(funcionarios);

    fs.writeFile("./src/models/funcionarios.json", JSON.stringify(funcionarios), 'utf8', function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo atualizado com sucesso!");
    });

    res.status(200).send(funcionarios);
  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

const patchFuncionarios = (req, res) => {
  const id = req.params.id;
  const update = req.body;
  console.log(update)

  try {
    const funcionarioASerModificado = funcionarios.find((funcionario) => funcionario.id == id);

    //Ele vai buscar dentro do objeto funcionarioASerModificado atributos em que o nome coincida com os do objeto update, e vai substituir o valor

    Object.keys(update).forEach((chave) => {
      funcionarioASerModificado[chave] = update[chave]
    })

    fs.writeFile("./src/models/funcionarios.json", JSON.stringify(funcionarios), 'utf8', function (err) {
      if (err) {
        return res.status(424).send({ message: err });
      }
      console.log("Arquivo atualizado com sucesso!")
    });

    return res.status(200).send(funcionarios);
  } catch (err) {
    return res.status(424).send({ message: err });
  }
};

module.exports = { getAll, getById, postFuncionarios, deleteFuncionario, getEmployeesAge, putFuncionarios, patchFuncionarios };