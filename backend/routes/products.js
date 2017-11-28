const express = require('express');
const Product  	= require('../models').Product;
const router 	= express.Router();

router.get('/', function(req, res, next) {
	let params = req.query.all();

 	Product.findAndCountAll(params).then(function(results) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
		res.set('X-Total-Count', results.count);
    res.send(results.rows);
  });
});

router.post('/', function(req, res, next) {
  let params = req.body;

  Product.create(params).then(function(created) {
    res.send(created);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.get('/:id', function(req, res, next) {
	let params = req.query.all();
  params.where = {id: parseInt(req.params.id)};

 	Product.findOne(params).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.put('/:id', function(req, res, next) {
  let params = req.body;
  Product.findOne({
  	where: {id: parseInt(req.params.id)}
  }).then(function(category) {
  	if(!category) return res.status(400).json({error: 'Error'});

  	category.update(params).then(function(results) {
  		res.send(results)
  	})
  });
});

module.exports = router;