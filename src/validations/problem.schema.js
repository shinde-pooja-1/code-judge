import { z } from "zod";

const nonEmptyText = z.string().trim().min(1, "This field is required");

const sampleSchema = z.object({
  input: nonEmptyText,
  output: nonEmptyText,
  explanation: z.string().trim().optional().default(""),
});

const hiddenTestSchema = z.object({
  input: nonEmptyText,
  output: nonEmptyText,
});

const starterCodeSchema = z.object({
  javascript: nonEmptyText,
  python: nonEmptyText,
  cpp: nonEmptyText,
});

export const problemSchema = z.object({
  title: nonEmptyText,
  slug: nonEmptyText.regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must use lowercase letters, numbers, and hyphens only",
  ),
  difficulty: z.enum(["easy", "medium", "hard"]),
  description: z.string().trim().default(""),
  statement: nonEmptyText,
  inputFormat: nonEmptyText,
  outputFormat: nonEmptyText,
  constraints: z.array(nonEmptyText).min(1, "Add at least one constraint"),
  samples: z.array(sampleSchema).min(1, "Add at least one sample test case"),
  hiddenTests: z
    .array(hiddenTestSchema)
    .min(1, "Add at least one hidden test case"),
  tags: z.array(nonEmptyText).min(1, "Add at least one tag"),
  starterCode: starterCodeSchema,
});
