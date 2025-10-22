import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  company: {
    type: String,
    maxLength: 50,
    required: true,
  },
  address: {
    type: String,
    maxLength: 100,
  },
  phone: {
    type: Number,
    maxLength: 10,
    required: true,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 100,
    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});

export default mongoose.model("User", UserSchema);
