import { type CollectionConfig } from "payload";
import { label } from "../libs/utils";
import { SUPPORT_NAME_MAP, SupportTarget } from "../libs/support";
import { AdminGroup } from "../libs/admin";

export const Supports: CollectionConfig = {
  slug: 'supports',
  labels: label('在线客服'),
  admin: {
    group: AdminGroup.Daily,
    defaultColumns: [
      'updatedAt',
      'firstMessage',
      'lastMessage',
      'needReply',
      'finished'
    ],
    components: {
      views: {
        edit: {
          default: {
            Component: '@/components/SupportView.tsx'
          }
        }
      }
    }
  },
  defaultSort: '-updatedAt',
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
      name: 'firstMessage',
      type: 'text',
      virtual: true,
      label: '用户第一条消息',
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const dialogue = siblingData.dialogue
            return dialogue[0]?.content
          }
        ]
      }
    },
    {
      name: 'lastMessage',
      type: 'text',
      virtual: true,
      label: '最后回复消息',
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const dialogue = siblingData.dialogue
            const lastMessage = dialogue.at(-1)
            return `${lastMessage.sender === SupportTarget.Customer ? '用户' : '客服'}: ${lastMessage.content}`
          }
        ]
      }
    },
    {
      name: 'needReply',
      type: 'checkbox',
      virtual: true,
      label: '用户等待回复',
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const dialogue = siblingData.dialogue
            const lastMessage = dialogue.at(-1)
            return lastMessage.sender === SupportTarget.Customer
          }
        ]
      }
    },
    {
      type: 'checkbox',
      name: 'finished',
      label: '已完成',
    }
  ]
}