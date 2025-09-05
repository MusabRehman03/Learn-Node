//npm i -g nodemon

const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
app.use(express.json()); //convert json format in js objects     //is used to parse JSON request bodies so you can access them with req.body.
app.use(express.urlencoded({extended:true}));  //is used to parse form submissions (URL-encoded data) and turn them into a usable JavaScript object (req.body).
app.use(express.static(path.join(__dirname, 'public'))) // for static files: /public  mein /images, /javasripts, /stylesheets (to use these in ejs pages)
app.set('view engine','ejs')//for ejs files, /views ka folder bnana hai ad then is mein .ejs ki files

app.get('/',function(req,res){
    fs.readdir('./files',function(err, files){
        res.render('index', {files: files})
    })
    
})

app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err,data){
        res.render('show', {data: data, filename: req.params.filename})
    })
    
})

app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename: req.params.filename})
    
})
app.post('/edit',function(req,res){
    fs.rename(`./files/${req.body.prevName}`,`./files/${req.body.newName}`,function(err){
        console.log(req.body.prevName, req.body.newName)
        res.redirect('/')
    })
    
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, function(err){
        res.redirect('/')
    })
    
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

app.get('/delete/:filename', function(req, res){
    fs.unlink(`./files/${req.params.filename}`, function(err){
        res.redirect('/')
    })
})

app.listen(3003,function(){
    console.log('its running')
})
