import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    root: { type: Boolean, default: false },
    avatar: {
      type: String,
      default: "https://img.freepik.com/free-icon/user_318-644324.jpg?w=360",
    },
  },
  {
    timestamps: true,
  }
);
let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
