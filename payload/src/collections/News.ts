import { label } from "../libs/utils";
import { type CollectionConfig } from "payload";
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

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
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'news-images',
      label: '封面图'
    },
    {
      name: 'excerpt',
      type: 'text',
      virtual: true,
      label: '摘抄',
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const content = siblingData.content
            const plaintext = convertLexicalToPlaintext({
              data: content,
            })
            return plaintext
          }
        ]
      }
    }
  ]
}