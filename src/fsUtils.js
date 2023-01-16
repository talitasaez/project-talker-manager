const fs = require('fs').promises;
const path = require('path');
// const { join } = require('path');

const pathTalker = path.resolve(__dirname, 'talker.json');

const getAllTalker = async () => {
    const response = await fs.readFile(pathTalker, 'utf-8');
    return JSON.parse(response);
  };

  const writeTalker = async (newTalkers) => {
    fs.writeFile(pathTalker, JSON.stringify(newTalkers));
  };
  
  module.exports = {
    getAllTalker,
    writeTalker,
  };