const User = require("../models/user.model");
const constants = require("../utils/constants")



const validateUserRequestBody = async(req, res, next) => {

    if (!req.body.name){
        res.status(400).send({message: "Failed: username is not provided."});
        return;
    }

    if (!req.body.userId){
        res.status(400).send({message: "Failed: userId is not provided."});
        return;
    }


    const userId = await User.findOne({userId: req.body.userId})
    if (userId != null){
        res.status(400).send({message: "Failed: username already exist."});
        return;
    }
        
    const email = await User.findOne({email: req.body.email})
    if (email != null){
        res.status(400).send({message: "Failed: email already exist."});
        return;
    }


    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.engineer]

    if (userType && !userTypes.includes(userType)){
        res.status(400).send({message: "userType are not valid only CUSTOMER | ENGINEER | ADMIN are valid userTypes."})
        return;
    }

    next();
}

const validateUserTypeAndUserStatus = async(req, res, next) => {

    const userType = req.body.userType;
    const userTypes = [constants.userTypes.admin, constants.userTypes.customer, constants.userTypes.engineer]
    
    if (userType && !userTypes.includes(userType)){
        res.status(400).send({message : "UserType is invalid. Valid options are  CUSTOMER | ENGINEER | ADMIN"});
    }

    const userStatus = req.body.userStatus;
    const status = [constants.userStatus.rejected, constants.userStatus.approved, constants.userStatus.pending]

    if (userStatus && !status.includes(userStatus)){
        res.status(400).send({message: "userStatus is invalid. Valid options are PENDING | APPROVED | REJECTED"});
    }

    next()
    

}

const verifyUserReqBody = {
    validateUserRequestBody: validateUserRequestBody,
    validateUserTypeAndUserStatus: validateUserTypeAndUserStatus
}

module.exports = verifyUserReqBody;
