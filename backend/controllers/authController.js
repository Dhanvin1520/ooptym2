const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

const login = async (req, res) => {
    console.log("🛠️ Incoming login payload:", req.body);
  
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    console.log("🔍 Found user:", user);
  
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
    const match = await bcrypt.compare(password, user.password);
    console.log("✅ Password match:", match);
  
    if (!match) return res.status(401).json({ error: 'Wrong password' });
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  };

module.exports = { signup, login };
