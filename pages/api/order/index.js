import connDB from "../../../helpers/connDB";
import Orders from "../../../models/Order";
import auth from "../../../middleware/auth";
import Products from "../../../models/Product";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await buatPesanan(req, res);
      break;
    case "GET":
      await getPesanan(req, res);
      break;
  }
};

const getPesanan = async (req, res) => {
  try {
    const result = await auth(req, res);

    let orders;
    if (result.role !== "admin") {
      orders = await Orders.find({ user: result.id }).populate(
        "user",
        "-password"
      );
    } else {
      orders = await Orders.find().populate("user", "-password");
    }
    res.json({ orders });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const buatPesanan = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { namalengkap, handphone, alamatlengkap, sizebaju, cart, total } =
      req.body;

    const newPesanan = new Orders({
      user: result.id,
      namalengkap,
      handphone,
      alamatlengkap,
      sizebaju,
      cart,
      total,
    });

    cart.filter((item) => {
      return terjual(item._id, item.quantity, item.persediaan, item.terjual);
    });
    await newPesanan.save();

    res.json({
      msg: "Memesan produk berhasil! Kami akan menghubungi anda untuk mengkonfirmasi pesanan.",
      newPesanan,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const terjual = async (id, quantity, persediaanLama, terjualLama) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      persediaan: persediaanLama - quantity,
      terjual: quantity + terjualLama,
    }
  );
};
