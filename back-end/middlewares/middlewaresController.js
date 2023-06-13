const jwt = require("jsonwebtoken")

const middlewareController = {
    //Verify Token
    verifyToken : (req, res, next) => {
        const token = req.headers.token
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
                if(err) {
                    res.status(403).json("Token is not valid")
                }
                req.user = user
                
                next()
            })
        } else {
            res.status(403).json("You're not authenticated")
        }
    },
    verifyTokenandAdmin : (req, res, next) => {
        middlewareController.verifyToken(req,res, () => {
            if (req.user.admin) {
                next()
            } 
            else {
                res.status(403).json("You're not admin")
            }
        })
    }
}

module.exports = middlewareController