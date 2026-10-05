import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    status: z.string(),
    order: z.number(),
    repo: z.string().url(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
});

export const collections = { projects };
