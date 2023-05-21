import Users from "../../../models/User";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../helpers/generateToken";
import connDB from "../../../helpers/connDB";

connDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ err: "Silahkan login sekarang!" });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN);
    if (!result)
      return res
        .status(400)
        .json({ err: "Token anda salah atau telah kedaluwarsa." });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "Pengguna tidak ada." });
    const accessToken = createAccessToken({ id: user._id });
    res.json({
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
