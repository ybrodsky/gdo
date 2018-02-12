"use strict";

module.exports = function(sequelize, DataTypes) {
  var SaleProduct = sequelize.define("SaleProduct", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'sales_products',
    timestamps: false
  });

  return SaleProduct;
};