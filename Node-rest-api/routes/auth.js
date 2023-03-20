// For creating and logging users we use this route

const router  = require("express").Router();
const User  = require("../models/User")
const bcrypt = require ("bcrypt");


// Todo REGISTER
router.post("/register", async (req,res)=>{  // Create a route for registering users 
   
    try{
// Generate new password 
   // Generate new password using bcrypt's genSalt and hash methods 
        const salt = await  bcrypt.genSalt(10);  // Generate a salt with 10 rounds of hashing 
        const hashedPassword  = await bcrypt.hash(req.body.password, salt);  // Hash the user's password with the generated salt
    
        // Create new user 
        // Create new user object with username, email and hashed password  
        const newUser = new User({
            username:req.body.username, // Get username from request
            email:req.body.email,  // Get email from request body  
            password:hashedPassword,  // Set hashed password as the user's password  
        });
    
        // save user and respond
        // Save user to database and respond with saved user object  
        const user =  await newUser.save();  // Save the new user to the database  
        res.status(200).json(user);  // Respond with status 200 and the saved user object  
    }
    catch(err){  // If an error occurs log it to console  
        res.status(500).json(err);
    }
   
});

// Todo Login
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
    
})
// Export router so it can be used in other files  
module.exports = router;
