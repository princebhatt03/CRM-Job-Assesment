import mongoose from "mongoose";

const resetPinSchema = new mongoose.Schema({
  email: {
    type: String,
    maxLength: 50,
    required: true,
  },
  pin: {
    type: String,
    maxLength: 6,
    minLength: 6,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d",
  },
});

resetPinSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("resetPin", resetPinSchema);
