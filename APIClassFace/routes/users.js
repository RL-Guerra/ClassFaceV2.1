const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/', (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).send(err.message);
    res.json(users);
  });
});

router.get('/:id', (req, res) => {
  User.getById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err.message);
    if (!user) return res.status(404).send("Usuário não encontrado");
    res.json(user);
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  User.getAll(email, async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: "Email ou senha inválidos" });

    try {
    // Busca o usuário pelo email
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '5h' }
    );
    console.log('######################', token)
    // Retorna a resposta com o token JWT
    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
    
  });
});

router.post('/register', (req, res) => {
  const { name, email, photo, password } = req.body;

  console.log(req.body);

  if (!name || !email || !photo || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  User.create({ name, email, photo, password }, (err, user) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(user);
  });
});

module.exports = router;