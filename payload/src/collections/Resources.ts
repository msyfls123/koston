import { label } from "../libs/utils";
import { type CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: label('下载资源'),
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
  ]
}