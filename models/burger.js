module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define("Burgers", {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  });
  return burgers;
};


