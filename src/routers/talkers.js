const express = require('express');

const { getAllTalker } = require('../fsUtils');

const { writeTalker } = require('../fsUtils');

const validarTokenTalker = require('../middlewares/talker/validarTokenTalker');
const autorizarTalkers = require('../middlewares/talker/authorization.talker');
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
validarTokenTalker,
autorizarTalkers,
validarNameTalker,
validarAgeTalker,
validarTalk,
validarWatchedAtTalker,
validarRateTalker,
async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const allTalker = await getAllTalker();
  const postTalker = {
    id: allTalker.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const newtalker = [...allTalker, postTalker];
  await writeTalker(newtalker);
  return res.status(201).json(postTalker);
});

talkerRouter.put('/talker/:id',
validarTokenTalker,
autorizarTalkers,
validarNameTalker,
validarAgeTalker,
validarTalk,
validarWatchedAtTalker,
validarRateTalker,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const allTalker = await getAllTalker();
  const putTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const talkerId = allTalker.filter((e) => e.id !== id);
  talkerId.push(putTalker);
  await writeTalker(talkerId);
  return res.status(200).json(putTalker);
});
  
  module.exports = talkerRouter;