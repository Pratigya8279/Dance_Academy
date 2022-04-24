const express=require("express")
const app=express()
const path=require("path")
const fs=require("fs")
const port=80;
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlparser:true});

// const pug=require("pug")

// define mongoose schema
var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
})
var contact=mongoose.model('contact',contactSchema);
// set express
app.use('/static',express.static("static"))
app.use(express.urlencoded())

// PuG specifc stuff
app.set('view engine','pug')
app.set('views',path.join( __dirname,'views'))

// endpoint
/*app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('index.pug',params)
})*/
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("This items has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
  
})

// start a server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
});