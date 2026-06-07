import { getPayloadApp } from '@/lib/template';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema'

import type { PaginatedDocs } from 'payload'
import { getStaticUrl, MediaSubDir, type ResourceFile } from 'payload-app';

const processContent = (res: PaginatedDocs<{
  id: string;
  title?: string | null | undefined;
  content?: ((string | null) | ResourceFile) | undefined;
}>) => {
  return {
    ...res,
    docs: res.docs.map((item) => ({
      ...item,
      content: getStaticUrl(MediaSubDir.ResourceFiles, (typeof item.content === 'object' ? item.content?.filename : item.content) ?? '')
    }))
  }
}

export const resource = {
  queryByAll: defineAction({
    input: z.object({
      page: z.number(),
      limit: z.number(),
    }),
    accept: 'json',
    handler: async () => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'resources',
        select: {
          title: true,
          content: true,
        },
        pagination: false,
      }).then(processContent)
    },
  }),
  queryByText: defineAction({
    input: z.object({
      text: z.string(),
      page: z.number(),
      limit: z.number(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'resources',
        where: {
          title: {
            like: input.text,
          },
        },
        select: {
          title: true,
          content: true,
        },
        page: input.page,
        limit: input.limit,
        pagination: false,
      }).then(processContent)
    },
  }),
  queryByCategory: defineAction({
    input: z.object({
      categoryId: z.string(),
      page: z.number(),
      limit: z.number(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'resources',
        where: {
          category: {
            equals: input.categoryId
          }
        },
        page: input.page,
        limit: input.limit,
        select: {
          title: true,
          content: true,
        },
      }).then(processContent)
    },
  }),
}