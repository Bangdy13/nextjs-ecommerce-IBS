import connDB from "../../../helpers/connDB";
import Products from "../../../models/Product";
import auth from "../../../middleware/auth";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProducts(req, res);
      break;
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.kategori !== "all")
      this.query.find({ kategori: queryObj.kategori });
    if (queryObj.nama !== "all")
      this.query.find({ nama: { $regex: queryObj.nama } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;

    res.json({
      status: "Berhasil",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProducts = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

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
      !newharga ||
      !oldharga ||
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

    const newProduct = new Products({
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
    });

    await newProduct.save();

    res.json({ msg: "Berhasil! Tambahkan data produk." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
