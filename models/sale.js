"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define("Sale", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
  }, {
    tableName: 'sales',
    timestamps: true
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.Client, {foreignKey: 'client_id'});
    Sale.belongsToMany(models.Product, {
      through: {
        model: models.SaleProduct,
        unique: false,
      },
      foreignKey: 'sale_id'
    });
  }

  return Sale;
};