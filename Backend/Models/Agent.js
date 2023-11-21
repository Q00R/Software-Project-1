const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const AgentSchema = new mongoose.Schema(
  {
    _id: { type: ObjectId },
    name: {
      type: String,
      required: true,
    },
    //check registration
    responsibility: {
        type: {
            category: {
                type: String,
                required: true,
            },
            priority: {
                type: float,
                required: true,
            },
        }
    },
    

  }
);


module.exports = mongoose.model('Agent', AgentSchema);
