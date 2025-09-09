const mongoose  =  require('mongoose')

const postSchema = mongoose.Schema({
    content: String,
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    postedAt:{
        type: Date,
        default: Date.now
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})

module.exports = mongoose.model('post', postSchema)