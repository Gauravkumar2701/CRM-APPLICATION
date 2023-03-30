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
