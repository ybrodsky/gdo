const express 	= require('express');
const router 		= express.Router();
const auth      = require('../config/auth');
const passport  = require('passport');

router.post('/login', auth.authenticate);

router.get('/me', function(req, res) {
	console.log('chequeando logueado....', req.user);
  return res.send(req.user);
});

module.exports = router;
