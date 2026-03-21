import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
}).strict();

export const signinSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
}).strict();

export const createContentSchema = z.object({
  link: z.string().refine((val) => {
  return val.includes("youtube.com") || val.includes("twitter.com");
  }, {
  message: "Only YouTube or Twitter links allowed"
  }),
  type: z.enum(["youtube", "twitter"]),
  title: z.string().min(1),
  tags: z.array(z.string()).default([]),
}).strict();

export const deleteContentSchema = z.object({
  contentId: z.string().min(1),
}).strict();

export const shareSchema = z.object({
  share: z.boolean(),
}).strict();