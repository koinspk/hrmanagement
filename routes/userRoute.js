const express = require('express');
const userRouter = express.Router();
const tokenVerify = require("../helpers/verifyToken")
const userController = require('../controller/userController');

userRouter.post('/',userController._post);
userRouter.get('/',userController._get);
userRouter.get('/:id',userController.findbyId);
userRouter.delete('/:id',userController.findbyIdanddelete);
userRouter.patch('/:id',userController.findbyIdandUpdate);
userRouter.post('/login',userController.loginValidation);//login autentication
userRouter.get('/protected-route', tokenVerify.verifyAccessToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
  });
userRouter.post('/refresh-token', tokenVerify.verifyRefreshToken, (req, res) => {
  const newAccessToken = jwt.sign({ userId: req.user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  res.json({ accessToken: newAccessToken });
});





module.exports = userRouter;

