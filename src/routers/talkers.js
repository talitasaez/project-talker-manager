const express = require('express');

const { getAllTalker } = require('../fsUtils');

// const { writeTalker } = require('../fsUtils');

const talkerRouter = express.Router();

talkerRouter.get('/talker', async (req, res) => {
    console.log(req);
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

// talkerRouter.post('/talker', async (req, res) => {
// const { name, age, talk: { watchedAt, rate } } = req.body;
// const talkers = await getAllTalker();
// const post = {
//   id: talkers.length + 1,
//     name,
//     age,
//     talk: {
//       watchedAt,
//       rate,
//     },
//   // };
// });
  
  module.exports = talkerRouter;