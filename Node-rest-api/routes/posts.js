const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// TODO:
const express = require("express");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");
const upload = require("../middleware/upload");

// test
// router.get("/", (req,res)=>{
//     res.json("post page")
// })

// TODO: create a post
router.post("/:id", upload.single("postImage"), async (req, res) => {
  try {
    // upload Image to cloudinary
    const data = await uploadToCloudinary(req.file.path, "post-images");

    // TODO:
    // Create new post with image URL and public ID
    const post = new Post({
      userId: req.params.id,
      desc: req.body.desc,
      imageUrl: data.url,
      publicId: data.public_id,
    });

    // TODO:

    // save Image url and published to the database
    const savedImg = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          imageUrl: data.url,
          publicId: data.public_id,
        },
      }
    );
    // TODO:
    // Save the new post to the database
    const savedPost = await post.save();
    // TODO:
    res.status(200).send(savedPost);
  } catch (error) {
    res.status(400).json(error);
  }
});
// TODO: create a post
// router.post("/", async (req,res)=>{
//     const newPost = new Post(req.body);
//     try{
//         const savedPost = await newPost.save();
//         res.status(200).json(savedPost);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })

// Todo: update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Todo: delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Todo: like/dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Todo: get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Todo: create get endpoint to get timeline posts of all users

// user id passed in the  body, timeline post of that user if he  follows someone those posts included in the timeline
// posts from me and people i follow
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// Todo: get  user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//   TODO:  get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
