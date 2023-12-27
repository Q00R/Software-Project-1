const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  themeName: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Themes", ThemeSchema);