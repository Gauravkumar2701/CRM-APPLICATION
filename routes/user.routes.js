const userController = require("../contollers/user.controller");
const { verifyUserReqBody, authjwt } = require("../middlewares");

module.exports = function(app){
    app.get("/crm/api/v1/users", [authjwt.verifyToken, authjwt.isAdmin], userController.findAll);
    app.get("/crm/api/v1/users/:userId", [authjwt.verifyToken, authjwt.isAdmin], userController.finById)
    app.put("/crm/api/v1/users/:userId", [authjwt.verifyToken, authjwt.isAdmin, verifyUserReqBody.validateUserTypeAndUserStatus], userController.update);
}
