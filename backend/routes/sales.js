const express = require('express');
const Sale  	= require('../models').Sale;
const SaleProduct = require('../models').SaleProduct;
const Product = require('../models').Product;
const router 	= express.Router();
const _ = require('lodash');

router.get('/', function(req, res, next) {
	let params = req.query.all();
  params.include = [{model: Product}];

 	Sale.findAndCountAll(params).then(function(results) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
		res.set('X-Total-Count', results.count);
    res.send(results.rows);
  });
});

router.post('/', function(req, res, next) {
  let params = req.body;
  params.user_id = req.user.id;

  Sale.create(_.omit(params, 'Products')).then(function(created) {

    return Promise.all(params.Products.map(item => {
      return SaleProduct.create({
        product_id: item.product_id, 
        amount: item.amount,
        sale_id: created.getDataValue('id')
      });
    })).then((r) => {
      res.send(created);
    });
  }).catch(function(err) {
    res.status(400).send({error: err.toString()});
  });
});

router.post('/payup', function(req, res, next) {
  let params = req.body;

  Sale.update({
    paid: 1
  }, {
    where: {id: {'$in': params.ids}}
  }).then((r) => {
    return res.send({});
  }).catch(function(err) {
    res.status(400).send({error: err.toString()});
  });
});

router.get('/:id', function(req, res, next) {
	let params = req.query.all();
  params.where = {id: parseInt(req.params.id)};
  params.include = [{model: Product}];

 	Sale.findOne(params).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.status(400).json(err);
  });
});

router.put('/:id', function(req, res, next) {
  let params = req.body;
  Sale.findOne({
  	where: {id: parseInt(req.params.id)}
  }).then(function(sale) {
  	if(!sale) return res.status(400).json({error: 'Error'});

  	sale.update(params).then(function(results) {

      sale.setProducts(params.Products.map(Product.build.bind(Product))).then((r) => {
        res.send(results);
      });
  	})
  });
});

module.exports = router;