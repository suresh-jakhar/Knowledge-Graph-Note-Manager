
import { z } from "zod";

// User signup schema
export const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const signinSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const createContentSchema = z.object({
  link: z.string().url({ message: "Link must be a valid URL." }),
  type: z.enum(["note", "article", "other"], { message: "Type must be one of: note, article, other." }),
  title: z.string().min(1, { message: "Title is required." }),
  tags: z.array(z.string()),
  userId: z.string(),
});

export const shareSchema = z.object({
  shareLink: z.string().min(1, { message: "Share link is required." }),
  recipient: z.string().min(1, { message: "Recipient is required." }),
});
