const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
});
export default mongoose.models.User || mongoose.model("User", userSchema);
