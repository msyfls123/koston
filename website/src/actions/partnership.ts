import { getPayloadApp } from "@/lib/template";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";

export const partnership = {
  create: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      phone: z.string(),
      industry: z.string(),
      company: z.string(),
      address: z.string(),
      area: z.string(),
      price: z.number(),
      note: z.string(),
    }),
    handler: async (input) => {
      const payload = await getPayloadApp()
      const partner = await payload.create({
        collection: 'partners',
        data: input,
      })

      return { id: partner.id }
    }
  })
}