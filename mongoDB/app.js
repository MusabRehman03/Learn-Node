// BE mn 2 servers hoty hn, Application server, and databse server
//application server mein data ky ilawa sab kuch hota hai for example node
//jab koi request jati hai to application server py jati hai
//application server sirf jab data cahey hota hai to databbase server sy interact krta hai

/*
database -> collection -> document
in code:
when we connect mongoose: basially database create hota hai
when we create model: we create collection
when we write CREATE: we create document(entity)
*/

const express = require('express');
const app = express()

const userModel = require('./userModel')

app.get('/',function(req,res){
    res.send("hey")
})

app.get('/create', async function  (req,res){
    let createdUser = await userModel.create({
        name:"musab",
        username:"Musab123",
        email:"rehmanmusab0302@gmail.com"
    })
    res.send(createdUser);
})

app.get('/update',async function(req, res){
    let updatedUser = await userModel.findOneAndUpdate({name:"musab"},{username:"Musab123!"},{new:true})
    res.send(updatedUser)
})
app.get('/read', async function  (req,res){
    // res.send( await userModel.findOne({name:'musab'}))
    res.send( await userModel.find())
    
    //find array of users dega
})
app.get('/delete',async function(req, res){
    let akhriBarDarshanOfUser = await userModel.findOneAndDelete({name:'musab'});
    //this will delete the first found user
    res.send(akhriBarDarshanOfUser)
})

//id create hogi, shuru waley 3 bytes timestamp hota hai

app.listen(3000)