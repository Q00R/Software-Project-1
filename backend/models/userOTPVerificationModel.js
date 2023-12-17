const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserOTPVerificationSchema = new schema({
    userId: { // The user that created the ticket
        type:"String" ,
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

const UserOTPVerification = mongoose.model(
    'UserOTPVerification',
     UserOTPVerificationSchema
);


module.exports = UserOTPVerification;