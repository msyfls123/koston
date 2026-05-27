import type { CollectionConfig } from 'payload';

export const Industries: CollectionConfig = {
    slug: 'industries',
    labels: {
        plural: { industries: '行业' },
        singular: { industries: '行业' },
    },
    orderable: true,
    admin: {
        useAsTitle: 'name'
    },
    defaultSort: 'createdAt',
    fields: [
        {
            type: 'tabs', tabs: [
                {
                    label: '基础', fields: [
                        {
                            type: 'row', fields: [
                                {
                                    name: 'name',
                                    label: '行业名',
                                    type: 'text'
                                },
                                {
                                    name: 'engName',
                                    label: "行业英文名",
                                    type: 'text'
                                },
                            ]
                        },

                        {
                            name: 'text',
                            label: "介绍",
                            type: 'richText',
                        },
                        {
                            name: 'thumbnail',
                            label: '封面图',
                            type: 'upload',
                            relationTo: 'industry-images',
                        }
                    ]
                },
                {
                    label: '详细信息',
                    fields: [
                        {
                            name: 'solution',
                            label: "介绍解决方案",
                            type: 'richText'
                        },
                        {
                            name: 'relatedProducts',
                            label: '相关产品列表',
                            type: 'array',
                            fields: [{
                                name: 'relatedProduct',
                                label: '相关产品',
                                type: 'relationship',
                                relationTo: 'products'
                            }]
                        }
                    ]
                }
            ]
        }

    ]
}