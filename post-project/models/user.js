const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/postproject')

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    imageUrl:String
})

module.exports = mongoose.model('user',userSchema)
