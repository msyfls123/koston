import { array } from 'payload/shared'
import { MediaSubDir } from '../collections/media/base'

import { label } from '../libs/utils'
import { type GlobalConfig } from 'payload'

export const StaticPages: GlobalConfig[] = [
  {
    slug: 'home',
    label: '首页配置',
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: '模块区',
            fields: [
              {
                type: 'array',
                label: '模块列表',
                name: 'sections',
                labels: label('模块'),
                fields: [
                  {
                    type: 'text',
                    name: 'name',
                    label: '名称'
                  },
                  {
                    type: 'text',
                    name: 'engName',
                    label: '英文名称'
                  },
                  {
                    type: 'textarea',
                    name: 'description',
                    label: '介绍'
                  },
                  {
                    type: 'upload',
                    name: 'cover',
                    relationTo: 'home-section-images',
                    label: '封面图'
                  },
                  {
                    type: 'text',
                    name: 'url',
                    label: '链接地址',
                    defaultValue: '/about'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'innovation',
    label: '技术与创新',
    fields: [
      {
        name: 'introduction',
        label: "介绍",
        type: 'richText'
      },
    ]
  },
  {
    slug: 'sustainable',
    label: '绿色可持续',
    fields: [
      {
        name: 'introduction',
        label: "介绍",
        type: 'richText'
      },
    ]
  },
  {
    slug: 'about',
    label: '关于壳盾',
    fields: [
      {

        type: 'tabs', tabs: [
          {
            label: '基础', fields: [
              {
                name: 'sections',
                label: '介绍',
                labels: label('介绍'),
                type: 'array',
                fields: [
                  {
                    name: 'title',
                    type: 'text',
                    label: '标题',
                  },
                  {
                    name: 'engTitle',
                    type: 'text',
                    label: '英文标题',
                  },
                  {
                    name: 'content',
                    type: 'textarea',
                    label: '标题内容',
                  },
                ]
              },
            ]
          },
          {
            label: '数字', fields: [
              {
                name: 'numbers',
                label: '大数字',
                labels: label('数字'),
                type: 'array',
                fields: [
                  {
                    name: 'number',
                    type: 'text',
                    label: '数字',
                  },
                  {
                    name: 'caption',
                    type: 'text',
                    label: '注解',
                  },
                ]
              },
            ]
          },
          {
            label: '时间线', fields: [
              {
                name: 'timeline',
                label: '时间线',
                labels: label('时间线'),
                type: 'array',
                fields: [
                  {
                    name: 'year',
                    type: 'text',
                    label: '年份',
                  },
                  {
                    name: 'events',
                    label: '大事件',
                    labels: label('大事件'),
                    type: 'array',
                    fields: [
                      {
                        name: 'event',
                        label: '事件内容',
                        type: 'textarea',

                      },
                      {
                        name: 'picture',
                        label: '配图',
                        type: 'upload',
                        relationTo: MediaSubDir.TimelineImages
                      },
                    ]
                  }
                ]
              }
            ]
          },
        ]
      }

    ]
  },
  {
    slug: 'careers',
    label: '招聘',
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: '简介',
            fields: [
              {
                name: 'talents',
                label: '人才发展',
                type: 'textarea',
              },
              {
                name: 'benefits',
                label: '福利待遇',
                type: 'textarea',
              }
            ]
          },
          {
            label: '职位',
            fields: [
              {
                name: 'jobs',
                label: '职位列表',
                labels: label('职位'),
                type: 'array',
                fields: [
                  {
                    name: 'title',
                    label: '头衔',
                    type: 'text',
                  },
                  {
                    name: 'description',
                    label: '职位要求',
                    type: 'richText'
                  }
                ]
              },
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'merits',
    label: '荣誉资质认证',
    fields: [
      {
        name: 'overview',
        label: '总览',
        type: 'richText'
      },
      {
        name: 'banner',
        label: '横幅图',
        type: 'upload',
        relationTo: MediaSubDir.HonorBanner,
      },
      {
        name: "awards",
        label: '奖项列表',
        labels: label('奖项'),
        type: 'array',
        fields: [
          {
            type: 'text',
            name: 'title',
            label: '奖项名'
          },
          {
            type: 'textarea',
            name: 'description',
            label: '奖项简介',
          },
          {
            name: 'picture',
            label: '奖项图片',
            type: 'upload',
            relationTo: MediaSubDir.AwardImages,
          },
        ]
      }
    ]
  },
  {
    slug: 'partnship',
    label: '加盟合作',
    fields: [
      {
        name: 'notice',
        label: '申请加盟提示',
        type: 'richText'
      }
    ]
  },
  
]