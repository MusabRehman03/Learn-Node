//cookie and bycrypt and jwt

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//npm cookie-parser to backedn be able to read cookiw values

app.use(cookieParser()) //this is required middleware to allow us to read cookie data


app.get('/',function(req, res){
    res.cookie('token', "t2bbhjkjnhgv")
    res.send('hey')
})
app.get('/read',function(req, res){
    console.log(req.cookies)
    res.send('hey')
})

app.get('bcrypt',function(req, res){
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
        });
    });    
})
app.get('compare',(req, res)=>{
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
    });
})
app.get('/setJwtToken',(req, res)=>{
    var token = jwt.sign({ email: 'emailofuser@gmailcom' }, 'secretString');
    res.cookie('token',token)
})
app.get('readCookies',(req, res)=>{
    console.log(req.cookies.token)
})
app.listen(3006)