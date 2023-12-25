const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserOTPVerificationSchema = new schema({
    userId: { // The user that created the ticket
        type:"String" ,
        ref: "User",
        required: true,
    },
    secret: {
        type: String,
    },
    otpauth_url: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
});

const UserOTPVerification = mongoose.model(
    'UserOTPVerification',
     UserOTPVerificationSchema
);


module.exports = UserOTPVerification;