const express = require('express');
const talkerRouter = require('./routers/talkers');
const loginRouter = require('./routers/login');

const app = express();
app.use(express.json());

app.use(talkerRouter);
app.use(loginRouter);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = {

};