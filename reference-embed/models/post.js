const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userPosted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})