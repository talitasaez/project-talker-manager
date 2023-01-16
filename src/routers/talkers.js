const express = require('express');

const { getAllTalker } = require('../fsUtils');

const { writeTalker } = require('../fsUtils');

const autorizarTalkers = require('../middlewares/talker/authorization.talker');
// const validarTokenTalker = require('../middlewares/talker/validarTokenTalker');
const validarNameTalker = require('../middlewares/talker/validarNameTalker');
const validarAgeTalker = require('../middlewares/talker/validarAgeTalker');
const validarWatchedAtTalker = require('../middlewares/talker/validarWatchedAtTalker');
const validarRateTalker = require('../middlewares/talker/validarRateTalker');
const validarTalk = require('../middlewares/talker/validarTalk');

const talkerRouter = express.Router();
talkerRouter.get('/talker', async (req, res) => {
    const talker = await getAllTalker();
    res.status(200).json(talker);
    if (talker === null) return [];
  });

  talkerRouter.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await getAllTalker();
    const talkerId = talker.find((e) => e.id === Number(id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerId);
});

talkerRouter.post('/talker',
autorizarTalkers,
// validarTokenTalker,
validarNameTalker,
validarAgeTalker,
validarTalk,
validarWatchedAtTalker,
validarRateTalker,
async (req, res) => {
const addNewPost = await writeTalker(req.body);
return res.status(201).json(addNewPost);
});
  
  module.exports = talkerRouter;