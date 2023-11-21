const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const TicketsSchema = new mongoose.Schema(
  {

    _id: { type: ObjectId },  //Ticket ID
    userId: {                 //User ID
        type: ObjectId,
        required: true,
        },
        issueDate: {          //Date of creation
        type: Date,
        required: true,
        default: Date.now,
        },
        expirationDate: {     //Date of expiration
        type: Date,
        required: false,
        },
        title: {              //Title of the ticket
        type: String,
        required: true,
        },
        description: {        //Description of the ticket
        type: String,
        required: true,
        },
        status: {             //Opened, Closed, Pending
        type: String,
        enum : ['Opened','Closed','Pending'],
        required: true,
        },
        category: {         //A main category and a sub category
          main: {
            type: String,
            enum: ['Software', 'Hardware', 'Network'],
            required: true,
          },
          sub: {
            type: String,
            enum: [
              'Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment',
              'Operating system', 'Application software', 'Custom software', 'Integration issues',
              'Email issues', 'Internet connection problems', 'Website errors'
            ],
            required: false,
          },
        },
        priority: {           //Low, Medium, High
        type: String,
        enum : ['Low','Medium','High'],
        required: true,
        },
        assignedAgent: {       //The agent that will be assigned to the ticket (ask about this)
            type: ObjectId,
            required: false, 
        },
        updates: [            // user to agent -> {flag:0 with no description}, agent -> user {flag:1 with the update description}
        {                     //updated to array as we can have multiple updates for 1 ticket
              flag: {
                type: Boolean,
                required: true,
              },
              description: {
                type: String,
                required: false,
              },
              timestamp: {
                type: Date,
                default: Date.now,
              },
        },
      ],
  }
);


module.exports = mongoose.model('Tickets', TicketsSchema);
