//await user.save krna pryga jab manually kuch data add kernnygy db mein withoour model.builtInFunction() like model.findOneAndUpdate()
//findOne({}).populate('posts') .... so that id ki jgh py data ajaey for temporary storage for usage

const express = require('express')
const app =  express()
const path = require('path')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',function(req, res){
    res.render('register')
})
app.post('/register', async function (req, res) {
    const {username, email, password, imageUrl} = req.body
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            userModel.create({
                username,
                email,
                password: hash,
                imageUrl
            })
        });
        res.redirect('login')
    });

})


app.get('/login', async function(req, res){
    res.render('login')
})
app.post('/login',async function(req, res){
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ _id: user._id }, 'secret');
                res.cookie('token', token)
            }
        });
        res.redirect('/profile')
    }else{
        res.send("email or password incorrect")
    }
})

app.listen(3000)