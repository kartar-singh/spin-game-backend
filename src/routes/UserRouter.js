// routes/UserRouter.js
const express = require('express');
const { createUser ,signInUser} = require('../Controller/userController');
const userRouter = express.Router();

userRouter.get('/get', (req, res) => {
    // console.log('XXXXXXX',req.body)
    res.status(200).send({ message: 'Hello, World!' });
});

userRouter.post('/create',createUser);
userRouter.post('/sign-up',signInUser);

module.exports = userRouter;
