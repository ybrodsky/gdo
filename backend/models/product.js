"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    net: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {
    tableName: 'products',
    timestamps: false
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {foreignKey: 'category_id'});
    Product.belongsToMany(models.Sale, {
      through: {
        model: models.SaleProduct,
        unique: false
      },
      foreignKey: 'product_id'
    });
  }

  return Product;
};