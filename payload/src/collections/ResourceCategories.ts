import type { CollectionConfig } from "payload";
import { label } from "../libs/utils";
import { AdminGroup } from "../libs/admin";

export const ResourceCategories: CollectionConfig = {
  slug: 'resource-categories',
  labels: label('资源类别'),
  admin: {
    useAsTitle: 'name',
    group: AdminGroup.Support,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '类别名'
    },
    {
      name: 'resources',
      label: '相关资源',
      type: 'join',
      collection: 'resources',
      on: 'category',
    }
  ]
}