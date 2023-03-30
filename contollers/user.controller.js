const objectConverter = require("../utils/objectConverter");
const User = require("../models/user.model");

exports.findAll = async(req, res, next) => {

    let userTypeReq = req.query.userType;
    let userStatusReq = req.query.userStatus;
    let userNameReq = req.query.name;

    var users;

    if(userNameReq){
        try{
            users = await User.find({
                userName: userNameReq
            });
        }catch(err){
            console.err("Error while fetching the user from db", userNameReq)
            res.status(500).send({
                message: "Internal Server Error"
            });
        }

    }else if(userTypeReq && userStatusReq){
        try{
            users = await User.find({
                userType: userTypeReq,
                userStatus : userStatusReq
            });
        }catch(err){
            console.err(`Error while fetching the user from db using userStatus [${userStatusReq}] and userType $[{userTypeReq}]`);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }

    }else if(userStatusReq){
        try{
            users = await User.find({
                userStatus : userStatusReq
            });
        }catch(err){
            console.err("Error while fetching the user from db using userStatus : ", userStatusReq);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }

    }else if(userTypeReq){
        try{
            users = await User.find({
                userTypeReq : userTypeReq
            });
        }catch(err){
            console.err("Error while fetching the user from db using userType : ", userTypeReq);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }

    }else{
        try{
            users = await User.find();
        }catch(err){
            console.err("Error while fetching the users from db");
            res.status(500).send({
                message: "Internal Server Error"
            });
        }

    }

    res.status(200).send(objectConverter.userResponse(users));
}

exports.finById = async(req, res) => {

    const requestedUserId = req.params.userId
    console.log(requestedUserId)

    var users = await User.findOne({userId: requestedUserId});

    if (users){
        res.status(200).send(users);
    }else{
        res.status(400).send({message: `UserId [${requestedUserId}] doesn't exist`});
        return;
    }

}

exports.update = async(req, res) => {

        const paramUserId = req.params.userId

        try{

            const user = await User.findOneAndUpdate({
                
                userId : paramUserId
                }, 
                {
                    userName: req.body.userName,
                    userStatus: req.body.userStatus,
                    userType: req.body.userType
                }
            ).exec()

            res.status(200).send({message: "User information updated successfully"});

        }catch(err){
            console.log("Error while updating into db.", err.message);
            res.status(500).send("Internal Server Error");
            return
        }

}



