import { type CollectionConfig } from "payload";
import { label } from "../libs/utils";
import { SUPPORT_NAME_MAP, SupportTarget } from "../libs/support";
import { AdminGroup } from "../libs/admin";

export const Supports: CollectionConfig = {
  slug: 'supports',
  labels: label('在线支持'),
  admin: {
    group: AdminGroup.Support
  },
  fields: [
    {
      type: 'date',
      name: 'created',
      label: '创建时间',
      defaultValue: () => new Date(),
    },
    {
      type: 'array',
      name: 'dialogue',
      label: '对话',
      labels: label('消息'),
      fields: [
        {
          type: 'select',
          options: Object.values(SupportTarget).map((v) => ({
            label: SUPPORT_NAME_MAP[v],
            value: v
          })),
          name: 'sender',
          defaultValue: SupportTarget.Staff,
        },
        {
          type: 'date',
          name: 'time',
          label: '时间',
          defaultValue: () => new Date(),
        },
        {
          type: 'textarea',
          name: 'content',
          label: '内容',
        }
      ]
    },
    {
      type: 'checkbox',
      name: 'finished',
      label: '已完成',
    }
  ]
}