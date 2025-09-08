//await user.save krna pryga jab manually kuch data add kernnygy db mein withoour model.builtInFunction() like model.findOneAndUpdate()
//findOne({}).populate('posts') .... so that id ki jgh py data ajaey for temporary storage for usage

const express = require('express')
const app =  express()
const path = require('path')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')

app.use(cookieParser())
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
    console.log(user)
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ _id: user._id }, 'secret');
                res.cookie('token', token)
                console.log(token)
                res.redirect('/profile')
            }else{
                res.send('invalid password')
            }
        });
    }else{
        res.send("email or password incorrect")
    }
})

app.get('/profile', isLoggedIn, async (req, res)=>{
    res.render('profile')
})

app.get('/logout', function(req, res){
    res.cookie('token', '');
    res.redirect('/login')
})




function isLoggedIn(req, res, next){
    if(!req.cookies.token || req.cookies.token == ""){
        res.status(500).send("Unauthorized, please Login first")
    }else{
        var decoded = jwt.verify(req.cookies.token, 'secret');
        console.log(decoded)
        next()
    }
}

app.listen(3000)