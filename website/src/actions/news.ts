import { getPayloadApp } from '@/lib/template';
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import type { PaginatedDocs } from 'payload';

export const news = {

  query: defineAction({
    input: z.object({
      year: z.number(),
      page: z.number(),
      limit: z.number(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'news',
        where: {
          date: {
            greater_than_equal: new Date(input.year, 0, 1),
            less_than: new Date(input.year + 1, 0, 1)
          },
        },
        select: {
          title: true,
          excerpt: true,
          date: true,
        },
        page: input.page,
        limit: input.limit,
      })
    }
  })
}