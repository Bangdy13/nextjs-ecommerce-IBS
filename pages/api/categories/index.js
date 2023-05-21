import connDB from "../../../helpers/connDB";
import Categories from "../../../models/Category";
import auth from "../../../middleware/auth";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createKategori(req, res);
      break;
    case "GET":
      await getKategori(req, res);
      break;
  }
};

const createKategori = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { name } = req.body;
    if (!name)
      return res.status(400).json({ err: "Nama kategori wajib di isi !." });

    const newKategori = new Categories({ name });

    await newKategori.save();
    res.json({ msg: "Berhasil ! Membuat kategori baru.", newKategori });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getKategori = async (req, res) => {
  try {
    const categories = await Categories.find();

    res.json({ categories });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
