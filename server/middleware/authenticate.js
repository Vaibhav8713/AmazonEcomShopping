const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.SECRETKEY;

const authenicate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb;
        
        const verifyToken = jwt.verify(token, secretKey);
        console.log("=> verifyToken = " + verifyToken);
     
        const rootUser = await USER.findOne({"tokens.token": token});
        console.log("=> rootUser = " + rootUser);
    
        if(!rootUser){ 
            return res.status(401).json({error: "user not found"})
         };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  
    } catch (error) {
        return res.status(401).send({error: error.message});
    }
};

module.exports = authenicate;