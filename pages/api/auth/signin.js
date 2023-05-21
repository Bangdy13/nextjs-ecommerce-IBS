import Users from "../../../models/User";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../helpers/generateToken";
import connDB from "../../../helpers/connDB";

connDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await signin(req, res);
      break;
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ err: "User ini tidak ada." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ err: "Kata sandi salah." });

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.json({
      msg: "Berhasil masuk !",
      refreshToken,
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
