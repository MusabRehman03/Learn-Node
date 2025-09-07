// const express = require('express')
// const app = express();

// const path = require('path')
// const cookieParser = require('cookie-parser')

// app.set('view engine', 'ejs')
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(cookieParser())

// app.get('/', function(req, res){
//     res.send('hello')
// })

// app.listen(3000)



//register page -> user registers -> show user -> jwt and password hashing -> edit and delete user

const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const userModel = require('./models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.get('/', (req, res)=>{
    res.send('hello there')
})

app.get('/register',async (req, res)=>{
    res.render('register')
})

app.post('/register', async(req, res)=>{
    const {name, email, password} = req.body
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            userModel.create({
                username: name,
                email,
                password: hash
            })
        });
    });
    res.redirect('/login')

})

app.post('/login', (req, res)=>{
    const {email, password} = req.body
    const userFound = userModel.findOne({email})
    if(userFound){
        bcrypt.compare(password, userFound.password, function(err, result) {
            if(result){
                var token = jwt.sign({ email }, 'secret');
                res.cookie('token', token)
            }else{
                res.send('something went wrong')
                
            }
        });
    }else{
        res.send('something went wrong')
    }
    
})

app.listen(3000)

























