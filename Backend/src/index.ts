import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

import { connectDB, UserModel, ContentModel, LinkModel, TagModel } from "./db.js";
import {
  signupSchema,
  signinSchema,
  createContentSchema,
  deleteContentSchema,
  shareSchema
} from "./schemas/zodSchemas.js";

import { userMiddleware } from "./middlewares/userMiddleware.js";
import { contentTypeCheck } from "./schemas/contentType.js";
import { validate } from "./schemas/validate.js";

const app = express();
app.use(express.json());
app.use(contentTypeCheck);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}
const JWT_SECRET = process.env.JWT_SECRET;

async function startServer() {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

app.post("/api/v1/signup", validate(signupSchema), async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await UserModel.create({
      username,
      password
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(201).json({
      message: "Signup successful",
      token
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

app.post("/api/v1/signin", validate(signinSchema), async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ message: "Signin successful", token });
  } catch {
    res.status(500).json({ error: "Signin failed" });
  }
});

app.post(
  "/api/v1/content",
  userMiddleware,
  validate(createContentSchema),
  async (req: any, res) => {
    try {
      let tagIds = [];
      if (Array.isArray(req.body.tags)) {
        tagIds = await Promise.all(
          req.body.tags.map(async (tagName: string) => {
            let tag = await TagModel.findOne({ title: tagName });
            if (!tag) {
              tag = await TagModel.create({ title: tagName });
            }
            return tag._id;
          })
        );
      }

      const content = await ContentModel.create({
        link: req.body.link,
        type: req.body.type,
        title: req.body.title,
        tags: tagIds,
        userId: req.userId
      });

      res.status(201).json({
        message: "Content created",
        content
      });
    } catch {
      res.status(500).json({ error: "Failed to create content" });
    }
  }
);

app.get("/api/v1/content", userMiddleware, async (req: any, res) => {
  try {
    const contents = await ContentModel.find({
      userId: req.userId
    }).populate("tags");

    res.json({ contents });
  } catch {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

app.delete(
  "/api/v1/content",
  userMiddleware,
  validate(deleteContentSchema),
  async (req: any, res) => {
    try {
      const deleted = await ContentModel.findOneAndDelete({
        _id: req.body.contentId,
        userId: req.userId
      });

      if (!deleted) {
        return res.status(404).json({ error: "Content not found" });
      }

      res.json({ message: "Deleted" });
    } catch {
      res.status(500).json({ error: "Delete failed" });
    }
  }
);

app.post(
  "/api/v1/brain/share",
  userMiddleware,
  validate(shareSchema),
  async (req: any, res) => {
    const { share } = req.body;

    try {
      if (share) {
        const existing = await LinkModel.findOne({ userId: req.userId });

        if (existing) {
          return res.json({ link: `/share/${existing.hash}` });
        }

        const hash = crypto.randomBytes(16).toString("hex");

        await LinkModel.create({
          userId: req.userId,
          hash
        });

        return res.json({ link: `/share/${hash}` });
      } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Sharing disabled" });
      }
    } catch {
      res.status(500).json({ error: "Share failed" });
    }
  }
);

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const link = await LinkModel.findOne({
      hash: req.params.shareLink
    });

    if (!link) {
      return res.status(404).json({ error: "Invalid link" });
    }

    const [content, user] = await Promise.all([
      ContentModel.find({ userId: link.userId }),
      UserModel.findById(link.userId)
    ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      username: user.username,
      content
    });
  } catch {
    res.status(500).json({ error: "Failed" });
  }
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);

  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  res.status(500).json({ error: "Something went wrong" });
});

startServer();