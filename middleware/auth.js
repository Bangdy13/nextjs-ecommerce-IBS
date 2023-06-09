import jwt from "jsonwebtoken";
import Users from "../models/User";

const auth = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ err: "Invalid Authorization." });

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

  if (!decoded) return res.status(400).json({ err: "Invalid Authorization." });

  const user = await Users.findOne({ _id: decoded.id });

  return { id: user._id, role: user.role, root: user.root };
};

export default auth;
