const fs = require('fs').promises;
const { readFile } = require('fs');
const path = require('path');
const { join } = require('path');

const pathTalker = path.resolve(__dirname, 'talker.json');

const getAllTalker = async () => {
    const response = await fs.readFile(pathTalker, 'utf-8');
    return JSON.parse(response);
  };
  const writeTalker = async (req) => {
    const talkersAll = await readFile();
    const newTalker = {
      id: talkersAll.length + 1,
      ...req,
    };
  
    talkersAll.push(newTalker);
    await fs.writeFile(join(__dirname, './talker.json'), JSON.stringify(talkersAll, null, 2));
    return newTalker;
  };
  
  module.exports = {
    getAllTalker,
    writeTalker,
  };