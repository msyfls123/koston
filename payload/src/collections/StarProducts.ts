import type { CollectionConfig } from "payload";
import { label } from "../libs/utils";

export const StarProducts: CollectionConfig = {
  slug: 'star-products',
  labels: label('明星产品'),
  orderable: true,
  admin: {
    useAsTitle: 'name'
  },
  defaultSort: 'createdAt',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: '产品标题',
          type: 'text',
        },
        {
          name: 'engName',
          label: '英文标题',
          type: 'text',
        }
      ],
    },
    {
      name: 'description',
      label: '介绍',
      type: 'textarea'
    },
    {
      name: 'product',
      label: '关联产品',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'cover',
      label: '封面图',
      type: 'upload',
      relationTo: 'star-product-images',
    }
  ]
}