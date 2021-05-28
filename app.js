const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');  //this is needed if you want to use Express to save your data into database
const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI;
const path = require('path');
// const port = 8000;

//Mongoose Connection
const mongoose = require('mongoose');
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Defining Mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    msg: String,
  });

  //making mongoose model from schema
  const Contact = mongoose.model('contact', ContactSchema);
//here the name of the collection would be 'contacts' because it will take plural form of the first argument.


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//if user clicks on home then he will be redirected to home page.
app.get('/',(req,res)=>{
    
    res.status(200).render('index.pug');
})



app.post('/contact',(req,res)=>{

    let clientdata = new Contact(req.body);

clientdata.save().then(()=>{
 
    res.status(200).render('index.pug');
}).catch(()=>{
    res.status(404).render("Item was not saved to the database");
})
//here if there is no error then the code inside then() will run and if any error occurs then the code inside catch() will run.

})




app.listen(port, ()=>{
    console.log(`Application is running at port ${port}`);
})