const validarEmailLogin = (req, res, next) => {
    const { email } = req.body;
   
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const regex = /\S+@\S+\.\S+/;
  const testValidation = regex.test(email);
  if (!testValidation) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};
module.exports = validarEmailLogin;