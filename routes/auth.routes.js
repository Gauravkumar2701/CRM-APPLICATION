const authContoller = require("../contollers/auth.controller");
const { verifyUserReqBody }  = require("../middlewares");

module.exports = function(app){
    app.post("/crm/api/v1/auth/signup", [verifyUserReqBody.validateUserRequestBody], authContoller.signup);
    app.post("/crm/api/v1/auth/signin", authContoller.signin);
}