"use strict";

module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define("Provider", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {
    tableName: 'providers',
    timestamps: false
  });

  Provider.associate = (models) => {
    Provider.hasMany(models.Expense, {foreignKey: 'provider_id'});
  }

  return Provider;
};