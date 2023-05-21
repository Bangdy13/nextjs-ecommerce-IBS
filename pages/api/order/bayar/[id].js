import connDB from "../../../../helpers/connDB";
import Orders from "../../../../models/Order";
import auth from "../../../../middleware/auth";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await bayarPesanan(req, res);
      break;
  }
};

const bayarPesanan = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role === "user") {
      const { id } = req.query;
      // const { IDpembayaran } = req.body;

      await Orders.findOneAndUpdate(
        { _id: id },
        {
          paid: true,
          dateOfBayar: new Date().toLocaleDateString(),
          // IDpembayaran,
          metode: "Cash on Delivery",
        }
      );

      res.json({ msg: "Pembayaran berhasil !!!" });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
