const express = require('express')
const app = express()
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public'))) // for static files: /public  mein /images, /javasripts, /stylesheets
app.set('view engine','ejs')//for ejs files, /views ka folder bnana hai ad then is mein .ejs ki files

app.get('/',function(req,res){
    res.render('index')
})

app.get('/profile/:username',function(req,res){
    const username = req.params.username
    res.send(`Welcome, ${username}`)
})

app.get('/profile/:username/:age',function(req,res){
    const username = req.params.username
    const age = req.params.age
    res.send(`Welcome, ${username}, your age is: ${age}`)

})

app.listen(3003,function(){
    console.log('its running')
})
