"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define("Sale", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
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