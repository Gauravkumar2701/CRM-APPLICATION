const constants = require("../utils/constants");

const validateTicketReqBody = async(req, res, next) => {

    if (!req.body.title){
        res.status(400).send({message: "Title is not provide."});
        return
    }

    if (!req.body.description){
        res.status(400).send({message: "Descritpion is not provide"});
        return
    }
    
    next();
           

};

const validateTicketStatus = async(req, res, next) =>{

    const ticketStatus = req.body.status;
    const ticketStatusRequird = [constants.ticketStatus.blocked, constants.ticketStatus.open, constants.ticketStatus.inProgress, constants.ticketStatus.closed]

    if (!ticketStatusRequird.includes(ticketStatus)){
        res.status(200).send("Invalid ticketStatus valid options are OPEN | CLOSED | BLOCKED | IN_PROGRESS");
        return;
    }

    next();
}

const verifyTicketReqBody = {
    validateTicketReqBody: validateTicketReqBody,
    validateTicketStatus: validateTicketStatus
}

module.exports = verifyTicketReqBody;
