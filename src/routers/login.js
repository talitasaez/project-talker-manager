const express = require('express');

const token = require('../middlewares/token');
const validarEmail = require('../middlewares/validarEmailLogin');
const validarSenha = require('../middlewares/validarSenhaLogin');

const loginRouter = express.Router();

loginRouter.post('/login', validarEmail, validarSenha, (_req, res) => {
    const validationToken = token();
    res.status(200).json({ validationToken });
  });

module.exports = loginRouter;