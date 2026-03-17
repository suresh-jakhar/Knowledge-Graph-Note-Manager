
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB, UserModel, ContentModel } from "./db.js";
import { signupSchema, signinSchema, createContentSchema, shareSchema } from "./schemas/zodSchemas.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { shareMiddleware } from "./middlewares/shareMiddleware.js";

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

async function startServer() {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB. Server not started.");
    process.exit(1);
  }
}

app.post("/api/v1/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid signup data." });
  }
  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username is already taken." });
    }
    const user = await UserModel.create({ username, password });
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "Signup & Signin successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to signup user." });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid signin data." });
  }
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to signin user." });
  }
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const result = createContentSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid content data." });
  }
  const { link, type, title, tags, userId } = req.body;
  try {
    const content = await ContentModel.create({ link, type, title, tags, userId });
    res.status(201).json({ message: "Content created", content });
  } catch (error) {
    res.status(500).json({ error: "Failed to create content." });
  }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  try {
    const contents = await ContentModel.find();
    res.status(200).json({ message: "Content fetched", contents });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content." });
  }
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Content id required" });
  try {
    const deleted = await ContentModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Content not found" });
    res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete content." });
  }
});

app.post("/api/v1/brain/share", authMiddleware, shareMiddleware, (req, res) => {
  res.status(200).json({ message: "Brain share successful" });
});

startServer();
