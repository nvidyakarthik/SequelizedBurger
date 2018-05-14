
var db = require("../models");
module.exports=function(app){
  app.get("/", function(req, res) {
       db.Burgers.findAll({ 
         include: [{
           model:db.Customer,
           where: 
           { 
             fk_customerid: db.Sequelize.col('Burgers.id') 
            },
          attributes: ["customerName"]  
          }]
        }).then(function(data) {
        // We have access to the todos as an argument inside of the callback function
        
        var burgerObject = {
          burger: data
        };
       console.log(burgerObject);
       res.render("index", burgerObject);
      });
    
  });

  app.post("/api/burgers", function(req, res) {
    var burger;
    db.Burgers.create({
      burger_name:req.body.name,
      devoured:false
    }).then(function(createdBurger){
      burger=createdBurger;
      return db.Customer.create({
        customerName: ""
        
      })
    }).then(function(customer){
      burger.setCustomer(customer);
      res.json('OK');
    });
   });
  
  

  app.put("/api/devourBurger/:id/:customer", function(req, res) {
    var rowId = req.params.id;
    name=req.params.customer; 
  
    db.Burgers.update(
      {
        devoured: true
      },
      {
        where:{
          id:rowId
        }
      }).then(function(updatedBurger){
        db.Customer.update(
          {
            customerName:name
          },
          {
            where:{
              fk_customerid:rowId
            }
          }
        )
      }).then(function(result){
        if (result) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
        
      });
  });


 app.delete("/api/delBurger/:id", function(req, res) {
    var condition =req.params.id;
  
    db.Burgers.destroy({
      where:{id:condition}
    }).then(function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
};
 

 
  
