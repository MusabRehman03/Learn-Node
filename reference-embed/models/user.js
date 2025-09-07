const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId, //for id of a stored object
      ref: "post", //he have to give that which moedl it is going to refernce
    },
  ],
});
module.exports = mongoose.model("user", userSchema);
