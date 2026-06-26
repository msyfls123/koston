
import { type GlobalConfig } from 'payload'
import { BannerPages, PageNameMap } from '../libs/consts'
import { MediaSubDir } from '../collections/media/base'
import { AdminGroup } from '../libs/admin'

export const StaticConfigs: GlobalConfig[] = [
  {
    slug: 'online',
    label: '电话/链接配置',
    admin: {
      group: AdminGroup.Config,
    },
    fields: [
      {
        name: 'workingTime',
        label: '人工服务时间',
        type: 'text',
        defaultValue: '8:00 - 19:00',
      },
      {
        name: 'hotline',
        label: '服务热线',
        type: 'text',
        defaultValue: '021-69157540',
      },
      {
        name: 'link1688',
        label: '1688',
        type: 'text',
      },
      {
        name: 'linkQianniu',
        label: '千牛',
        type: 'text',
      },
      {
        name: 'hrEmail',
        label: 'HR 邮箱',
        type: 'text',
        defaultValue: 'kostonhr@163.com'
      },
      {
        name: 'weibo',
        label: '微博链接',
        type: 'text',
        defaultValue: 'https://weibo.com'
      },
      {
        name: 'douyin',
        label: '抖音链接',
        type: 'text',
        defaultValue: 'https://douyin.com'
      },
      {
        name: 'xiaohongshu',
        label: '微博链接',
        type: 'text',
        defaultValue: 'https://xiaohongshu.com'
      },
      {
        name: 'weixin',
        label: '微信公众号',
        type: 'upload',
        relationTo: 'wechat-image',
      },
    ]
  },
  {
    slug: 'banners',
    label: '封面图配置',
    admin: {
      group: AdminGroup.Config,
    },
    fields: BannerPages.map((pageType) => ({
      name: pageType,
      label: PageNameMap[pageType].cnName,
      type: 'upload',
      relationTo: MediaSubDir.BannerImages,
    }))
  },
]