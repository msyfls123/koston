import { getImageUrl, getPayloadApp } from '@/lib/template'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import type { PaginatedDocs } from 'payload';
import { MediaSubDir, type ProductImage } from 'payload-app';

const processCover = (res: PaginatedDocs<{
  id: string;
  name?: string | null | undefined;
  engName?: string | null | undefined;
  cover?: ((string | null) | ProductImage) | undefined;
}>) => {
  return {
    ...res,
    docs: res.docs.map((item) => ({
      ...item,
      cover: getImageUrl(item.cover, MediaSubDir.ProductImages, 'cropped')
    }))
  }
}

export const product = {
  queryAll: defineAction({
    handler: async () => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'products',
        select: {
          name: true,
          engName: true,
          cover: true,
        }
      }).then(processCover)
    }
  }),
  queryByText: defineAction({
    input: z.object({
      text: z.string(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'products',
        where: {
          name: {
            like: input.text,
          },
        },
        select: {
          name: true,
          engName: true,
          cover: true,
        }
      }).then(processCover)
    },
  }),
  queryByCategory: defineAction({
    input: z.object({
      categoryId: z.string(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      return payload.find({
        collection: 'products',
        where: {
          category: {
            equals: input.categoryId
          }
        },
        select: {
          name: true,
          engName: true,
          cover: true,
        }
      }).then(processCover)
    },
  }),
}