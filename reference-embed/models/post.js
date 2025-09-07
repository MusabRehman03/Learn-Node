const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userPosted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now //always use this so that we got time stamp while user gets created //thats actually a ref to func
        //if we use Date.now(), this will get called immediately at the time this schema is being written annd every object will get the sama value of date// it atually a fucntion call
    }
})
mongoose.model('post', postSchema)