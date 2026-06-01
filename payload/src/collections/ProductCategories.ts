import type { CollectionConfig } from "payload";
import { label } from "../libs/utils";

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: label('产品类别'),
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '类别名'
    },
    {
      name: '相关产品',
      type: 'join',
      collection: 'products',
      on: 'category',
    }
  ]
}