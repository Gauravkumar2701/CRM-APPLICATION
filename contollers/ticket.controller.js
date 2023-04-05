const constants = require("../utils/constants");
const User = require("../models/user.model");
const Ticket = require("../models/ticket.model");
const objectConverter = require("../utils/objectConverter");


exports.createTicket = async(req, res) => {
    // creating the ticket object.
    const ticketObject = {
        title: req.body.title,
        ticketPriority: req.body.priority,
        status: req.body.status,
        description: req.body.description,
        reporter: req.userId
    }

    // searching for the engineer who is free as well as user status is approved.
    const userType = constants.userTypes.engineer;
    const userStatus = constants.userStatus.approved;
    const engineer = await User.findOne({userType: userType, userStatus: userStatus});

    if (!engineer){
        res.status(200).send({message: "Engineers are not available."});
        return;
    }else{
        ticketObject.assignee = engineer.userId;
    }

    // Tried to create the ticket for the user.
    
    try {
        const ticket = await Ticket.create(ticketObject);
        if (ticket){
            const user = await User.findOne({
                userId: req.userId
            });

            user.ticketCreated.push(ticket._id);

            await user.save();

            engineer.ticketAssigned.push(ticket._id);
            await engineer.save();

            res.status(200).send(objectConverter.ticketResponse(ticket));
            return;

        }

    }catch(err){
        console.log("Some error happen while creating the ticket.", err.message);
        res.status(400).send("Internal Server Error");

    }
}

exports.updateTicket = async(req, res) => {

    const ticket = await Ticket.findOne({_id : req.params.id});
    
    const user = await User.findOne({userId: req.userId});

    if (ticket.reporter == req.userId || ticket.assignee == req.userId || user.userType == constants.userTypes.admin){

        ticket.title = req.body.title != undefined ? req.body.title : ticket.title
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status
    
        var updateTicket = await ticket.save();

        res.status(200).send(objectConverter.ticketResponse(updateTicket))
        return

    }else{
        console.log("Ticket was created by someone who has not crated the ticket");
        res.sendStatus(400).send({
            message: "Ticket can be updated only by the customer who created it or By the Engineer Whom the ticket is assigned or Admin."
        })
        return;

    }

}


exports.findAllTickets = async(req, res) => {

    try{

        const queryObj = {}

        if (req.query.status != undefined){
            queryObj.status = req.query.status;
        }   

        const user = await User.findOne({userId: req.userId});
      
        if (user.userType == constants.userTypes.admin){
            
        }else if (user.userType == constants.userTypes.engineer){
            queryObj.assignee = req.userId
        }else{
            queryObj.reporter = req.userId
        }

       
        const ticket = await Ticket.find(queryObj);
       
        res.status(200).send(objectConverter.ticketResponses(ticket));
        return;


    }catch(err){
        
        console.log("Error hapend while retrieving the tickets", err.message);
        res.status().send({
            message: "Error while retrieving the tickets"
        })
    }


}
    

exports.getOneTicket = async(req, res) => {

    const id = req.params.id;

    const ticket = await Ticket.findOne({_id: id})

    if (!ticket){
        res.status(400).send({message: "Error while Retrieving the ticket"});
        return;
    }else{
        res.status(200).send(objectConverter.ticketResponse(ticket));
        return;
    }
}