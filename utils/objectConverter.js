
exports.userResponse = (users) => {
    var userResult = []
    users.forEach(user => {
        userResult.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            ticketCreated: user.ticketCreated,
            ticketAssigned: user.ticketAssigned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,

        });
    });
    return userResult;
}

exports.ticketResponse = (ticket) => {
   return {
            title: ticket.title,
            ticketPriority : ticket.ticketPriority,
            description: ticket.description,
            status: ticket.status,
            reporter: ticket.reporter,
            assignee: ticket.assignee,
            id: ticket._id,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt

        };
}


exports.userCreated = (user) =>  {
    return {
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        ticketCreated: user.ticketCreated,
        ticketAssigned: user.ticketAssigned,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

exports.ticketResponses = (tickets) =>{
    
    var ticketResponse = [];

    tickets.forEach(ticket => {
        ticketResponse.push({
            id: ticket._id,
            title: ticket.title,
            ticketPriority: ticket.ticketPriority,
            description: ticket.description,
            status: ticket.status,
            reporter: ticket.reporter,
            assignee: ticket.assignee,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt

        })
    })
    return ticketResponse;

}