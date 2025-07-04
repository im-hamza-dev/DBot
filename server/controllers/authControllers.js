import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import connectMongo from "../db/mongodb.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  await connectMongo();
  const { email, password, username } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword, username });
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

  res
    .status(201)
    .json({ token, user: { id: user._id, email: user.email, username } });
};

export const login = async (req, res) => {
  await connectMongo();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ token, user: { id: user._id, email: user.email } });
};
