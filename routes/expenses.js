const express     = require('express');
const Expense  	  = require('../models').Expense;
const router 	    = express.Router();

router.get('/', function(req, res, next) {
	let params = req.query.all();

 	Expense.findAndCountAll(params).then(function(results) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
		res.set('X-Total-Count', results.count);
    res.send(results.rows);
  });
});

router.post('/', function(req, res, next) {
  let params = req.body;

  Expense.create(params).then(function(created) {
    res.send(created);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.get('/:id', function(req, res, next) {
	let params = req.query.all();
  params.where = {id: parseInt(req.params.id)};

 	Expense.findOne(params).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.put('/:id', function(req, res, next) {
  let params = req.body;
  Expense.findOne({
  	where: {id: parseInt(req.params.id)}
  }).then(function(result) {
  	if(!result) return res.status(400).json({error: 'Error'});

  	result.update(params).then(function(results) {
  		res.send(results)
  	})
  });
});

module.exports = router;