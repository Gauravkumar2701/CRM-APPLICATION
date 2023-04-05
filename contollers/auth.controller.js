const User = require("../models/user.model");
const { userTypes } = require("../utils/constants");
const constants = require("../utils/constants");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../configs/secret");
const objectConverter = require("../utils/objectConverter")

exports.signup = async (req, res) => {
    var userStatus = req.body.userStatus;

    if (!req.body.userStatus) {
        if (!req.body.userType || req.body.userType == constants.userTypes.customer) {
            userStatus = constants.userStatus.approved;
        } else {
            userStatus = constants.userStatus.pending;
        }
    }

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password,
                8),
        userStatus: userStatus
    }
    try {
        const userCreated = await User.create(userObj);
        // const postResponse = {
        //     name: userCreated.name,
        //     userId: userCreated.userId,
        //     email: userCreated.email,
        //     userTypes: userCreated.userType,
        //     userStatus: userCreated.userStatus,
        //     createdAt: userCreated.createdAt,
        //     updatedAt: userCreated.updatedAt
        // }
        res.status(201).send(objectConverter.userCreated(userCreated));
    } catch (err) {
        console.log("Some error while saving the user in db", err.message);
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }
}


exports.signin = async (req, res) => {

    const user = await User.findOne({userId: req.body.userId});
    if (user == null){
        res.status(400).send({meassage: "Failed! username is not valid"});
        return;
    }
    
    if (user.userStatus != constants.userStatus.approved){

        res.status(400).send({message : `can't allow to login becuase user in : [${user.userStatus}]`})
        return;
    }

    const isValidPassword = bcrypt.compareSync( 
        req.body.password,
        user.password
    )

    if (!isValidPassword){
        res.status(401).send({
            accessToken: null, 
            message: "Failed! the entered password is worng"});
        return;
    }

    const token = jwt.sign({id: user.userId}, config.secret, {expiresIn: 86400 });

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        accessToken: token

    });

}
