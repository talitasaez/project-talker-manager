const validarRateTalker = (req, res, next) => {
    const { rate } = req.body.talk;
    if (!rate) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }

    if ((!Number(rate) < 1 || Number(rate) > 5) || !Number.isInteger(rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
    };
    module.exports = validarRateTalker;