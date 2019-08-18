'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    number1: DataTypes.STRING,
    number2: DataTypes.STRING,
    response: DataTypes.FLOAT,
    expected: DataTypes.FLOAT,
    passed: DataTypes.STRING
  }, {});
  Result.associate = function(models) {
    // associations can be defined here
  };
  return Result;
};