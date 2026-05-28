import { label } from "../libs/utils";
import { type CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: 'news',
  labels: label('新闻'),
  fields: [
    {
      name: 'title',
      label: '标题',
      type: 'text',
    },
    {
      name: 'content',
      label: '内容',
      type: 'richText',
    },
    {
      name: 'date',
      label: '日期',
      type: 'date'
    }
  ]
}