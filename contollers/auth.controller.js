const User = require("../models/user.model.js");
const { userType } = require("../utils/constants");
const constants = require("../utils/constants");

var bcrypt = require("bcryptjs");

var jwt  = require("jsonwebtoken");

exports.signup = async(req, res) => {
    var userStatus = req.body.userStatus;

    if (!req.body.userStatus){
        if (!req.boyd.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved;
        }
        else{
            userStatus = constants.userStatus.pending;
        }
    }

    const userObj  = {
        name: req.boyd.name,
        userId: req.body.userId, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: req.boyd.userType,
        userStatus: req.body.userStatus

        

    }


} 