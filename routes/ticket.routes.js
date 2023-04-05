const ticketController = require("../contollers/ticket.controller");
const {authjwt, verifyTicketReqBody} = require("../middlewares");

module.exports = function(app){
    app.post("/crm/api/v1/tickets", [authjwt.verifyToken, verifyTicketReqBody.validateTicketReqBody, verifyTicketReqBody.validateTicketStatus], ticketController.createTicket);
    app.put("/crm/api/v1/tickets/:id", [authjwt.verifyToken, verifyTicketReqBody.validateTicketReqBody, verifyTicketReqBody.validateTicketStatus], ticketController.updateTicket);
    app.get("/crm/api/v1/tickets",[authjwt.verifyToken], ticketController.findAllTickets);
    app.get("/crm/api/v1/tickets/:id", [authjwt.verifyToken], ticketController.getOneTicket);

}


