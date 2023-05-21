import connDB from "../../../helpers/connDB";
import Categories from "../../../models/Category";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateKategori(req, res);
      break;
    case "DELETE":
      await deleteKategori(req, res);
      break;
  }
};

// Fungsi update kategori
const updateKategori = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { name } = req.body;

    const newKategori = await Categories.findOneAndUpdate(
      { _id: id },
      { name }
    );
    res.json({
      msg: "Berhasil ! Update nama kategori.",
      kategori: { ...newKategori._doc, name },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Fungsi hapus kategori
const deleteKategori = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    const products = await Products.findOne({ kategori: id });
    if (products)
      return res
        .status(400)
        .json({
          err: "Harap hapus semua produk yang memiliki hubungan dengan kategori ini!.",
        });

    await Categories.findByIdAndDelete(id);
    res.json({ msg: "Berhasil ! Hapus nama kategori." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
