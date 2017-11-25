"use strict";

const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {foreignKey: 'user_id'});
  }

  User.beforeCreate(function(user, options) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.getDataValue('password'), salt, null, function(err, hash) {
          if (err) return reject(err)

          user.setDataValue('password', hash);
          user.setDataValue('username', user.getDataValue('email').split('@')[0]);
          return resolve();
        });
      });
    });

  });

  User.beforeUpdate(function(user, options, cb) {
    if(user.dataValues.password == user._previousDataValues.password)
      return;

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.dataValues.password, salt, null, function(err, hash) {
          if (err) return reject(err);

          user.dataValues.password = hash;
          return resolve();
        });
      });
    });
  });

  return User;
};