import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateAccessToken";

connectDB();

const auth = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await login(req, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user)
      return res.status(400).json({ status: 400, msg: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ status: 400, msg: "Password is not match!" });
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });
    return res.status(200).json({
      status: 200,
      msg: "Login success!",
      accessToken,
      refreshToken,
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
