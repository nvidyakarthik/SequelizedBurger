module.exports = function (sequelize, DataTypes) {
  var Burgers = sequelize.define("Burgers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  });
  Burgers.associate = function(models) {
    Burgers.hasOne(models.Customer, 
      {
        foreignKey: 'fk_customerid',
        targetKey:'id'
       
        
      });
  }
  
    return Burgers;
};
