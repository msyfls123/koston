import { AdminGroup } from "../libs/admin";
import { label } from "../libs/utils";
import { type CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: label('下载资源'),
  admin: {
    group: AdminGroup.Support,
  },
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
    },
    {
      name: 'content',
      label: '内容',
      type: 'upload',
      relationTo: 'resource-files'
    },
    {
      name: 'category',
      label: '类别',
      type: 'relationship',
      relationTo: 'resource-categories',
      index: true,
    }
  ]
}