const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.get('/',function(req,res){  
    res.send('hello world')
})

app.get('/profile', isLoggedIn,function(req,res){
    res.send("champion")
})

function isLoggedIn(req, res, next){
    if(!req.cookies.token || req.cookies.token == ""){
        res.status(500).send("you are not authorized, please login first")
    }else{
        const data = jwt.verify(req.cookies.token, secretKeyThatWasSetDuringTokenMakingInLogin)
        req.user = data
        next()
    }
    
}

app.listen(3000)