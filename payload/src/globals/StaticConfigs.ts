
import { type GlobalConfig } from 'payload'
import { BannerPages, PageNameMap } from '../libs/consts'
import { MediaSubDir } from '../collections/media/base'

export const StaticConfigs: GlobalConfig[] = [
  {
    slug: 'online',
    label: '线上服务',
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
    ]
  },
  {
    slug: 'banners',
    label: '封面图大全',
    fields: BannerPages.map((pageType) => ({
      name: pageType,
      label: PageNameMap[pageType].cnName,
      type: 'upload',
      relationTo: MediaSubDir.BannerImages,
    }))
  },
]