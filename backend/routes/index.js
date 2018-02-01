const express 				= require('express');
const router 					= express.Router();
const pdf 						= require('html-pdf');
const Sale  					= require('../models').Sale;
const Product  				= require('../models').Product;
const Category  			= require('../models').Category;
const User  					= require('../models').User;
const moment 					= require('moment');
const Sequelize 			= require('sequelize');
const _ 							= require('lodash');
const ejs 						= require('ejs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/report/:from/:to', function(req, res, next) {
	let from = req.query.from ? moment(req.query.from) : moment();
	let to = req.query.to ? moment(req.query.to) : moment();

	Sale.findAll({
		where: {
			createdAt: {
				'$gte': from.startOf('day').format(),
				'$lte': to.endOf('day').format()
			},
			cancelled: 0
		},
		order: [['id', 'DESC']],
		include: [{
			model: User, attributes: ['name', 'surname']
		},{
			model: Product, include: [{model: Category}]
		}]
	}).then((result) => {
		result = result.map(r => r.get({plain: true}));

		let hours = {};
		let categories = {};

		let report = {
			sales: result.length,
			totalSold: result.reduce((acc, cur) => {
				return acc + cur.total;
			}, 0),
			totalUnpaid: result.filter(r => r.paid == 0 && r.client_id).reduce((acc, cur) => {
				return acc + cur.total;
			}, 0)
		}

		result.forEach((sale) => {
			let hour = moment(sale.createdAt).subtract(3, 'hours').format('HH');
			if(!hours[hour]) {
				hours[hour] = 0;
			}

			hours[hour] += sale.total;

			sale.Products.forEach((product) => {
				if(!categories[product.Category.name]) {
					categories[product.Category.name] = 0
				}

				categories[product.Category.name] += 1;
			});
		});

		ejs.renderFile(process.cwd() + '/views/report.ejs', {
			sales: result,
			hours: Object.keys(hours).map(k => [k, hours[k]]).sort((a, b) => b[1] - a[1]),
			report,
			categories,
			moment
		}, {}, function(err, str) {
			if(err) return res.send(err);

			pdf.create(str, {
				format: 'Letter',
			  border: {
			    top: "0.5in",
			    right: "0.2in",
			    bottom: "0.2in",
			    left: "0.2in"
			  },
			}).toStream((err, stream) => {
				stream.pipe(res);
			});
		});
	})


})

module.exports = router;
