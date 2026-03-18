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
  link: z.string().url(),
  type: z.enum(["note", "article", "other"]),
  title: z.string().min(1),
  tags: z.array(z.string()).default([]),
}).strict();

export const deleteContentSchema = z.object({
  contentId: z.string().min(1),
}).strict();

export const shareSchema = z.object({
  share: z.boolean(),
}).strict();