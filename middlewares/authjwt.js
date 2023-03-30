const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../configs/secret");
const constants = require("../utils/constants");


verifyToken = (req, res, next) => {


    let token = req.headers["x-access-token"];
    if (!token){
        res.status(403).send({message: "No token provided"});
        return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            res.status(401).send({message: "Invalid Token"});
            return
        }

        req.userId = decoded.id;

        next();

    })




}

isAdmin = async(req, res, next) => {

    const user = await User.findOne({userId: req.body.userId});

    // console.log(user.userId, user.userType);

    if (user && user.userType == constants.userTypes.admin){
        next();

    }else{
        res.status(403).send({
            message: "Required Admin Role"
        });
        return;

    }

}

const authJwt = {

    verifyToken: verifyToken,
    isAdmin: isAdmin

}

module.exports = authJwt;
 