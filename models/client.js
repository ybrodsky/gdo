"use strict";

module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
  }, {
    tableName: 'clients',
    timestamps: true
  });

  Client.associate = (models) => {
    Client.hasMany(models.Sale, {foreignKey: 'client_id'});
  }

  return Client;
};