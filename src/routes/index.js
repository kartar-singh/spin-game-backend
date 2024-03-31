// routes/apiRoutes.js
const express = require('express');
const userRouter = require('./UserRouter');
const router = express.Router();
console.log('inside ::')

router.use('/user',userRouter);

module.exports = router;
