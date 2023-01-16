const validarWatchedAtTalker = (req, res, next) => {
const { talk } = req.body;
const { watchedAt } = req.body.talk;
if (!watchedAt) {
return res.status(400)
.json({ message: 'O campo "watchedAt" é obrigatório' });
}
const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
if (regexDate.test(talk.watchedAt) === false) {
return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
next();
};
module.exports = validarWatchedAtTalker;