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
        issue:{
          main: {             //The main category of the issue
            type: String,
            enum: ['Software', 'Hardware', 'Network'],
            required: true,
          },
          sub: {              //The sub category of the issue
            type: String,
            enum: [
              'Desktops', 'Laptops', 'Printers', 'Servers', 'Networking equipment',
              'Operating system', 'Application software', 'Custom software', 'Integration issues',
              'Email issues', 'Internet connection problems', 'Website errors'
            ],
            required: true,
          },
        },
        priority: {           //Low, Medium, High
        type: String,
        enum : ['Low','Medium','High'],
        required: true,
        },
        assignedAgent: {       //The agent that will be assigned to the ticket
            type: ObjectId,
            required: false, 
        },
        answer: [            // user to agent -> {flag:0 with no description}, agent -> user {flag:1 with the update description}
        {                     //updated to array as we can have multiple updates for 1 ticket
              flag: {
                type: Boolean,
                required: true,
              },
              title: {
                type: String,
                required: false,
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
      rating: {             //The rating of the agent
        type: Number,
        min: 0,
        max: 5,
        required: false,
      },
  }
);


module.exports = mongoose.model('Tickets', TicketsSchema);
