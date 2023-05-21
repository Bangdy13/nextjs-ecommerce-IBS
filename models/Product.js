import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true, trim: true },
    newharga: { type: Number, required: true, trim: true },
    oldharga: { type: Number, required: true, trim: true },
    foto: { type: Array, required: true },
    deskripsi: { type: String, required: true },
    umur: { type: String, required: true },
    diskon: { type: String, required: true },
    size: { type: String, required: true },
    detailsize: { type: String, required: true },
    persediaan: { type: Number, default: 0 },
    terjual: { type: Number, default: 0 },
    checked: { type: Boolean, default: false },
    kategori: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.product ||
  mongoose.model("product", productSchema);
