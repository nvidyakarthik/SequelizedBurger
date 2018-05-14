module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      // Giving the Author model a name of type STRING
      
      customerName: {
          type:DataTypes.STRING,
          allowNull:true
        }
    });
    Customer.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Customer.belongsTo(models.Burgers,{
          foreignKey: 'fk_customerid',
          targetKey:'id'
         
          
        });
          
    }
    return Customer;
  
}