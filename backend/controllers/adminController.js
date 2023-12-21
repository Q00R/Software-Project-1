const userModel = require("../models/userModel.js"); // lookup what to do in this 

const adminController = {
    adminChangeRole: async (req, res) => {
        try{
            const { userId, newRole } = req.body;
            if (userModel.schema.path('role').enumValues.include(newRole)){
                const user = await userModel.findByIdAndUpdate(
                    userId,
                    {role: newRole}
                );
                return res.status(200).json(user);
            } else {
                return res.status(400).json({ error: 'Role does not exist!' });
            }
        } catch (e){
            return res.status(400).json({ error: 'Couldnt change role!' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
          const users = await userModel.find();
          return res.status(200).json(users);
        } catch (e) {
          return res.status(500).json({ message: e.message });
        }
    }
};

module.exports = adminController;