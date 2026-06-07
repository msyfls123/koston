import { getPayloadApp } from "@/lib/template";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { SupportTarget } from "payload-app/consts";

export const support = {
  find: defineAction({
    input: z.object({
      id: z.string()
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      const item = await payload.findByID({
        collection: 'supports',
        id: input.id,
      })
      return item
    }
  }),
  reply: defineAction({
    input: z.object({
      id: z.string(),
      text: z.string(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      const item = await payload.findByID({
        collection: 'supports',
        id: input.id,
      })
      const result = await payload.update({
        collection: 'supports',
        id: input.id,
        data: {
          dialogue: [
            ...(item.dialogue ?? []),
            {
              content: input.text,
              sender: SupportTarget.Customer
            }
          ]
        }
      })
      return result
    }
  }),
  create: defineAction({
    input: z.object({
      text: z.string(),
    }),
    accept: 'json',
    handler: async (input) => {
      const payload = await getPayloadApp()
      const item = await payload.create({
        collection: 'supports',
        data: {
          finished: false,
          dialogue: [
            {
              content: input.text,
              sender: SupportTarget.Customer
            }
          ]
        },
      })
      return item
    }
  }),
}