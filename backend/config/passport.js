const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const User          = require('../models/').User;
const config        = require('config').get('jsonwebtoken');

module.exports = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      ExtractJwt.fromBodyField('jwt'),
      ExtractJwt.fromHeader('jwt'),
      ExtractJwt.fromHeader('JWT'),
    ]),
    secretOrKey: config.secret
  };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({
      where: {id: jwt_payload.id},
      attributes: {exclude: ['password']}
    }).then((user) => {
      if(!user) return done(null, false);

      return done(null, user.get({plain: true}));
    }).catch((err) => {
      return done(err, false);
    });
  }));
};