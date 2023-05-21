import connBD from "../../../helpers/connDB";
import Users from "../../../models/User";
import auth from "../../../middleware/auth";

connBD();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateRole(req, res);
      break;
    case "DELETE":
      await hapusRole(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const { role } = req.body;
    await Users.findOneAndUpdate({ _id: id }, { role });
    res.json({ msg: "Update berhasil !" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const hapusRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    await Users.findByIdAndDelete(id);
    res.json({ msg: "Mengahapus daftar akun transaksi berhasil !" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
