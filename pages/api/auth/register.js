import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";
import bcrypt from "bcrypt";

connectDB();

const auth = async (req, res) => {
  switch (req.method) {
    case "POST":
      return await register(req, res);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) return res.status(400).json({ status: 400, msg: errMsg });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({ name, email, password: passwordHash });

    await newUser.save();

    return res.json({ status: 200, msg: "Register success!" });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: err.message });
  }
};

export default auth;
