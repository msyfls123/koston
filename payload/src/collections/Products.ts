import type { CollectionConfig } from "payload";
import { label } from "../libs/utils";

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    plural: { products: '产品' },
    singular: { products: '产品' },
  },
  orderable: true,
  admin: {
    useAsTitle: 'name'
  },
  defaultSort: 'createdAt',
  fields: [
    {
      type: 'tabs', tabs: [
        {
          label: '基础',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  label: '产品名',
                  type: 'text',
                  index: true,
                },
                {
                  name: 'engName',
                  label: "产品英文名",
                  type: 'text'
                },
              ]
            },
            {
              name: 'category',
              label: '类别',
              type: 'relationship',
              relationTo: 'product-categories',
              index: true,
            },

            {
              name: 'introduction',
              label: "产品介绍",
              type: 'textarea'
            },
            {
              name: 'cover',
              label: '封面图',
              type: 'upload',
              relationTo: 'product-images',
            },
          ]
        },
        {
          label: '介绍',
          fields: [
            {
              name: 'sections',
              label: '介绍段落',
              labels: label('段落块'),
              type: 'blocks',
              blocks: [
                {
                  slug: 'pureText',
                  labels: {
                    singular: { pureText: '纯文本' },
                    plural: { pureText: '纯文本' },
                  },
                  fields: [
                    {
                      name: 'name',
                      label: '段落名',
                      type: 'text',
                    },
                    {
                      name: 'engName',
                      label: '段落英文名',
                      type: 'text',
                    },
                    {
                      name: 'text',
                      label: "介绍",
                      type: 'textarea'
                    }
                  ]
                },
                {
                  slug: 'richText',
                  labels: {
                    singular: { pureText: '富文本' },
                    plural: { pureText: '富文本' },
                  },
                  fields: [
                    {
                      name: 'name',
                      label: '段落名',
                      type: 'text',
                    },
                    {
                      name: 'engName',
                      label: '段落英文名',
                      type: 'text',
                    },
                    {
                      name: 'richText',
                      label: "介绍",
                      type: 'richText',
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    }
  ]
}