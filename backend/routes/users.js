const express = require('express');
const User  	= require('../models').User;
const router 	= express.Router();

router.get('/', function(req, res, next) {
	let params = req.query.all();

 	User.findAndCountAll(params).then(function(results) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
		res.set('X-Total-Count', results.count);
    res.send(results.rows);
  });
});

router.post('/', function(req, res, next) {
  let params = req.body;

  User.create(params).then(function(created) {
    res.send(created);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.get('/:id', function(req, res, next) {
	let params = req.query.all();
  params.where = {id: parseInt(req.params.id)};

 	User.findOne(params).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.put('/:id', function(req, res, next) {
  let params = req.body;
  User.findOne({
  	where: {id: parseInt(req.params.id)}
  }).then(function(user) {
  	if(!user) return res.status(400).json({error: 'Error'});

  	user.update(params).then(function(results) {
  		res.send(results)
  	})
  });
});

module.exports = router;