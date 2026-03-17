
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGO_URI = process.env.MONGO_URI || "";

export async function connectDB() {
  try {
    if (!MONGO_URI) throw new Error("MongoDB URI not set in environment variables");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const TagSchema = new mongoose.Schema({
  title: { type: String, required: true },
});


const ContentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, required: true, enum: ["note", "article", "other"] },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const LinkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
});


export const UserModel = mongoose.model("User", UserSchema);
export const TagModel = mongoose.model("Tag", TagSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);