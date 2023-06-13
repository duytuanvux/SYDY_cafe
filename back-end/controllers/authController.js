const argon2 =require("argon2")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const authController = {
    //Register 
    registerUser: async(req,res) => {
        try {
            const hash = await argon2.hash(req.body.password);
            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            //Save to DB
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }

    },

    //Login
    loginUser : async(req,res) => {
        try {
            const user = await User.findOne( {username: req.body.username})
            if(!user) {
                res.status(404).json("Wrong username")
            }
            const validPassword = await argon2.verify(user.password, req.body.password)
            if(!validPassword) {
                res.status(404).json("Wrong password")
            }
            if (user && validPassword) {
                const accessToken = jwt.sign({
                    id: user.id,
                    admin: user.admin
                },
                process.env.ACCESS_KEY,
                {expiresIn : "30m"})
                res.status(200).json({username : user.username, admin: user.admin, accessToken})
            }
        } catch (error) {
            
        }
    }
}

module.exports = authController