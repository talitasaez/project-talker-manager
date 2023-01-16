const validarRateTalker = (req, res, next) => {
  const { talk: { rate } } = req.body;
  
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  const numberRate = Number(rate);

  if (rate > 5 || rate < 1 || !Number.isInteger(numberRate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
    };
    
module.exports = validarRateTalker;