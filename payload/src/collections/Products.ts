import type { CollectionConfig } from "payload";

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
            name: 'name',
            label: '产品名',
            type: 'text'
        },
        {
            name: 'engName',
            label: "产品英文名",
            type: 'text'
        },
        {
            name: 'introduction',
            label: "产品英文名介绍",
            type: 'textarea'
        },
        {
            name: 'section',
            label: '介绍段落',
            type: 'array',
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
                    name: 'content',
                    label: '段落内容',
                    type: 'blocks',
                    minRows: 1,
                    maxRows: 1,
                    required: true,
                    blocks: [
                        {
                            slug: 'pureText',
                            labels: {
                                singular: { pureText: '纯文本' },
                                plural: { pureText: '纯文本' },
                            },
                            fields: [
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
                                    name: 'text',
                                    label: "介绍",
                                    type: 'richText',
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}