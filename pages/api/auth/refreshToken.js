import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { createAccessToken } from "../../../utils/generateAccessToken";
import jwt from "jsonwebtoken";

connectDB();

const auth = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await refreshToken(req, res);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ status: "400", msg: "Please login now." });
    const result = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ status: "400", msg: "Your token is invalid or has expired." });
    const user = await Users.findById(result.id);
    const accessToken = createAccessToken({ id: user._id });
    return res.status(200).json({
      status: 200,
      accessToken,
      user: {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: err.message });
  }
};

export default auth;
