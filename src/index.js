const express = require('express');
const fs = require('fs').promises;
// 
const talkerPath = '.src/talker.json';

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getAllTalker = async () => {
  const response = await fs.readFile(talkerPath, 'utf-8');
  return JSON.parse(response);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talker = await getAllTalker();
  res.status(HTTP_OK_STATUS).json(talker);
  if (talker === null) return [];
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = {
  getAllTalker,
};