var models  = require('../models');
var _ = require('lodash');


/**
*	Parsea el query que viene por URL para usarlo como filtro
*
* @params	params Json Object	Objeto json con los parametros de la URL
*	@return params Json Object	Objeto json con los parametros trabajados
*/
function parse(params) {

	params = parseWhere(params);
	params = parseInclude(params);
	params = parseLimitOffset(params);
	params = parseAttributes(params);
	params = parseOrder(params);

	return params;
};

function parseOrder(params) {
	if(params.order) {
		params.order = [[params.order.split(' ')[0], params.order.split(' ')[1]]]
	}

	return params;
}

/**
*	Parsea el parametro attributes
*
* @params	params Json Object	Objeto json con los parametros de la URL
*	@return params Json Object	Objeto json con los parametros trabajados
*/
function parseAttributes(params) {
	if(params.attributes) {
		params.attributes = JSON.parse(params.attributes);
	}

	return params;
}

/**
*	Parsea el parametro limit y offset
*
* @params	params Json Object	Objeto json con los parametros de la URL
*	@return params Json Object	Objeto json con los parametros trabajados
*/
function parseLimitOffset(params) {
	//params.limit = params.limit ? parseInt(params.limit) : 30;

	if(params.limit)
		params.limit = parseInt(params.limit);

	if(params.offset)
		params.offset = parseInt(params.offset);

	return params;
};

/**
*	Parsea el parametro include
* Sequelize quiere que el include especifique un objeto. Tomamos la referencia que le pasa
*	para levantar el objeto, usando la referencia como indice del objeto models
*
*	El parametro include puede venir como un array de strings ["Modelo", "Modelo2"]
*	O como un array de objetos [{model: "Modelo"}, {model: "Modelo"}]
*
*	Tambien pueden venir varios include anidados. Si pasa, la funcion se llama recursivamente
*
*
* @params	params Json Object	Objeto json con los parametros de la URL
*	@return params Json Object	Objeto json con los parametros trabajados
*/
function parseInclude(params) {
	if(params.include) {
		if(_.isString(params.include))
			params.include = JSON.parse(params.include);

		params.include.forEach(function(item, index) {

			if(typeof item === 'string') {
				params.include[index] = models[item];
			}else {
				params.include[index].model = models[item.model];

				//Si hay un include anidado, llamar a la fn de nuevo
				if(item.include)
					params.include[index] = parseInclude(item);
			}
		});
	}

	return params;
};

/**
*	Parsea el parametro where
*
* @params	params Json Object	Objeto json con los parametros de la URL
*	@return params Json Object	Objeto json con los parametros trabajados
*/
function parseWhere(params) {
	if(params.where && _.isString(params.where))
		params.where = JSON.parse(params.where);

	return params;
};

module.exports = {
	parse: parse
};