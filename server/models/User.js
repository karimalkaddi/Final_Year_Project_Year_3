import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String, // store image URL or base64 later
    default: "",
  },
});

export default mongoose.model("User", userSchema);
