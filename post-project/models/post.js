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
    }],
    comments:[{
        text:String,
        commentedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        commentedAt:{
            type: Date,
            default: Date.now
        },
    }]
})

module.exports = mongoose.model('post', postSchema)