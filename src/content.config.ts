import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    url: z.string().url().optional(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
})

export const collections = { portfolio }
