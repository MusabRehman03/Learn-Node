//await user.save krna pryga jab manually kuch data add kernnygy db mein withoour model.builtInFunction() like model.findOneAndUpdate()
//findOne({}).populate('posts') .... so that id ki jgh py data ajaey for temporary storage for usage

const express = require('express')
const app =  express()
const path = require('path')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const postModel = require('./models/post')

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

app.get('/logout', function(req, res){
    res.cookie('token', '');
    res.redirect('/login')
})


app.get('/profile', isLoggedIn, async (req, res)=>{
    const posts = await postModel.find().populate('postedBy')
    console.log(posts)
    const user = req.user

    res.render('profile',{posts, user})
})

app.post('/profile/create-post', isLoggedIn, async (req, res)=>{
    const user = req.user
    // console.log(user)
    const {content} = req.body
    const createdPost = await postModel.create({content, postedBy:user._id})
    user.posts.push(createdPost._id)
    await user.save()
    // console.log(createdPost._id)
    res.redirect('/profile')


})


app.get('/feed', isLoggedIn, async function(req, res){
    const posts = await postModel.find().populate('postedBy').populate('likes').populate('comments.commentedBy')
    console.log(req.user)
    res.render('feed', {posts, user: req.user})
})

app.get('/like/:postId', isLoggedIn, async function(req, res){
    const postId = req.params.postId
    const post = await postModel.findOne({_id: postId})
    const index = post.likes.findIndex((id)=>{
       return id.equals(req.user._id)
    })
    if(index==-1){ post.likes.push(req.user._id)}else {post.likes.splice(index,1)}
    
    await post.save()
    const posts = await postModel.findOne({_id: postId}).populate('postedBy').populate('likes').populate('comments.commentedBy')
    res.redirect(req.get('Referrer') || '/feed');
})






async function isLoggedIn(req, res, next){
    if(!req.cookies.token || req.cookies.token == ""){
        res.status(500).send("Unauthorized, please Login first")
    }else{
        var decoded = jwt.verify(req.cookies.token, 'secret');
        req.user = await userModel.findOne({_id: decoded._id}).populate('posts')
        // console.log(req.user)
        next()
    }
}

app.listen(3000)