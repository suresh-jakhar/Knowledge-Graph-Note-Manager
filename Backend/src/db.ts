import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://Suresh_DB_USER1:Suresh1234567@cluster0.ypefo8y.mongodb.net/myDatabase?retryWrites=true&w=majority");
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const UserModel = mongoose.model("User", UserSchema);
export const TagModel = mongoose.model("Tag", TagSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);