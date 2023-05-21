import connDB from "../../../../helpers/connDB";
import Orders from "../../../../models/Order";
import auth from "../../../../middleware/auth";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await kirimPesanan(req, res);
      break;
  }
};

const kirimPesanan = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });
    const { id } = req.query;

    const order = await Orders.findOne({ _id: id });
    if (order.paid) {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          delivered: true,
        }
      );
      res.json({
        msg: "Update status pengiriman berhasil !",
        result: {
          paid: true,
          dateOfBayar: order.dateOfBayar,
          metode: order.metode,
          delivered: true,
        },
      });
    } else {
      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfBayar: new Date().toLocaleDateString(),
          metode: "Menerima uang tunai",
          delivered: true,
        }
      );
      res.json({
        msg: "Update status pembayaran berhasil !",
        result: {
          paid: true,
          dateOfBayar: new Date().toLocaleDateString(),
          metode: "Menerima uang tunai",
          delivered: true,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
