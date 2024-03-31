const User = require('../modals/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'Email already exists',success:false });
    }

    const newUser = new User({ email, password, firstName, lastName });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser ,success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'Invalid email' ,success:false});
    }
    if (password !== user.password) {
      return res.status(200).json({ message: 'Invalid passward', success: false });
    }

    const { emailId, id } = user
    const token = jwt.sign({ userId: id, email: emailId }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token ,message:'signUp successfully',success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


