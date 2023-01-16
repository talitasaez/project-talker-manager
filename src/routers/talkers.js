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

talkerRouter.get('/talker/search', validarTokenTalker, async (req, res) => {
  const searchTerm = req.query.q;
  const allTalker = await getAllTalker();
  if (!searchTerm) return res.status(200).json(allTalker);
  
  const hasTalker = allTalker.filter((e) => e.name.includes(searchTerm));
  if (!hasTalker) return res.status(200).json([]);
  return res.status(200).json(hasTalker);
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
validarRateTalker,
validarWatchedAtTalker,

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

talkerRouter.delete('/talker/:id', validarTokenTalker, async (req, res) => {
const { id } = req.params;
const allTalker = await getAllTalker();
const talkerId = allTalker.find((e) => e.id !== id);
await writeTalker(talkerId);
return res.status(204).end();
});
 
  module.exports = talkerRouter;