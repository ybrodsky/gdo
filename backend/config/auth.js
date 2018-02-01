const jwt 		= require('jsonwebtoken');
const User 		= require('../models/').User;
const bcrypt 	= require('bcrypt-nodejs');
const config	= require('config').get('jsonwebtoken');

module.exports = {
	authenticate: (req, res, next) => {
		User.findOne({
	    where: {
				username: req.body.username
	    }
	  }).then(user => {

	    if (!user) {
	      return res.send({ success: false, message: 'Authentication failed. Username or password incorrect' });
	    }

	    bcrypt.compare(req.body.password, user.password, function(err, result) {
	      if (!result)
	      	return res.send({ success: false, message: 'Authentication failed. Username or password incorrect' });

	      var token = jwt.sign({
	      	id: user.id,
	      	name: user.name,
	      	surname: user.surname,
	      	username: user.username
	      }, config.secret, {
          expiresIn: 604800 // in seconds
        });
        return res.send({ success: true, token: token });
	    });
	  }).catch((err) => {
	  	return res.status(400).send(err);
	  });
	}
}