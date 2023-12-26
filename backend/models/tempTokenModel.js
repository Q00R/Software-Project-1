const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TempTokenSchema = new schema({
    userId: { // The user that created the ticket
        type:String ,
        ref: "User",
        required: true,
    },
    otp: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    },
});



const tempToken = mongoose.model(
    'tempToken',
    TempTokenSchema
);



module.exports = tempToken;