import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    namalengkap: String,
    alamatlengkap: String,
    handphone: String,
    sizebaju: String,
    cart: Array,
    total: Number,
    // IDpembayaran: String,
    metode: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfBayar: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.order || mongoose.model("order", orderSchema);
