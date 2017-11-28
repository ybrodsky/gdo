"use strict";

module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    detail: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'expenses',
    timestamps: false
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.Provider, {foreignKey: 'provider_id'});
  }

  return Expense;
};