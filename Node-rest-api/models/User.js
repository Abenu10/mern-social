const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      ma: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  // when ever we create user or update this its going to automatically update our time stamp
  { timestamps: true }

  
);

// is used to create a Mongoose model from the user schema. This model can then be used to perform various database operations, such as inserting, updating, and deleting documents from the MongoDB database.
module.exports = mongoose.model("User", UserSchema);
