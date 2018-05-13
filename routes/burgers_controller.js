
var db = require("../models");
module.exports=function(app){
  app.get("/", function(req, res) {
       db.Burgers.findAll({}).then(function(data) {
        // We have access to the todos as an argument inside of the callback function
        
        var burgerObject = {
          burger: data
        };
       // console.log(burgerObject);
        res.render("index", burgerObject);
      });
    
  });

  app.post("/api/burgers", function(req, res) {
    db.Burgers.create({
      burger_name:req.body.name,
      devoured:false
    }).then(function(dbBurger){
      // Send back the ID of the new quote
      res.json({ id: dbBurger.insertId });
    });
   });
  
  

  app.put("/api/devourBurger/:id", function(req, res) {
    var condition = req.params.id;
  
    console.log("condition", condition);
  
    db.Burgers.update(
      {
        devoured: true
      },
      {
        where:{
          id:condition
        }
      }).then(function(result){
        if (result.changedRows === 0) {
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
 

 
  
