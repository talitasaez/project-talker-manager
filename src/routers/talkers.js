const express = require('express');

const { getAllTalker } = require('../fsUtils');

const talkerRouter = express.Router();

talkerRouter.get('/talker', async (req, res) => {
    const talker = await getAllTalker();
    res.status(200).json(talker);
    if (talker === null) return [];
  });

  talkerRouter.get('/talker:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await getAllTalker();
    const talkerId = talkers.find((e) => e.id === Number(id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerId);
  });
  
  module.exports = talkerRouter;