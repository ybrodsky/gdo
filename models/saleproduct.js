"use strict";

module.exports = function(sequelize, DataTypes) {
  var SaleProduct = sequelize.define("SaleProduct", {
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'sales_products',
    timestamps: false
  });

  return SaleProduct;
};