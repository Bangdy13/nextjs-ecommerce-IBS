import connDB from "../../../helpers/connDB";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Products.findById(id);

    if (!product) return res.status(400).json({ err: "Produk ini tidak ada." });
    res.json({
      product,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const {
      nama,
      diskon,
      foto,
      newharga,
      oldharga,
      umur,
      size,
      persediaan,
      deskripsi,
      detailsize,
      kategori,
    } = req.body;

    if (
      !nama ||
      !diskon ||
      !oldharga ||
      !newharga ||
      !umur ||
      !size ||
      !persediaan ||
      !deskripsi ||
      !detailsize ||
      kategori === "all" ||
      foto.length === 0
    )
      return res
        .status(400)
        .json({ err: "Mohon isikan semua form dengan benar !." });
    await Products.findOneAndUpdate(
      { _id: id },
      {
        nama: nama.toLowerCase(),
        diskon,
        foto,
        newharga,
        oldharga,
        umur,
        size,
        persediaan,
        deskripsi,
        detailsize,
        kategori,
      }
    );

    res.json({ msg: "Berhasil update produk baru !." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    await Products.findByIdAndDelete(id);
    res.json({ msg: "Berhasil hapus produk !." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
