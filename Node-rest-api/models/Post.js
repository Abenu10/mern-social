const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    
    likes: {
      type: Array,
      default: [],
    },
    publicId: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  // when ever we create user or update this its going to automatically update our time stamp
  { timestamps: true }
);

// is used to create a Mongoose model from the user schema. This model can then be used to perform various database operations, such as inserting, updating, and deleting documents from the MongoDB database.
module.exports = mongoose.model("Post", PostSchema);
