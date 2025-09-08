//await user.save krna pryga jab manually kuch data add kernnygy db mein withoour model.builtInFunction() like model.findOneAndUpdate()
//findOne({}).populate('posts') .... so that id ki jgh py data ajaey for temporary storage for usage

const express = require('express')
const app =  express()
const path = require('path')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')

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

app.listen(3000)