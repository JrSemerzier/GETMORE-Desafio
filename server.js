
var express = require('express');

var hostname = 'localhost'; 
var port = process.env.PORT || 3000;

var mongoose = require('mongoose'); 

//bd URL 
var urlmongo = "mongodb://localhost/getMoredb"; 

mongoose.connect(urlmongo);

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error')); 
db.once('open', function (){
    console.log("Conection to the database OK"); 
}); 
 
//ceate app 
var app = express(); 
var myRouter = express.Router(); 

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//schema
var categoriesSchema = mongoose.Schema({
    _id: Number,
    name: String,
    childrenIds: []   
}); 

var Category = mongoose.model('Categories', categoriesSchema);
  
myRouter.route('/categories')
// GET
.get(function(req,res){ 
    Category.find(function(err, categories){
        if (err){
            res.send(err); 
        }
        res.json(categories); 
        
    }); 
}) 

//POST
.post(function(req,res){
    // create a category
      var a_category = new Category();
      a_category._id = req.body.id;
      a_category.name = req.body.name;
      a_category.childrenIds = req.body.childrenIds; 
    //Save a catagory
      a_category.save(function(err){
        if(err){
          res.send(err);
        }
        res.send({ok : 'true'});
      })
})


//GET using id
myRouter.route('/categories/:category_id')
.get(function(req,res){ 
            Piscine.findById(req.params.category_id, function(err, category) {
            if (err)
                res.send(err);
            res.json(category);
        });
})

app.use(myRouter);
// start the server 
app.listen(port, hostname, function(){
	console.log("the server use http://"+ hostname +":"+port); 
});